import { ContactForm } from "@/components/contact-form";

export const metadata = { title: "Contact | Crea Maharatsrat Fitness" };

export default function ContactPage() {
  return (
    <>
      <section className="page-hero"><p className="section-kicker">GET IN TOUCH</p><h1>Let’s talk about<br /><em>your goals.</em></h1><p>Ask about memberships, classes, personal training, or arranging a visit to the club.</p></section>
      <section className="content-wrap">
        <div className="contact-layout">
          <div><p className="section-kicker">CONTACT THE TEAM</p><h2 className="section-title">We’re here to help.</h2><p className="section-intro">Send a note and the club team can follow up. Your message is saved securely in the platform database.</p><div className="contact-detail"><strong>Membership questions</strong><span>Ask us about plans and getting started.</span></div><div className="contact-detail"><strong>Class and coaching</strong><span>Tell us what you want to work toward.</span></div></div>
          <div className="surface-card"><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
