import { defineConfig } from 'vite';
import { ghPages } from 'vite-plugin-gh-pages';

export default defineConfig({
    base: '/dat-a-boi-landing-page/', // Replace with your repo name
    plugins: [ghPages()], // Add the GitHub Pages plugin
});
