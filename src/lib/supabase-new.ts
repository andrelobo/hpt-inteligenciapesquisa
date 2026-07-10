import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const NEW_SUPABASE_URL = "https://zkitteyohucxeylpbjlg.supabase.co";
const NEW_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_sXZksW_PxleuqITyXAM9Qw__gQzsvBa";

function createNewSupabaseFetch(): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request
        ? input.headers
        : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    if (headers.get("Authorization") === `Bearer ${NEW_SUPABASE_PUBLISHABLE_KEY}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", NEW_SUPABASE_PUBLISHABLE_KEY);
    return fetch(input, { ...init, headers });
  };
}

export const supabaseNew = createClient<Database>(
  NEW_SUPABASE_URL,
  NEW_SUPABASE_PUBLISHABLE_KEY,
  {
    global: { fetch: createNewSupabaseFetch() },
    auth: {
      storage: typeof window !== "undefined" ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);
