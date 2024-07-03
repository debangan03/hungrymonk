import { Suspense } from "react";

import Pageloader from "./loaders/pageloader";
import FetchAllData from "./Menu/FetchAllData";
import Landing from "./LandingPage/Landing";

export default function Home() {
  return (
    <Suspense fallback={<Pageloader/>}>
      <Landing/>
      </Suspense>
  );
}
