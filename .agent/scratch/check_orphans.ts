import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkOrphanEvents() {
  console.log("🔍 Checking for events without lodge_id...");
  
  const { data, error, count } = await supabase
    .from("events")
    .select("id, title, organizer_id, lodge_id", { count: "exact" })
    .is("lodge_id", null);

  if (error) {
    console.error("❌ Error fetching events:", error);
    return;
  }

  console.log(`📊 Found ${count} events without lodge_id.`);
  
  if (data && data.length > 0) {
    for (const event of data) {
      console.log(`- Event: "${event.title}" (ID: ${event.id}) | Organizer: ${event.organizer_id}`);
      
      // Look for a fallback lodge for this organizer
      const { data: profile } = await supabase
        .from("profiles")
        .select("lodge_id")
        .eq("id", event.organizer_id)
        .single();
        
      if (profile?.lodge_id) {
        console.log(`   💡 Found fallback lodge in Profile: ${profile.lodge_id}`);
      } else {
        const { data: lodges } = await supabase
          .from("lodges")
          .select("id")
          .eq("owner_id", event.organizer_id)
          .order("created_at", { ascending: false })
          .limit(1);
          
        if (lodges && lodges.length > 0) {
          console.log(`   💡 Found fallback lodge in Lodges: ${lodges[0].id}`);
        } else {
          console.log(`   ⚠️ NO FALLBACK LODGE FOUND for this organizer!`);
        }
      }
    }
  }
}

checkOrphanEvents();
