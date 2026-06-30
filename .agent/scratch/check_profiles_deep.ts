import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const organizerId = '69e20428-6dbb-48bb-a7a2-638d37b7bae3'
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', organizerId)
    .single()

  if (error) {
    console.log(`Profile ${organizerId} not found or not accessible:`, error.message)
  } else {
    console.log(`Profile ${organizerId} found!`)
  }
  
  const { count, error: countErr } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  if (countErr) {
    console.error('Error counting profiles:', countErr)
  } else {
    console.log('Total profiles in DB (accessible):', count)
  }
}

main()
