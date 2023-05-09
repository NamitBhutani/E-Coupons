import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
export const component = async () => (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/chunks/2.6e8252ee.js","_app/immutable/chunks/index.a7df7965.js"];
export const stylesheets = ["_app/immutable/assets/2.8f2e14ab.css"];
export const fonts = [];
