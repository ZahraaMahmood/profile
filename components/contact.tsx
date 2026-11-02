"use client";
import { FormEvent, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
export function Contact() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setState("loading");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Message could not be sent");
      setState("success");
      setMessage("Message sent successfully. Thank you for reaching out!");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Delivery failed. Please email me directly.",
      );
    }
  }
  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          YOUR NAME
          <input
            name="name"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
            placeholder="Jane Smith"
          />
        </label>
        <label>
          YOUR EMAIL
          <input
            name="email"
            autoComplete="email"
            type="email"
            maxLength={254}
            required
            placeholder="jane@company.com"
          />
        </label>
      </div>
      <label>
        MESSAGE
        <textarea
          name="message"
          minLength={10}
          maxLength={5000}
          rows={5}
          required
          placeholder="Tell me about the opportunity or project..."
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="privacy-note">
        Messages are sent to my inbox. Please don’t include passwords or
        sensitive information.
      </p>
      <div className="form-bottom">
        <button
          className="btn-primary"
          disabled={state === "loading"}
          type="submit"
        >
          <Send size={16} />
          {state === "loading" ? "Sending..." : "Send message"}
          <ArrowUpRight size={16} />
        </button>
        <span
          role="status"
          className={state === "error" ? "form-error" : "form-status"}
        >
          {message}
        </span>
      </div>
    </form>
  );
}
