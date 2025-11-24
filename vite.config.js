import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ==========================================================
  // CORRECCIÓN: Agregar la configuración "test" para asegurar 
  // la compatibilidad con variables de entorno en la compilación
  // ==========================================================
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', 
  },
})