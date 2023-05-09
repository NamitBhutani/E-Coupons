import { c as create_ssr_component } from "../../chunks/index3.js";
import "../../chunks/singletons.js";
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
