import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand"><Link className="brand" href="/"><span className="brand-mark">C</span><span className="brand-name">CREA MAHARATSRAT<small>FITNESS</small></span></Link><p>Build Strength. Build Discipline. Build Yourself. Train with expert coaches and a community that keeps you moving forward.</p></div>
        <div className="footer-links"><h4>Explore</h4><Link href="/about">About us</Link><Link href="/classes">Programs</Link><Link href="/trainers">Trainers</Link><Link href="/schedule">Schedule</Link></div>
        <div className="footer-links"><h4>Get started</h4><Link href="/membership">Membership</Link><Link href="/register">Join the club</Link><Link href="/login">Member login</Link><Link href="/contact">Contact</Link></div>
        <div className="footer-links"><h4>Visit</h4><p className="form-note">Contact the club for location, opening hours, and a guided tour.</p><Link href="/contact">Send us a message →</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Crea Maharatsrat Fitness</span><span>Build Strength. Build Discipline. Build Yourself.</span></div>
    </footer>
  );
}
