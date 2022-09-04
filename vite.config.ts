import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()] ,
  server:{
    port:8080, //ポート番号の指定
    host: true
  }
})
