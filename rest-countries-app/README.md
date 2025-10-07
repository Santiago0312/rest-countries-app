# Explorador de Países (HTML + CSS + JS)

Proyecto base inspirado en el reto **REST Countries API with color theme switcher** de Frontend Mentor.  
En este demo, consumimos la API pública **REST Countries v3** desde el navegador para listar países, buscar por nombre, filtrar por región, ver detalles y alternar modo claro/oscuro.

## 🚀 Cómo ejecutar localmente
1. Descarga el ZIP de este repositorio (o clónalo).
2. Abre `index.html` haciendo doble clic (no requiere servidor).  
   > *Tip:* Si usas extensiones tipo "Live Server" en VS Code, también funciona.

## 🌐 Despliegue en GitHub Pages
1. Crea un repositorio en GitHub y sube `index.html`, `styles.css` y `app.js` (y este README).
2. En GitHub, ve a **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch** y elige la rama (ej. `main`) y la carpeta `/root`.
4. Guarda. Te dará una URL tipo: `https://TU-USUARIO.github.io/NOMBRE-REPO/`.

## 🔌 API utilizada
- Endpoint: `https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3,subregion,languages,currencies`  
- Documentación: https://restcountries.com/

## 📚 Recursos consultados
- MDN Web Docs — Fetch API (2023, 14 noviembre).  
- Rubiales Gómez, M. (2021). *Curso de desarrollo Web. HTML, CSS y JavaScript.*
- Recurso educativo 2. *Creación y despliegue de aplicaciones web* (de tu curso).

## 🧪 Pruebas rápidas
- Buscar “col” debería mostrar **Colombia**.
- Filtrar por **Europa** lista países europeos.
- Haz clic en una tarjeta para ver detalles en un `<dialog>` nativo.

## ✅ Accesibilidad & UX
- `aria-live="polite"` en el grid para avisar cambios a lectores de pantalla.
- Contrastes y foco visibles.
- Tema persistente con `localStorage`.
