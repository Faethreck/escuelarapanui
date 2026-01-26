# Escuela Particular Nº 371 Rapa Nui - Website

Website oficial de la Escuela Particular Nº 371 Rapa Nui, construido con Next.js, Tailwind CSS y shadcn/ui.

## 🚀 Características

- **Moderno y Responsive**: Diseño adaptativo para todos los dispositivos
- **Next.js 14**: Framework React con App Router
- **Tailwind CSS**: Estilos utilitarios y diseño consistente
- **shadcn/ui**: Componentes UI accesibles y personalizables
- **TypeScript**: Tipado estático para mayor seguridad
- **Colores Institucionales**: Azul oscuro (#003366), amarillo (#FFD700) y blanco

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página de inicio
│   └── globals.css          # Estilos globales
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── sections/           # Secciones de la página
│   │   ├── hero.tsx
│   │   ├── quick-links.tsx
│   │   ├── about.tsx
│   │   ├── news.tsx
│   │   └── contact.tsx
│   ├── navbar.tsx          # Navegación
│   └── footer.tsx          # Pie de página
├── lib/
│   └── utils.ts            # Utilidades (cn function)
├── public/
│   └── logo.svg            # Logo de la escuela
└── package.json
```

## 🎨 Personalización

### Colores

Los colores están definidos en `tailwind.config.ts`:
- Primary (Azul oscuro): `#003366`
- Secondary (Amarillo): `#FFD700`
- Accent (Amarillo claro): `#FFE55C`

### Componentes

Los componentes están en `components/` y pueden ser personalizados fácilmente. Los componentes de shadcn/ui están en `components/ui/`.

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint

## 🌐 Información de la Escuela

- **Nombre**: Escuela Particular Nº 371 Rapa Nui
- **Dirección**: Av. Las Torres 935, 8980333 Lo Prado, Región Metropolitana
- **Estudiantes**: ~185
- **Fundación**: 1958
- **Teléfono**: (2) 2730-784
- **Email**: escuelarapanui@gmail.com

## 📚 Tecnologías Utilizadas

- [Next.js](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Radix UI](https://www.radix-ui.com/) - Componentes primitivos accesibles
- [Lucide React](https://lucide.dev/) - Iconos

## 📄 Licencia

Este proyecto es propiedad de la Escuela Particular Nº 371 Rapa Nui.
