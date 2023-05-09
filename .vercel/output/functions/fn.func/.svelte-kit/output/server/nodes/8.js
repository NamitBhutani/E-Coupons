import * as server from '../entries/pages/register/vendor/_page.server.ts.js';

export const index = 8;
export const component = async () => (await import('../entries/pages/register/vendor/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/register/vendor/+page.server.ts";
export const imports = ["_app/immutable/chunks/8.c07ee5d6.js","_app/immutable/chunks/index.a7df7965.js"];
export const stylesheets = ["_app/immutable/assets/8.15c66772.css"];
export const fonts = [];
