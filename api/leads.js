import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const isMockSupabase = !supabaseUrl || supabaseUrl === 'your-supabase-url' || !supabaseAnonKey || supabaseAnonKey === 'your-supabase-anon-key';

let supabase = null;
if (!isMockSupabase) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido.' });
  }

  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça um endereço de e-mail válido.'
      });
    }

    if (isMockSupabase) {
      console.log(`[LEAD CAPTURED MOCK] Email: ${email}`);
      return res.status(200).json({
        success: true,
        message: 'E-mail cadastrado com sucesso! (Modo Simulação)',
        mock: true
      });
    }

    // Insert into newsletter_leads table
    const { data, error } = await supabase
      .from('newsletter_leads')
      .insert([{ email, data_cadastro: new Date().toISOString() }])
      .select();

    if (error) {
      // Check for duplicate key error (23505 in PostgreSQL)
      if (error.code === '23505') {
        return res.status(409).json({
          success: false,
          message: 'Este e-mail já está cadastrado em nossa newsletter!'
        });
      }
      throw error;
    }

    return res.status(201).json({
      success: true,
      message: 'E-mail cadastrado com sucesso!',
      data
    });

  } catch (error) {
    console.error('Error registering lead in Vercel function:', error);
    return res.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao processar seu cadastro. Tente novamente mais tarde.'
    });
  }
}
