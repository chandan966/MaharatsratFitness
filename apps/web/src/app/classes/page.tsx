import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs } from "@/lib/content";

export const metadata = { title: "Classes & Programs | Crea Maharatsrat Fitness" };

export default function ClassesPage() {
  return (
    <>
      <section className="page-hero"><p className="section-kicker">TRAIN YOUR WAY</p><h1>Find a program<br />that moves <em>you.</em></h1><p>Explore strength, conditioning, mobility, and group training with experienced coaches.</p></section>
      <section className="section"><div className="program-grid program-grid-wide">{programs.map((program) => <Link className="program-card" href="/schedule" key={program.slug} style={{ backgroundImage: "linear-gradient(0deg, #080808 0%, rgba(8,8,8,.58) 48%, rgba(8,8,8,.12) 100%), url(" + program.image + ")" }}><span>{program.category}</span><h3>{program.name}</h3><p>{program.description}</p><span className="program-link">View schedule <ArrowRight size={14} /></span></Link>)}</div></section>
      <section className="cta-band"><h2>Want a coach to help you get started?</h2><Link className="button" href="/contact">Talk to a trainer →</Link></section>
    </>
  );
}
