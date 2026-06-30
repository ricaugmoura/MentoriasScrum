import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const { data: lodges, error } = await supabase
    .from('lodges')
    .select('id, name')

  if (error) {
    console.error('Error fetching lodges:', error)
    return
  }

  console.log('--- Lodges in Supabase ---')
  console.log(JSON.stringify(lodges, null, 2))
}

main()
