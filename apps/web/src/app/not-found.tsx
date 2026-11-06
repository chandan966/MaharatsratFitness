import Link from "next/link";

export default function NotFound() {
  return <section className="content-wrap"><p className="section-kicker">404 · PAGE NOT FOUND</p><h1 className="dashboard-heading">This page is off the map.</h1><Link className="button" href="/">Back to home</Link></section>;
}
