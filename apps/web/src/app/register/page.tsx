import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Join the Club | Crea Maharatsrat Fitness" };

export default function RegisterPage() {
  return <section className="auth-section"><div className="form-card"><p className="section-kicker">START YOUR JOURNEY</p><h1>Create your account</h1><p>Join Crea Maharatsrat Fitness and take the next step toward your goals.</p><AuthForm mode="register" /><p className="auth-switch">Already a member? <Link href="/login">Sign in</Link></p></div></section>;
}
