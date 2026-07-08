import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Priyaas Boutique" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <h2>Reset Your Password</h2>

      <p>Click the button below to reset your password.</p>

      <a href="${resetLink}"
         style="padding:12px 20px;
                background:#2563eb;
                color:white;
                text-decoration:none;
                border-radius:6px;">
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>
    `,
  });
}