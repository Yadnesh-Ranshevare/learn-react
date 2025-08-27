import React, { Suspense, lazy } from "react";

// Lazy load component
const Profile = lazy(() => import("./Profile"));

function SuspenseExample() {
  return (
    <div>
      <h1>Welcome!</h1>

      {/* Suspense shows fallback until Profile is loaded */}
      <Suspense fallback={<p>Loading profile...</p>}>
        <Profile />
      </Suspense>
    </div>
  );
}

export default SuspenseExample;
