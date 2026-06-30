import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Usually anon key is not enough for service role tasks, but let's see.

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, organizer_id, lodge_id, status')

  if (error) {
    console.error('Error fetching events:', error)
    return
  }

  console.log('--- Events in Supabase ---')
  console.log(JSON.stringify(events, null, 2))
  
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name')
  
  console.log('--- Profiles in Supabase ---')
  console.log(JSON.stringify(profiles, null, 2))
}

main()
