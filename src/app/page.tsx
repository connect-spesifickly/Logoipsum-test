import * as React from "react";
import Home from "./home-page";
import { Suspense } from "react";

export default function Homepage() {
  return (
    <div>
      <Suspense fallback={<div>Loading pencarian...</div>}>
        <Home />
      </Suspense>
    </div>
  );
}
