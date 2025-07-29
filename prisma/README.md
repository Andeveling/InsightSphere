# 🗄️ Database Setup - InsightSphere

## 📋 Configuración Inicial

### 1. Variables de Entorno
Asegúrate de tener el archivo `.env` con:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="your-openai-api-key-here"
```

### 2. Instalación de Dependencias
```bash
pnpm install
```

### 3. Configuración de la Base de Datos
```bash
# Generar el cliente Prisma
pnpm prisma generate

# Aplicar el esquema a la base de datos
pnpm prisma db push

# Poblar la base de datos con datos iniciales
pnpm db:seed
```

## 🎯 Datos Incluidos en el Seeding

### Dominios HIGH5 (4):
- **Doing** - Ejecución y acción
- **Feeling** - Conexión emocional  
- **Motivating** - Influencia e inspiración
- **Thinking** - Cognición y estrategia

### Fortalezas HIGH5 (20):
- **5 fortalezas por dominio** según clasificación oficial
- Believer correctamente clasificado en "Feeling"

### Equipos de Prueba (3):
- **Team Alpha** - Frontend (2 usuarios)
- **Team Beta** - Backend (3 usuarios)  
- **Team Gamma** - Design (1 usuario)

### Usuarios de Prueba (6):
- Contraseña: `password123` (para todos)
- Emails: `ana.garcia@insightsphere.com`, `carlos.mendoza@insightsphere.com`, etc.

## 🔧 Comandos Útiles

```bash
# Ver la base de datos en interfaz gráfica
pnpm db:studio

# Resetear la base de datos
pnpm db:reset

# Re-ejecutar el seeder
pnpm db:seed

# Verificar esquema
pnpm prisma validate
```

## ⚠️ Importante

- **NO** commitear archivos `*.db` al repositorio
- La base de datos se crea automáticamente en desarrollo
- Los datos de seeding son solo para desarrollo/testing
- En producción usar una base de datos real (PostgreSQL, MySQL, etc.)

## 🔍 Verificación

Para verificar que todo funciona:
1. Ejecuta `pnpm db:studio`
2. Ve a http://localhost:5556
3. Verifica que existan:
   - 4 dominios
   - 20 fortalezas (5 por dominio)
   - 3 equipos
   - 6 usuarios

## 🚀 Siguiente Paso

Una vez configurada la base de datos, puedes continuar con:
- Sistema de autenticación (NextAuth.js)
- Componentes UI (shadcn/ui)
- Páginas de onboarding
