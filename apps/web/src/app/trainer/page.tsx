import Link from "next/link";

export const metadata = { title: "Trainer Area | Crea Maharatsrat Fitness" };

export default function TrainerPage() {
  return <section className="content-wrap dashboard-wrap"><p className="section-kicker">TRAINER AREA</p><h1 className="dashboard-heading">Your coaching workspace</h1><div className="surface-card"><p>Trainer accounts and profiles are modeled in the database. Trainer schedules, member assignments, and workout-plan tools can be added on this foundation.</p><Link className="button button-small" href="/schedule">View class schedule</Link></div></section>;
}
