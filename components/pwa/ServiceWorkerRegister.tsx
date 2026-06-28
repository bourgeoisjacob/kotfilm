"use client";

import { useEffect } from "react";

// Registers the service worker once the app has loaded. Renders nothing.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    // This effect runs after hydration, when the document is already loaded, so
    // register directly — waiting on window's "load" event would miss it (it has
    // usually fired by now) and the worker would never register.
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* registration is best-effort; the site works without it */
    });
  }, []);

  return null;
}
