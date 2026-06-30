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
    .select('title, start_date, end_date, status')

  if (error) {
    console.error(error)
    return
  }

  console.log(JSON.stringify(events, null, 2))
}

main()
