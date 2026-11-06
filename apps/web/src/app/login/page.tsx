import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata = { title: "Member Login | Crea Maharatsrat Fitness" };

export default function LoginPage() {
  return <section className="auth-section"><div className="form-card"><p className="section-kicker">WELCOME BACK</p><h1>Member sign in</h1><p>Access your account and keep your training moving.</p><AuthForm mode="login" /><p className="auth-switch">New to the club? <Link href="/register">Create an account</Link></p></div></section>;
}
