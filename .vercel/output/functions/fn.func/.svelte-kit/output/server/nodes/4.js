import * as server from '../entries/pages/login/_page.server.ts.js';

export const index = 4;
export const component = async () => (await import('../entries/pages/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/login/+page.server.ts";
export const imports = ["_app/immutable/chunks/4.ff90e9d4.js","_app/immutable/chunks/index.a7df7965.js"];
export const stylesheets = ["_app/immutable/assets/4.1edabe29.css"];
export const fonts = [];
