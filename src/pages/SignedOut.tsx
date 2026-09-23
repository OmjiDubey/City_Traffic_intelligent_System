import React from "react";
import { Link } from "react-router-dom";
import { LogInIcon, TrafficConeIcon } from "lucide-react";

export function SignedOut() {
  return (
    <main className="flex min-h-full w-full items-center justify-center bg-canvas p-6">
      <div className="w-full max-w-sm rounded-lg border border-line bg-surface p-8 text-center shadow-card">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-navy text-white">
          <TrafficConeIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-xl font-bold text-navy">You have been signed out</h1>
        <p className="mt-1 text-sm text-muted">Your City Traffic Intelligence System session has ended on this workstation.</p>
        <Link to="/" className="mt-6 flex h-10 items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-white hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <LogInIcon className="h-4 w-4" /> Sign in again
        </Link>
      </div>
    </main>);

}