"use client"; // Error components must be Client Components

import ErrorComponent from "@/components/ErrorComponent";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorComponent>
      <button
        className="btn btn-blue font-normal"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </ErrorComponent>
  );
}
