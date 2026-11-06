import Link from "next/link";
import { Check } from "lucide-react";
import { plans } from "@/lib/content";

export const metadata = { title: "Membership | Crea Maharatsrat Fitness" };

export default function MembershipPage() {
  return (
    <>
      <section className="page-hero"><p className="section-kicker">MEMBERSHIP OPTIONS</p><h1>Your goals.<br />Your <em>membership.</em></h1><p>Choose a starting point that fits your routine. You can update plan details with the team as your needs change.</p></section>
      <section className="section"><div className="pricing-grid">{plans.map((plan) => <article className={"price-card" + (plan.featured ? " featured" : "")} key={plan.name}>{plan.featured && <span className="price-badge">MOST POPULAR</span>}<span className="price-name">{plan.name}</span><p className="price-amount">{plan.price}<small> / month</small></p><p className="muted-copy">{plan.description}</p><ul>{plan.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul><Link className={plan.featured ? "button" : "button button-outline"} href={"/register?plan=" + plan.name.toLowerCase()}>Choose {plan.name}</Link></article>)}</div><p className="form-note pricing-note">Annual billing and payment activation will be configured after you add your payment provider details.</p></section>
      <section className="cta-band"><h2>Need help choosing?</h2><Link className="button" href="/contact">Ask our team →</Link></section>
    </>
  );
}
