import { c as create_ssr_component, d as add_attribute } from "../../../chunks/index3.js";
import "qrcode";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let qrDataURL;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="img"><img${add_attribute("src", qrDataURL, 0)} alt=""></div>`;
});
export {
  Page as default
};
