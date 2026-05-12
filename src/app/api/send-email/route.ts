import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, message, name } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `Seu Portfólio <${process.env.SMTP_USER}>`,
      to: 'emanuele.mdsilva@gmail.com', 
      replyTo: email,
      subject: `Novo Contato: ${name}`,
      text: message,
      html: `<p>Você recebeu uma mensagem de: <strong>${name} (${email})</strong></p>
             <p>${message}</p>`,
    });

    return NextResponse.json({ message: 'E-mail enviado com sucesso!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao enviar e-mail' }, { status: 500 });
  }
}
