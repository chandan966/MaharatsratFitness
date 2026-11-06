"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["About", "/about"],
  ["Programs", "/classes"],
  ["Trainers", "/trainers"],
  ["Membership", "/membership"],
  ["Schedule", "/schedule"],
  ["Contact", "/contact"]
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label="Crea Maharatsrat Fitness home">
        <span className="brand-mark">C</span>
        <span className="brand-name">CREA MAHARATSRAT<small>FITNESS</small></span>
      </Link>
      <nav className={"nav-links" + (open ? " open" : "")} aria-label="Main navigation">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
      <div className="nav-actions"><Link href="/login">Log in</Link><Link className="button button-small" href="/register">Join now <span aria-hidden="true">→</span></Link></div>
      <button className="mobile-toggle" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
    </header>
  );
}
