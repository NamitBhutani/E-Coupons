import { s as supabase } from "../../chunks/supabaseClient.js";
const load = async ({}) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return {
    isValid: { user }
  };
};
export {
  load
};
