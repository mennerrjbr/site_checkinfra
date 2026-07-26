import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, city, message } = body;

    // Validação básica dos campos obrigatórios
    if (!name || !phone || !email || !city || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são de preenchimento obrigatório.' },
        { status: 400 }
      );
    }

    // Configuração do transporter com as variáveis de ambiente SMTP
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    // Verificar se as credenciais SMTP estão presentes
    if (!host || !user || !pass) {
      console.error('Configurações SMTP ausentes no ambiente.');
      return NextResponse.json(
        { error: 'Erro de configuração do servidor de e-mail.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true para porta 465, false para outras portas (ex: 587)
      auth: {
        user,
        pass,
      },
    });

    // Formatação em HTML limpo e profissional
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f6f8; color: #333333; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e2e8f0; }
          .header { border-bottom: 2px solid #0052cc; padding-bottom: 15px; margin-bottom: 20px; }
          .header h2 { margin: 0; color: #0052cc; font-size: 20px; }
          .field { margin-bottom: 15px; }
          .field-label { font-weight: bold; color: #4a5568; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .field-value { font-size: 15px; color: #1a202c; margin-top: 4px; line-height: 1.5; }
          .message-box { background: #f8fafc; padding: 15px; border-left: 4px solid #0052cc; border-radius: 4px; margin-top: 5px; white-space: pre-wrap; }
          .footer { margin-top: 30px; font-size: 12px; color: #a0aec0; text-align: center; border-top: 1px solid #edf2f7; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Novo Contato via Site - Checkinfra</h2>
          </div>
          <div class="field">
            <div class="field-label">Nome:</div>
            <div class="field-value">${name}</div>
          </div>
          <div class="field">
            <div class="field-label">Telefone / WhatsApp:</div>
            <div class="field-value">${phone}</div>
          </div>
          <div class="field">
            <div class="field-label">E-mail:</div>
            <div class="field-value">${email}</div>
          </div>
          <div class="field">
            <div class="field-label">Cidade:</div>
            <div class="field-value">${city}</div>
          </div>
          <div class="field">
            <div class="field-label">Mensagem:</div>
            <div class="message-box">${message}</div>
          </div>
          <div class="footer">
            E-mail enviado automaticamente através do formulário de contato do site Checkinfra.
          </div>
        </div>
      </body>
      </html>
    `;

    // Formatação em texto claro
    const textContent = `
Novo Contato via Site - Checkinfra
==================================

Nome: ${name}
Telefone/WhatsApp: ${phone}
E-mail: ${email}
Cidade: ${city}

Mensagem:
${message}

----------------------------------
E-mail enviado automaticamente pelo site Checkinfra.
    `.trim();

    // Envio do e-mail
    await transporter.sendMail({
      from: user,
      to: 'contato@checkinfra.com.br',
      replyTo: email,
      subject: `Novo contato via site: ${name}`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json(
      { success: true, message: 'Mensagem enviada com sucesso!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao enviar e-mail via SMTP:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
