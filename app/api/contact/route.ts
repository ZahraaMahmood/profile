import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const destination =
  process.env.CONTACT_TO_EMAIL || "zahraamahmood222@gmail.com";

const allowedOrigins = new Set([
  "https://zahraa-tech.com",
  "https://www.zahraa-tech.com",
  "http://localhost:3000",
]);

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );
}

export async function POST(req: NextRequest) {
  try {
    // Allow requests from the portfolio domains.
    const origin = req.headers.get("origin");

    if (origin && !allowedOrigins.has(origin)) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 },
      );
    }

    if (Number(req.headers.get("content-length") || 0) > 12000) {
      return NextResponse.json(
        { error: "Message is too large." },
        { status: 413 },
      );
    }

    const body = await req.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot spam protection.
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const { name, email, message } = body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      name.trim().length < 2 ||
      name.length > 100 ||
      !isValidEmail(email) ||
      message.trim().length < 10 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        {
          error: "Please enter a valid name, email, and message.",
        },
        { status: 400 },
      );
    }

    // Optional Cloudflare Turnstile verification.
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (typeof body.turnstileToken !== "string") {
        return NextResponse.json(
          { error: "Spam verification is required." },
          { status: 400 },
        );
      }

      const verification = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: body.turnstileToken,
            remoteip: req.headers.get("x-forwarded-for")?.split(",")[0] || "",
          }),
        },
      );

      if (!verification.ok) {
        console.error(
          "Turnstile verification request failed",
          verification.status,
        );

        return NextResponse.json(
          { error: "Spam verification is unavailable." },
          { status: 502 },
        );
      }

      const result = await verification.json();

      if (!result.success) {
        return NextResponse.json(
          { error: "Spam verification failed." },
          { status: 403 },
        );
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !from) {
      console.error("Contact form email not configured");

      return NextResponse.json(
        {
          error:
            "Contact form is temporarily unavailable. Please email me directly.",
        },
        { status: 503 },
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [destination],
        reply_to: email.trim(),
        subject: `Portfolio contact from ${name
          .replace(/[\r\n]/g, " ")
          .slice(0, 80)}`,
        html: `
          <div style="font-family:sans-serif;line-height:1.6">
            <h2>New portfolio enquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <hr/>
            <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
          </div>
        `,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error(
        "Email provider rejected contact message",
        response.status,
        await response.text(),
      );

      return NextResponse.json(
        {
          error: "Message could not be delivered. Please email me directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      "Contact route error",
      error instanceof Error ? error.message : "unknown",
    );

    return NextResponse.json(
      { error: "Unable to process your message right now." },
      { status: 500 },
    );
  }
}
