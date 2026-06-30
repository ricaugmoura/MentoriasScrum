import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkEventOwners() {
  console.log("🔍 Investigando os eventos cadastrados...");
  
  const { data: events, error: eventError } = await supabase
    .from("events")
    .select("id, title, organizer_id, lodge_id, status");

  if (eventError) {
    console.error("❌ Erro ao buscar eventos:", eventError);
    return;
  }

  console.log(`📊 Total de eventos no banco: ${events?.length || 0}`);
  
  if (events && events.length > 0) {
    events.forEach(e => {
      console.log(`- [${e.status}] "${e.title}" | ID: ${e.id}`);
      console.log(`  👤 Organizer ID: ${e.organizer_id}`);
      console.log(`  🏢 Lodge ID: ${e.lodge_id}`);
    });
  }

  console.log("\n🔍 Investigando perfis (Profiles)...");
  const { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, email, role")
    .limit(5);

  if (profileError) {
    console.error("❌ Erro ao buscar perfis:", profileError);
    return;
  }

  console.log(`👤 Perfis encontrados (${profiles.length}):`);
  profiles.forEach(p => {
    console.log(`- ${p.full_name} (${p.email || 'N/A'}) | ID: ${p.id} | Role: ${p.role}`);
  });
}

checkEventOwners();
