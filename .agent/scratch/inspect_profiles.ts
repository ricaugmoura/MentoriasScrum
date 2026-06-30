import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectProfiles() {
  console.log("🔍 Investigando perfis (Profiles)...");
  // Removido 'email' pois deu erro anteriormente
  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, role, lodge_id")
    .limit(10);

  if (profileError) {
    console.error("❌ Erro ao buscar perfis:", profileError);
    return;
  }

  console.log(`👤 Perfis encontrados (${profiles.length}):`);
  profiles.forEach(p => {
    console.log(`- ${p.full_name} | ID: ${p.id} | Role: ${p.role} | Lodge: ${p.lodge_id}`);
  });
}

inspectProfiles();
