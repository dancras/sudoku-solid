import { defineConfig } from "vite";
import solid from "solid-start";
console.log('BEFORE');
import * as staticAdapter from 'solid-start-static';

console.log(staticAdapter, staticAdapter.build)

export default defineConfig({
  plugins: [solid({
    adapter: staticAdapter
  })],
  server: {
    host: '0.0.0.0'
  },
  preview: {
    host: '0.0.0.0',
  }
});
