import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/schemas/contact.schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate Request
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation Failed",
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const { name, email, phone, message } = result.data;

    // await resend.emails.send({
    //   from: "Priyaa Textile <onboarding@resend.dev>",
    //   to: ["priyaofficial1926@gmail.com"], 
    //   subject: "New Contact Form Submission",
    //   html: `
    //     <div style="font-family:Arial,sans-serif;padding:20px">
    //       <h2>📩 New Contact Form Submission</h2>

    //       <hr/>

    //       <p><strong>Name:</strong> ${name}</p>

    //       <p><strong>Email:</strong> ${email}</p>

    //       <p><strong>Phone:</strong> ${phone}</p>

    //       <p><strong>Message:</strong></p>

    //       <p>${message}</p>
    //     </div>
    //   `,
    // });

// await resend.emails.send({
//   from: "onboarding@resend.dev",
//   to: "yourgmail@gmail.com",
//   subject: "Test Email",
//   html: "<h1>Hello from Priyaa Textile</h1>",
// });

const { data, error } = await resend.emails.send({
  from: "Priyaa Textile <onboarding@resend.dev>",
  to: ["yourgmail@gmail.com"],
  subject: "New Contact Form Submission",
  html: `<h1>Test Email</h1>`,
});

console.log("Data:", data);
console.log("Error:", error);
    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}