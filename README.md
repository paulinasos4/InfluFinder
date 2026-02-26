# InfluFinder - Directorio de Influencers Uruguay

Plataforma pública de marketplace/directorio de influencers para Uruguay. Permite a las marcas buscar y encontrar al influencer ideal en minutos mediante un sistema de búsqueda inteligente con filtros avanzados.

## Características

- ✅ **Navegación pública**: Cualquiera puede ver el directorio sin registrarse
- ✅ **Búsqueda avanzada** con múltiples filtros:
  - Nicho/Categoría
  - Departamento
  - Edad del creador
  - Rango de seguidores
  - Engagement Rate
  - Plataformas (Instagram, TikTok, YouTube - múltiples seleccionables)
  - Tipo de colaboración (Canje, Pago, Ambos)
- ✅ **Listado comparativo** en formato tabla con datos principales
- ✅ **Perfiles detallados** de cada influencer con:
  - Biografía
  - Métricas por plataforma
  - Tipo de colaboraciones
  - Tipo de audiencia (género y rango etario)
  - Información sobre equipo profesional
  - Clasificación micro/macro influencer
- ✅ **Registro de creadores** con formulario completo
- ✅ **Sistema de aprobación**: Los perfiles quedan pendientes de revisión

## Stack Tecnológico

- **Next.js 14** (App Router)
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL** (Base de datos)
- **Tailwind CSS** (Estilos)
- **React Hook Form** (Formularios)

## Instalación

1. **Clonar el repositorio** (o navegar al directorio del proyecto)

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar la base de datos con Docker**:
   - Levantar PostgreSQL con Docker:
   ```bash
   docker-compose up -d
   ```
   - Crear un archivo `.env` en la raíz del proyecto con:
   ```
   DATABASE_URL="postgresql://influ_finder:influ_finder_password@localhost:5433/influ_finder?schema=public"
   ```
   Nota: Si el puerto 5433 está ocupado, puedes cambiarlo en `docker-compose.yml`

   **Panel Admin** (solo tú puedes aprobar perfiles). Agrega en `.env`:
   ```
   ADMIN_USER=tu_usuario
   ADMIN_PASSWORD=tu_contraseña_segura
   ```
   Luego entra a `http://localhost:3000/admin` y inicia sesión con ese usuario y contraseña.

4. **Configurar Prisma**:
```bash
# Generar el cliente de Prisma
npm run db:generate

# Crear las tablas en la base de datos
npm run db:push
```

5. **Iniciar el servidor de desarrollo**:
```bash
npm run dev
```

6. **Abrir en el navegador**:
   - La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
InfluFinder/
├── app/
│   ├── api/
│   │   ├── influencers/        # API para buscar influencers
│   │   └── creador/
│   │       └── registro/       # API para registro de creadores
│   ├── creador/
│   │   └── registro/           # Página de registro
│   ├── influencer/
│   │   └── [id]/               # Página de perfil detallado
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # Home page
├── components/
│   ├── InfluencerList.tsx      # Componente de listado
│   └── SearchFilters.tsx       # Componente de filtros
├── lib/
│   └── prisma.ts               # Cliente de Prisma
├── prisma/
│   └── schema.prisma           # Esquema de base de datos
└── package.json
```

## Uso

### Para marcas/buscadores:

1. Acceder a la página principal
2. Usar los filtros para buscar influencers
3. Ver resultados en la tabla comparativa
4. Hacer clic en "Ver perfil" para ver detalles completos

### Para creadores:

1. Hacer clic en "Soy creador" en el header
2. Completar el formulario de registro
3. Agregar al menos una plataforma social
4. Enviar el formulario (el perfil quedará pendiente de aprobación)

## Base de Datos

El esquema incluye:

- **Influencer**: Información principal del creador
- **PlatformData**: Métricas por plataforma social
- **Enums**: Plataformas, tipos de colaboración, géneros, rangos etarios, etc.

## Despliegue en Vercel

1. **Subir el código a GitHub**  
   Crea un repositorio y sube el proyecto (no subas la carpeta `.env`).

2. **Crear proyecto en Vercel**  
   - Entrá a [vercel.com](https://vercel.com) e iniciá sesión.  
   - “Add New” → “Project” → importá el repo de GitHub.  
   - Framework: Next.js (detectado automáticamente).  
   - No cambies el comando de build.

3. **Base de datos PostgreSQL en la nube**  
   Necesitás una base Postgres accesible por URL. Opciones gratuitas:
   - **[Neon](https://neon.tech)**: cuenta gratis, creá un proyecto y copiá la connection string.  
   - **Vercel Postgres**: en el dashboard de Vercel, pestaña “Storage” → Create Database → Postgres.

4. **Variables de entorno en Vercel**  
   En el proyecto → Settings → Environment Variables, agregá:

   | Variable          | Valor                                                                 |
   |-------------------|-----------------------------------------------------------------------|
   | `DATABASE_URL`    | La URL de tu Postgres (ej. `postgresql://user:pass@host/db?sslmode=require`) |
   | `ADMIN_USER`      | Tu usuario de admin                                                   |
   | `ADMIN_PASSWORD`  | Tu contraseña de admin                                                |

   Marcá “Production”, “Preview” y “Development” si querés usarlas en todos los entornos.

5. **Desplegar**  
   Guardá las variables y hacé “Redeploy” (o un nuevo push al repo).  
   La primera vez puede fallar si la base está vacía: tenés que crear las tablas.

6. **Crear las tablas en la base de producción**  
   Una sola vez, ejecutá las migraciones contra la base de Vercel/Neon:

   ```bash
   DATABASE_URL="postgresql://..." npm run db:push
   ```

   Reemplazá `DATABASE_URL` por la misma URL que pusiste en Vercel (la de producción). Así Prisma crea las tablas en esa base.

7. **Panel admin en producción**  
   Tu app quedará en `https://tu-proyecto.vercel.app`.  
   El admin: **https://tu-proyecto.vercel.app/admin** (mismo usuario y contraseña que configuraste en `ADMIN_USER` y `ADMIN_PASSWORD`).

## Próximos Pasos (Mejoras Futuras)

- Panel de administración para aprobar/rechazar perfiles
- Sistema de autenticación para administradores
- Búsqueda por texto libre
- Filtros adicionales (precio, disponibilidad, etc.)
- Sistema de favoritos
- Notificaciones por email cuando se aprueba un perfil

## Licencia

Este proyecto es privado.

