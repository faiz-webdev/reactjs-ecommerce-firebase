# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Create project with vite command
    --1. npm create vite@latest
    --2. npm install
    --3. npm install -D tailwindcss postcss autoprefixer
    --4. npx tailwindcss init -p
    --5. Add the paths to all of your template files in your tailwind.config.js file.
        `/** @type {import('tailwindcss').Config} */
            export default {
                content: [
                    "./index.html",
                    "./src/**/*.{js,ts,jsx,tsx}",
                ],
                theme: {
                    extend: {},
                },
                plugins: [],
            }`
    --6. Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css  file.    
            ``@tailwind base;
            @tailwind components;
            @tailwind utilities;``
    --7. Run your build process with npm run dev.
        `npm run dev`
    --8. npm i react-router-dom
    --9.  npm install @headlessui/react
    --10. npm install react-icons --save
    --11. npm i react-tabs
    --12. npm install @reduxjs/toolkit react-redux
    --13. npm install firebase