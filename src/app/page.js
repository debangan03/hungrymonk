import { Suspense } from "react";

import LoadingPage from "./loaders/LoadingPage";
import FetchAllData from "./Menu/FetchAllData";
import Landing from "./LandingPage/Landing";

export default function Home() {
  return (
    <Suspense fallback={<LoadingPage/>}>
      <Landing/>
      </Suspense>
  );
}
