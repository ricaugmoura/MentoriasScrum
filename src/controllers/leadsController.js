const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;
const isMockSupabase = !supabaseUrl || supabaseUrl === 'your-supabase-url' || !supabaseAnonKey || supabaseAnonKey === 'your-supabase-anon-key';

if (!isMockSupabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client initialized.');
} else {
    console.warn('⚠️ Supabase credentials not configured. Leads will be logged to console (Mock Mode).');
}

/**
 * Handle newsletter lead registration.
 */
exports.registerLead = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({
                success: false,
                message: 'Por favor, forneça um endereço de e-mail válido.'
            });
        }

        if (isMockSupabase) {
            console.log(`[LEAD CAPTURED] Email: ${email} registered at ${new Date().toISOString()}`);
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
        console.error('Error registering lead:', error);
        return res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao processar seu cadastro. Tente novamente mais tarde.'
        });
    }
};
