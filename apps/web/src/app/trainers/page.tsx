import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trainers } from "@/lib/content";

export const metadata = { title: "Trainers | Crea Maharatsrat Fitness" };

export default function TrainersPage() {
  return (
    <>
      <section className="page-hero"><p className="section-kicker">EXPERT COACHING</p><h1>Meet the people<br />in your <em>corner.</em></h1><p>Knowledgeable coaches make training safer, clearer, and more motivating.</p></section>
      <section className="section"><div className="trainer-grid">{trainers.map((trainer) => <article className="trainer-card" key={trainer.name}><div className="trainer-photo" style={{ backgroundImage: "url(" + trainer.image + ")" }} /><div className="trainer-info"><p>{trainer.title}</p><h3>{trainer.name}</h3><div className="trainer-meta"><span>{trainer.specialty}</span><span>★ {trainer.rating}</span></div><div className="trainer-meta"><span>{trainer.experience} experience</span><span>Personal coaching</span></div></div></article>)}</div></section>
      <section className="cta-band"><h2>Find the right coach for your goals.</h2><Link className="button" href="/contact">Meet the team <ArrowRight size={16} /></Link></section>
    </>
  );
}
