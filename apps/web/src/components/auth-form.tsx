"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_URL } from "@/lib/api";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters.")
});
const registerSchema = loginSchema.extend({
  name: z.string().trim().min(2, "Enter your name.").max(80)
});

type FormValues = { name?: string; email: string; password: string };

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const schema = mode === "register" ? registerSchema : loginSchema;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" }
  });

  async function submit(values: FormValues) {
    setServerError("");
    try {
      const response = await fetch(API_URL + "/api/auth/" + mode, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const payload = await response.json();
      if (!response.ok) {
        setServerError(payload.error || "We could not complete that request.");
        return;
      }
      router.push(payload.user.role === "ADMIN" ? "/admin" : payload.user.role === "TRAINER" ? "/trainer" : "/member");
      router.refresh();
    } catch {
      setServerError("Could not reach the API. Start the backend and try again.");
    }
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit(submit)} noValidate>
      {mode === "register" && <label className="field">Full name<input autoComplete="name" {...register("name")} />{errors.name && <span className="field-error">{errors.name.message}</span>}</label>}
      <label className="field">Email address<input type="email" autoComplete="email" {...register("email")} />{errors.email && <span className="field-error">{errors.email.message}</span>}</label>
      <label className="field">Password<input type="password" autoComplete={mode === "register" ? "new-password" : "current-password"} {...register("password")} />{errors.password && <span className="field-error">{errors.password.message}</span>}</label>
      {serverError && <div className="form-error" role="alert">{serverError}</div>}
      <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please wait…" : mode === "register" ? "Create account →" : "Sign in →"}</button>
      <p className="form-note">Your account is stored securely. Passwords are hashed by the API.</p>
    </form>
  );
}
