import { e as error, r as redirect } from "../../../chunks/index.js";
const actions = {
  default: async ({ locals }) => {
    const { error: err } = await locals.supabase.auth.signOut();
    if (err) {
      throw error(500, "Oops, something went wrong!");
    }
    throw redirect(303, "/");
  }
};
export {
  actions
};
