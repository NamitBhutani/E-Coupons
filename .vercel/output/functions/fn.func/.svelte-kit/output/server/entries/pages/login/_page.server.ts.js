import { AuthApiError } from "@supabase/supabase-js";
import { f as fail, r as redirect } from "../../../chunks/index.js";
const actions = {
  login: async ({ request, locals, url }) => {
    const provider = url.searchParams.get("provider");
    if (provider) {
      const { data: data2, error: err2 } = await locals.supabase.auth.signInWithOAuth({
        provider
      });
      if (err2) {
        return fail(400, { message: "Oops try again later!" });
      }
      throw redirect(303, `${data2.url}&hd=hyderabad.bits-pilani.ac.in`);
    }
    const body = await request.formData();
    const email = body.get("email");
    const password = body.get("password");
    const { data, error: err } = await locals.supabase.auth.signInWithPassword({
      email,
      password
    });
    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, { error: "Invalid email or password" });
      } else
        return fail(500, { error: "Oops, something went wrong!" });
    }
    throw redirect(303, "/");
  }
};
export {
  actions
};
