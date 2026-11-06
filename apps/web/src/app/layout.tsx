import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Crea Maharatsrat Fitness | Build Yourself",
  description: "Build strength, discipline, and confidence with expert coaches and a community built around your goals.",
  openGraph: {
    title: "Crea Maharatsrat Fitness",
    description: "Build Strength. Build Discipline. Build Yourself.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><SiteNav /><main>{children}</main><SiteFooter /></body></html>;
}
