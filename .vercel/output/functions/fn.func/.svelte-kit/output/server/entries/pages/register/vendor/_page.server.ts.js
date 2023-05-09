import { r as redirect } from "../../../../chunks/index.js";
import "../../../../chunks/supabaseClient.js";
import "bcrypt";
const load = async () => {
};
const actions = {
  registerVendor: async ({ request, locals }) => {
    const body = await request.formData();
    const username = body.get("username");
    const email = body.get("email");
    const password = body.get("password");
    const { data, error: err } = await locals.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          isVendor: true
        }
      }
    });
    if (err) {
      console.log(err);
    }
    throw redirect(303, "/confirmemail");
  }
};
export {
  actions,
  load
};
