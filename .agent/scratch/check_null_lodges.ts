import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const { data: events, error } = await supabase
    .from('events')
    .select('id, title, lodge_id')
    .is('lodge_id', null)

  if (error) {
    console.error('Error fetching events:', error)
    return
  }

  console.log('--- Events with NULL lodge_id ---')
  console.log(JSON.stringify(events, null, 2))
}

main()
