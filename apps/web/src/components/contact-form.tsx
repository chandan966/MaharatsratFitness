"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { API_URL } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email."),
  phone: z.string().trim().max(32).optional(),
  subject: z.string().trim().min(2, "Add a subject.").max(120),
  message: z.string().trim().min(10, "Tell us a little more.").max(4000)
});
type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" }
  });

  async function submit(values: ContactValues) {
    setError("");
    setResult("");
    try {
      const response = await fetch(API_URL + "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const payload = await response.json();
      if (!response.ok) return setError(payload.error || "We could not send your message.");
      setResult(payload.message);
      reset();
    } catch {
      setError("Could not reach the API. Start the backend and try again.");
    }
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit(submit)} noValidate>
      <div className="field-pair">
        <label className="field">Name<input {...register("name")} />{errors.name && <span className="field-error">{errors.name.message}</span>}</label>
        <label className="field">Email<input type="email" {...register("email")} />{errors.email && <span className="field-error">{errors.email.message}</span>}</label>
      </div>
      <div className="field-pair">
        <label className="field">Phone (optional)<input type="tel" {...register("phone")} /></label>
        <label className="field">Subject<input {...register("subject")} />{errors.subject && <span className="field-error">{errors.subject.message}</span>}</label>
      </div>
      <label className="field">Message<textarea {...register("message")} />{errors.message && <span className="field-error">{errors.message.message}</span>}</label>
      {error && <div className="form-error" role="alert">{error}</div>}
      {result && <div className="form-success" role="status">{result}</div>}
      <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send message →"}</button>
    </form>
  );
}
