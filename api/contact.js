import nodemailer from 'nodemailer';

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'contato@mentoriasscrum.com.br';

const isMockEmail = !smtpHost || smtpHost === 'smtp.mailtrap.io' && smtpUser === 'your-smtp-user';

let transporter = null;
if (!isMockEmail) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort) || 587,
    secure: parseInt(smtpPort) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
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
    return res.status(455).json({ success: false, message: 'Método não permitido.' });
  }

  try {
    const { name, email, subject, message } = req.body;

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

    const emailContent = {
      from: `"${name}" <${email}>`,
      to: receiverEmail,
      subject: `[Contato Portal] ${subject}`,
      text: `Nome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\nMensagem:\n\n${message}`,
      html: `
        <h3>Nova mensagem de contato do Portal</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <div style="background: #f1f5f9; padding: 15px; border-radius: 5px; border: 1px solid #e2e8f0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      `
    };

    if (isMockEmail) {
      console.log('\n--- [CONTACT FORM SUBMISSION (SIMULATION VERCEL)] ---');
      console.log(`From: ${name} <${email}>`);
      console.log(`To: ${receiverEmail}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log('---------------------------------------------------\n');

      return res.status(200).json({
        success: true,
        message: 'Sua mensagem foi enviada com sucesso! (Modo Simulação)',
        mock: true
      });
    }

    await transporter.sendMail(emailContent);

    return res.status(200).json({
      success: true,
      message: 'Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.'
    });

  } catch (error) {
    console.error('Error sending contact email in Vercel function:', error);
    return res.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.'
    });
  }
}
