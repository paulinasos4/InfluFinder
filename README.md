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

## Próximos Pasos (Mejoras Futuras)

- Panel de administración para aprobar/rechazar perfiles
- Sistema de autenticación para administradores
- Búsqueda por texto libre
- Filtros adicionales (precio, disponibilidad, etc.)
- Sistema de favoritos
- Notificaciones por email cuando se aprueba un perfil

## Licencia

Este proyecto es privado.

