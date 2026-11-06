import Link from "next/link";
import { Check } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <section className="page-hero"><p className="section-kicker">OUR STORY</p><h1>Built on effort.<br />Powered by <em>community.</em></h1><p>We make good coaching, purposeful training, and a supportive club part of everyday life.</p></section>
      <section className="section"><div className="split"><div><p className="section-kicker">A BETTER WAY TO TRAIN</p><h2 className="section-title">Start where you are.<br /><em>Grow from there.</em></h2><p className="section-intro">Crea Maharatsrat Fitness is a place to build healthy routines and lasting confidence. Our coaches work with you on clear goals, good movement, and steady progress.</p><ul className="check-list"><li><Check size={17} />A plan that adapts to your goals</li><li><Check size={17} />Coaches who make time for your questions</li><li><Check size={17} />A welcoming community at every fitness level</li></ul><Link className="button" href="/classes">Explore our programs</Link></div><div className="about-image" role="img" aria-label="Training at Crea Maharatsrat Fitness" /></div></section>
      <section className="cta-band"><h2>Come see what you can build.</h2><Link className="button" href="/contact">Talk to our team →</Link></section>
    </>
  );
}
