import Link from "next/link";
import { ArrowRight, Check, Clock3, Dumbbell, HeartPulse, ShieldCheck, Users } from "lucide-react";
import { programs, trainers, plans } from "@/lib/content";

const features = [
  { icon: ShieldCheck, title: "Certified trainers", copy: "Coaching you can trust" },
  { icon: Dumbbell, title: "Modern equipment", copy: "Tools for every goal" },
  { icon: Clock3, title: "Flexible timings", copy: "Train around your day" },
  { icon: HeartPulse, title: "Personal training", copy: "A plan built for you" },
  { icon: Users, title: "Supportive community", copy: "Get stronger together" }
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">STRONGER · FITTER · HEALTHIER</p>
          <h1>Crea<br />Maharatsrat<br /><span>Fitness</span></h1>
          <p className="hero-copy">Train harder. Move better. Become stronger with expert trainers, modern equipment, and a community built around your goals.</p>
          <div className="button-row"><Link className="button" href="/membership">Join now <ArrowRight size={16} /></Link><Link className="button button-outline" href="/about">Explore the club</Link></div>
          <div className="hero-stats"><div className="stat"><strong>10K+</strong><span>Members</span></div><div className="stat"><strong>5+</strong><span>Years of experience</span></div><div className="stat"><strong>4.8/5</strong><span>Member rating</span></div></div>
        </div>
        <div className="hero-scroll">SCROLL TO EXPLORE <span /></div>
      </section>

      <div className="feature-strip">
        {features.map(({ icon: Icon, title, copy }) => <div className="feature" key={title}><Icon className="feature-icon" size={23} strokeWidth={1.8} /><div><strong>{title}</strong><span>{copy}</span></div></div>)}
      </div>

      <section className="section">
        <div className="section-head"><div><p className="section-kicker">TRAIN WITH PURPOSE</p><h2 className="section-title">Find your <em>strong.</em></h2></div><div className="section-intro"><p>Good training meets you where you are, then helps you move forward. Explore programs for every level and every kind of goal.</p><Link className="text-link" href="/classes">Explore all programs <ArrowRight size={15} /></Link></div></div>
        <div className="program-grid">{programs.slice(0, 4).map((program, index) => <Link className="program-card" href="/classes" key={program.slug} style={{ backgroundImage: "linear-gradient(0deg, #080808 0%, rgba(8,8,8,.58) 48%, rgba(8,8,8,.12) 100%), url(" + program.image + ")" }}><span>0{index + 1} / {program.category}</span><h3>{program.name}</h3><p>{program.description}</p><span className="program-link">View program <ArrowRight size={14} /></span></Link>)}</div>
      </section>

      <section className="section section-dark">
        <div className="split"><div className="about-image" role="img" aria-label="Athlete training with weights in a modern gym" /><div><p className="section-kicker">ABOUT CREA MAHARATSRAT FITNESS</p><h2 className="section-title">More than a gym.<br /><em>It's a lifestyle.</em></h2><p className="section-intro">We bring expert coaching, thoughtful programming, and a motivating community together under one roof. Every visit is a chance to build a stronger version of yourself.</p><ul className="check-list"><li><Check size={17} />Coaching for beginners and experienced athletes</li><li><Check size={17} />Strength, conditioning, recovery, and group classes</li><li><Check size={17} />A welcoming place to make progress at your pace</li></ul><Link className="button button-outline" href="/about">Our approach <ArrowRight size={15} /></Link></div></div>
      </section>

      <section className="section">
        <div className="section-head"><div><p className="section-kicker">COACHES WHO CARE</p><h2 className="section-title">Meet your <em>team.</em></h2></div><Link className="text-link" href="/trainers">Meet all trainers <ArrowRight size={15} /></Link></div>
        <div className="trainer-grid">{trainers.map((trainer) => <article className="trainer-card" key={trainer.name}><div className="trainer-photo" style={{ backgroundImage: "url(" + trainer.image + ")" }} /><div className="trainer-info"><p>{trainer.title}</p><h3>{trainer.name}</h3><div className="trainer-meta"><span>{trainer.specialty}</span><span>★ {trainer.rating}</span></div></div></article>)}</div>
      </section>

      <section className="section section-dark">
        <div className="section-head"><div><p className="section-kicker">MEMBERSHIP THAT MOVES WITH YOU</p><h2 className="section-title">Make room for <em>progress.</em></h2></div><Link className="text-link" href="/membership">Compare plans <ArrowRight size={15} /></Link></div>
        <div className="pricing-grid">{plans.map((plan) => <article className={"price-card" + (plan.featured ? " featured" : "")} key={plan.name}>{plan.featured && <span className="price-badge">MOST POPULAR</span>}<span className="price-name">{plan.name}</span><p className="price-amount">{plan.price}<small> / month</small></p><p className="muted-copy">{plan.description}</p><ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><Link className={plan.featured ? "button" : "button button-outline"} href="/membership">Choose {plan.name}</Link></article>)}</div>
      </section>

      <section className="cta-band"><h2>Ready to build a stronger you?</h2><Link className="button" href="/register">Start your journey <ArrowRight size={16} /></Link></section>
    </>
  );
}
