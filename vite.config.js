import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgR from "vite-plugin-svgr";
import viteCommonjs from "vite-plugin-commonjs";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import { promises as fs } from "fs";
import { plugin as mdPlugin } from "vite-plugin-markdown";

export default defineConfig(() => {
  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      outDir: "dist",
      rollupOptions: {
        input: {
          main: "./index.html",
        },
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[hash].js",
        },

        plugins: [viteCommonjs()],
      },
    },
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          esbuildCommonjs(["moment", "moment-duration-format"]),
          {
            name: "load-js-files-as-jsx",
            setup(build) {
              build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                loader: "jsx",
                contents: await fs.readFile(args.path, "utf8"),
              }));
            },
          },
        ],
      },
    },
    plugins: [
      mdPlugin(),
      viteCommonjs(),
      react({
        babel: {
          babelrc: true,
        },
      }),
      svgR(),
    ],
    server: {
      port: 3000,
    },
  };
});
