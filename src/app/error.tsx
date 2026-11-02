"use client";

import { Container, buttonClass } from "@/components/ui";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <Container className="py-24 lg:py-36">
      <h1 className="text-4xl sm:text-5xl">Something went wrong</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        This page could not be displayed. Please try again. Nothing you entered has been sent.
      </p>
      <button type="button" onClick={reset} className={`${buttonClass()} mt-8`}>
        Try again
      </button>
    </Container>
  );
}
