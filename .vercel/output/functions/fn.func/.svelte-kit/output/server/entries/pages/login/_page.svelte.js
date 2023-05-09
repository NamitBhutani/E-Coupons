import { c as create_ssr_component } from "../../../chunks/index3.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "form.svelte-ktnggy{width:95%;margin:2.5%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<form method="POST" action="?/login" class="svelte-ktnggy"><div>Email:</div>
	<input type="text" name="email">
	<div>Password:</div>
	<input type="password" name="password">
	<button type="submit">Login as Vendor</button></form>
<form class="oauth svelte-ktnggy" method="POST"><button type="submit" formaction="?/login&provider=google">Login with Google-(NOT FOR VENDORS)</button>
</form>`;
});
export {
  Page as default
};
