import { c as create_ssr_component } from "../../../../chunks/index3.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-ib1gx2{text-align:center;margin-top:1rem}form.svelte-ib1gx2{width:95%;margin-left:2.5%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css);
  return `<h1 class="svelte-ib1gx2">Register as Vendor</h1>
<form action="?/registerVendor" method="POST" class="svelte-ib1gx2"><div class="grid"><div><label for="username">Username</label>
			<input type="text" name="username" id="username" required></div>
		<div><label for="email">Email</label>
			<input type="email" name="email" id="email" required></div>
		<div><label for="password">Password</label>
			<input type="password" name="password" id="password" required></div></div>
	<button type="submit">Register as Vendor</button></form>

${form?.username ? `<p class="error">username is taken</p>` : ``}`;
});
export {
  Page as default
};
