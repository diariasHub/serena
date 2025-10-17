# 🧠 Emocionario - Seguimiento Emocional

Una aplicación móvil moderna para el seguimiento de emociones y bienestar mental, construida con Next.js y HeroUI.

## ✨ Características

### 🔐 **Sistema de Autenticación**
- Login con correo electrónico y nombre
- Simulación de login con Google
- Persistencia con localStorage

### 😊 **Selección de Emociones**
- 5 estados emocionales principales:
  - 😵 Mal
  - 😢 Triste  
  - 😐 Neutro
  - 😊 Feliz
  - 🤩 Emocionado

### 📅 **Calendario Emocional**
- Vista mensual con navegación
- Visualización de emociones por día con emojis
- Registro histórico de estados emocionales

### 🎁 **Frase Diaria**
- Cajita sorpresa interactiva
- Frases de bienestar mental personalizadas
- Basadas en la emoción predominante del mes

### 🧠 **Biblioteca de Emociones** 
- 42 cartas de emociones diferentes
- Animaciones de volteo interactivas
- Descripciones detalladas con:
  - Qué es la emoción
  - Cómo identificarla
  - Cómo gestionarla
  - Técnicas de control

## 🛠️ Tecnologías

- **Framework:** Next.js 14 con App Router
- **Lenguaje:** TypeScript
- **UI:** HeroUI (NextUI)
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Estado:** localStorage (para esta versión frontend)

## 📱 Diseño Mobile-First

La aplicación está optimizada para dispositivos móviles con diseño responsive que se adapta a:
- 📱 Móviles (vista principal)
- 📱 Tablets
- 💻 Desktop

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn

### Configuración

1. **Clonar el repositorio:**
```bash
git clone https://github.com/diariasHub/serena.git
cd serena
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno (opcional):**
```bash
cp .env.example .env.local
# Editar .env.local con tus configuraciones
```

### Comandos

```bash
# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start

# Linting
npm run lint
```

La aplicación estará disponible en `http://localhost:3000`

## 🔒 Seguridad

- ✅ Variables de entorno protegidas con `.env.local`
- ✅ Archivo `.gitignore` configurado para excluir datos sensibles
- ✅ No hay credenciales hardcodeadas en el código
- ✅ Autenticación simulada para desarrollo (sin datos reales)

> **Nota:** Esta versión utiliza localStorage para persistencia local. Para producción, implementar autenticación y base de datos reales.

## 🎯 Flujo de Usuario

1. **Login:** El usuario ingresa con email/Google
2. **Selección:** Elige su emoción actual del día
3. **Dashboard:** Ve su calendario emocional
4. **Exploración:** Puede acceder a:
   - Frase diaria personalizada
   - Biblioteca de 42 emociones

## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── LoginScreen.tsx       # Pantalla de autenticación
│   │   ├── EmotionSelection.tsx  # Selección de emociones
│   │   ├── MainDashboard.tsx     # Dashboard principal
│   │   ├── Calendar.tsx          # Componente calendario
│   │   ├── DailyPhrase.tsx       # Modal de frases
│   │   └── EmotionsGrid.tsx      # Biblioteca de emociones
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── tailwind.config.ts
└── package.json
```

## 🎨 Paleta de Colores

La aplicación utiliza una paleta suave y relajante:
- **Primario:** Púrpura (#8B5CF6)
- **Secundario:** Rosa (#EC4899)
- **Fondos:** Gradientes suaves de púrpura a rosa/azul
- **Emociones:** Colores específicos para cada estado emocional

## 🌟 Características Especiales

### Animaciones Suaves
- Transiciones fluidas entre pantallas
- Animaciones de entrada escalonadas
- Efectos de hover y tap optimizados para móvil

### Frases Personalizadas
- Sistema inteligente que analiza emociones predominantes
- Mensajes de bienestar mental específicos para cada estado
- Cajita sorpresa con experiencia lúdica

### Cartas de Emociones Interactivas
- 42 emociones con descripciones completas
- Animación 3D de volteo
- Información educativa sobre manejo emocional

## 🔮 Próximas Características

- 🔄 Sincronización en la nube
- 📊 Gráficos y estadísticas emocionales
- 🔔 Recordatorios personalizados
- 👥 Compartir con profesionales de salud mental
- 🎵 Integración con contenido multimedia

## 🤝 Contribución

Este proyecto está diseñado para ayudar al bienestar mental. Las contribuciones son bienvenidas para mejorar la experiencia del usuario y añadir características que promuevan la salud emocional.

## 📄 Licencia

Proyecto desarrollado con fines educativos y de bienestar mental.

---

**¡Cuida tu bienestar emocional! 💙**
