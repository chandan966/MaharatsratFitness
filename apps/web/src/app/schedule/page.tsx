import { getApiData, formatDate } from "@/lib/api";
import { BookButton } from "@/components/book-button";

type Schedule = {
  id: string;
  startsAt: string;
  endsAt: string;
  spotsRemaining: number;
  name: string;
  level: string;
  program: string;
  trainer: string;
};

export const metadata = { title: "Class Schedule | Crea Maharatsrat Fitness" };

export default async function SchedulePage() {
  const schedules = await getApiData<Schedule[]>("/schedules");
  return (
    <>
      <section className="page-hero"><p className="section-kicker">YOUR NEXT SESSION</p><h1>Make time for<br /><em>yourself.</em></h1><p>Choose a class, find a time that works, and book your place with the club.</p></section>
      <section className="content-wrap">
        {!schedules?.length ? <div className="empty-state">Class times will appear here after the API and database are running and the seed data is loaded.<br />See the setup instructions in the project README.</div> : <div className="schedule-list">{schedules.map((item) => <article className="schedule-row" key={item.id}><div><strong>{formatDate(item.startsAt)}</strong><small>{item.program}</small></div><div><strong>{item.name}</strong><small>{item.level} · {item.trainer}</small></div><div><strong>{item.spotsRemaining} spots left</strong><small>60 minute session</small></div><BookButton scheduleId={item.id} disabled={item.spotsRemaining < 1} /></article>)}</div>}
      </section>
    </>
  );
}
