export default defineConfig({
  plugins: [vue(), vueDevTools()],
  base: "/todoma-site/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
