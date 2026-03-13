import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, company, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "AI Delivered Contact <onboarding@resend.dev>",
    to: ["drew@aidelivered.com", "casey@aidelivered.com"],
    replyTo: email,
    subject: `New contact form submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
