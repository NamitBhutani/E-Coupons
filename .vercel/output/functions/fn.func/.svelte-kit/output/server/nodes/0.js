import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/chunks/0.99a06da5.js","_app/immutable/chunks/app.d62c7e4b.js","_app/immutable/chunks/index.a7df7965.js"];
export const stylesheets = ["_app/immutable/assets/2.8f2e14ab.css","_app/immutable/assets/3.20f93ad2.css","_app/immutable/assets/4.1edabe29.css","_app/immutable/assets/6.375e6e68.css","_app/immutable/assets/8.15c66772.css"];
export const fonts = [];
