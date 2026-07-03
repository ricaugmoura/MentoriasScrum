const nodemailer = require('nodemailer');

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'contato@mentoriasscrum.com.br';

/**
 * Helper to escape HTML characters and prevent HTML injection
 */
function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

const isMockEmail = !smtpHost || smtpHost === 'smtp.mailtrap.io' && smtpUser === 'your-smtp-user';

let transporter = null;

if (!isMockEmail) {
    transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort) || 587,
        secure: parseInt(smtpPort) === 465, // true for 465, false for other ports
        auth: {
            user: smtpUser,
            pass: smtpPass
        }
    });
    console.log('✅ Email transporter initialized.');
} else {
    console.warn('⚠️ SMTP not configured. Contact messages will be logged to console (Mock Mode).');
}

/**
 * Handle contact form submission.
 */
exports.sendContactEmail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Por favor, preencha todos os campos obrigatórios.'
            });
        }

        if (!email.includes('@')) {
            return res.status(400).json({
                success: false,
                message: 'Por favor, forneça um endereço de e-mail válido.'
            });
        }

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message);

        const emailContent = {
            from: `"${safeName}" <${receiverEmail}>`,
            replyTo: email,
            to: receiverEmail,
            subject: `[Contato Portal] ${safeSubject}`,
            text: `Nome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\nMensagem:\n\n${message}`,
            html: `
                <h3>Nova mensagem de contato do Portal</h3>
                <p><strong>Nome:</strong> ${safeName}</p>
                <p><strong>E-mail:</strong> ${safeEmail}</p>
                <p><strong>Assunto:</strong> ${safeSubject}</p>
                <p><strong>Mensagem:</strong></p>
                <div style="background: #f1f5f9; padding: 15px; border-radius: 5px; border: 1px solid #e2e8f0;">
                    ${safeMessage.replace(/\n/g, '<br>')}
                </div>
            `
        };

        if (isMockEmail) {
            console.log('\n--- [CONTACT FORM SUBMISSION (SIMULATION)] ---');
            console.log(`From: ${name} <${email}>`);
            console.log(`To: ${receiverEmail}`);
            console.log(`Subject: ${subject}`);
            console.log(`Message: ${message}`);
            console.log('---------------------------------------------\n');
            
            return res.status(200).json({
                success: true,
                message: 'Sua mensagem foi enviada com sucesso! (Modo Simulação)',
                mock: true
            });
        }

        // Send actual email
        await transporter.sendMail(emailContent);

        return res.status(200).json({
            success: true,
            message: 'Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.'
        });

    } catch (error) {
        console.error('Error sending contact email:', error);
        return res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.'
        });
    }
};
