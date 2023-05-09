import { c as create_ssr_component, e as escape } from "../../chunks/index3.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-mbt6j4,p.svelte-mbt6j4{text-align:center;padding:1rem}a.svelte-mbt6j4,button.svelte-mbt6j4{width:95%;margin:2.5%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isValid;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  ({ isValid } = data);
  return `<h1 class="svelte-mbt6j4">Welcome to E-Coupons!</h1>
${data.session ? `<p class="svelte-mbt6j4">Welcome, ${escape(data.session.user.email)}!</p>
	<form method="POST" action="/logout"><button type="submit" class="svelte-mbt6j4">Logout </button></form>
	<p class="svelte-mbt6j4">${escape(JSON.stringify(isValid))}</p>` : `<div class="grid"><a href="/login" role="button" class="svelte-mbt6j4">Login</a>
		<a href="/register/vendor" role="button" class="svelte-mbt6j4">Register</a></div>`}`;
});
export {
  Page as default
};
