/**
 * Envío vía Resend. Para que no caiga en spam con frecuencia:
 * - Verificá un dominio propio en Resend y usá EMAIL_FROM con @tudominio
 * - Completá los DNS (SPF/DKIM) que indique Resend
 * - Opcional: EMAIL_REPLY_TO con un buzón real del mismo dominio
 */
const RESEND_API = 'https://api.resend.com/emails'

export type EmailSendResult =
  | { ok: true; id?: string }
  | { ok: false; skipped: true }
  | { ok: false; error: string }

function siteUrl() {
  const u =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    ''
  return u.replace(/\/$/, '')
}

function getResendApiKey(): string {
  const v = process.env.RESEND_API_KEY
  if (!v) return ''
  return v.trim().replace(/^["']|["']$/g, '')
}

async function sendResend(params: {
  to: string
  subject: string
  html: string
  text: string
  tags?: { name: string; value: string }[]
}): Promise<EmailSendResult> {
  const apiKey = getResendApiKey()
  if (!apiKey) {
    console.warn(
      '[email] RESEND_API_KEY vacío o ausente: no se envía el correo. Revisá .env.local y reiniciá npm run dev.'
    )
    return { ok: false, skipped: true }
  }

  const from =
    process.env.EMAIL_FROM?.trim().replace(/^["']|["']$/g, '') ||
    'Influ Finder <onboarding@resend.dev>'

  const to = params.to.trim()

  const replyTo = process.env.EMAIL_REPLY_TO?.trim().replace(/^["']|["']$/g, '')

  const payload: Record<string, unknown> = {
    from,
    to: [to],
    subject: params.subject,
    html: params.html,
    text: params.text,
  }

  if (replyTo) {
    payload.reply_to = [replyTo]
  }

  if (params.tags?.length) {
    payload.tags = params.tags
  }

  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const bodyText = await res.text()

  if (!res.ok) {
    console.error('[email] Resend rechazó el envío:', res.status, bodyText)
    return { ok: false, error: `Resend ${res.status}: ${bodyText}` }
  }

  let id: string | undefined
  try {
    id = JSON.parse(bodyText).id as string | undefined
  } catch {
    /* vacío */
  }
  console.log('[email] Resend aceptó el envío.', id ? `id=${id}` : '')
  return { ok: true, id }
}

export async function sendRegistrationConfirmationEmail(
  to: string,
  name: string
): Promise<EmailSendResult> {
  const base = siteUrl()
  const explorar = base ? `${base}/explorar` : null

  const textLines = [
    `Hola ${name},`,
    '',
    'Recibimos tu registro en Influ Finder. Tu perfil quedó pendiente de revisión.',
    'Cuando un administrador lo apruebe, te avisamos por este mismo correo.',
    explorar ? `Mientras tanto: ${explorar}` : '',
    '',
    '— Equipo Influ Finder',
  ].filter(Boolean)

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1e293b;">
  <p>Hola ${escapeHtml(name)},</p>
  <p>Recibimos tu registro en <strong>Influ Finder</strong>. Tu perfil quedó <strong>pendiente de revisión</strong>.</p>
  <p>Cuando un administrador lo apruebe, te avisamos por este mismo correo.</p>
  ${
    explorar
      ? `<p>Mientras tanto podés conocer la plataforma: <a href="${explorar}">${explorar}</a></p>`
      : ''
  }
  <p style="margin-top: 2rem; font-size: 0.875rem; color: #64748b;">— Equipo Influ Finder</p>
</body>
</html>`.trim()

  return sendResend({
    to,
    subject: 'Recibimos tu registro en Influ Finder',
    html,
    text: textLines.join('\n'),
    tags: [{ name: 'email_kind', value: 'signup' }],
  })
}

export async function sendApprovalEmail(
  to: string,
  name: string
): Promise<EmailSendResult> {
  const base = siteUrl()
  const explorar = base ? `${base}/explorar` : null

  const textLines = [
    `Hola ${name},`,
    '',
    'Tu perfil en Influ Finder fue aprobado. Ya podés aparecer en el directorio para marcas.',
    explorar ? `Explorá: ${explorar}` : '',
    '',
    '— Equipo Influ Finder',
  ].filter(Boolean)

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1e293b;">
  <p>Hola ${escapeHtml(name)},</p>
  <p>Tu perfil en <strong>Influ Finder</strong> fue <strong>aprobado</strong>. Ya podés aparecer en el directorio para marcas.</p>
  ${
    explorar
      ? `<p>Explorá perfiles y la app: <a href="${explorar}">${explorar}</a></p>`
      : ''
  }
  <p style="margin-top: 2rem; font-size: 0.875rem; color: #64748b;">— Equipo Influ Finder</p>
</body>
</html>`.trim()

  return sendResend({
    to,
    subject: 'Tu perfil en Influ Finder fue aprobado',
    html,
    text: textLines.join('\n'),
    tags: [{ name: 'email_kind', value: 'approval' }],
  })
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
