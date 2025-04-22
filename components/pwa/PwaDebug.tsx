"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function PwaDebug() {
  const [debug, setDebug] = useState({
    isInstallable: false,
    isStandalone: false,
    hasServiceWorker: false,
    manifestLoaded: false,
    platform: "",
    userAgent: "",
  });

  useEffect(() => {
    const checkPwaStatus = async () => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      const hasServiceWorker = "serviceWorker" in navigator;

      let manifestLoaded = false;
      try {
        const manifestLink = document.querySelector('link[rel="manifest"]');
        if (manifestLink) {
          const response = await fetch(manifestLink.getAttribute("href") || "");
          manifestLoaded = response.ok;
        }
      } catch (error) {
        console.error("Error checking manifest:", error);
      }

      setDebug({
        isInstallable: false, // Will be updated by beforeinstallprompt
        isStandalone,
        hasServiceWorker,
        manifestLoaded,
        platform: navigator.platform,
        userAgent: navigator.userAgent,
      });
    };

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDebug((prev) => ({ ...prev, isInstallable: true }));
    });

    checkPwaStatus();
  }, []);

  return (
    <Card className="p-4 mt-4">
      <h3 className="font-semibold mb-2">PWA Debug Info</h3>
      <div className="space-y-2 text-sm">
        <p>📱 Can Install: {debug.isInstallable ? "✅" : "❌"}</p>
        <p>🏃‍♂️ Running as PWA: {debug.isStandalone ? "✅" : "❌"}</p>
        <p>🔧 Service Worker: {debug.hasServiceWorker ? "✅" : "❌"}</p>
        <p>📄 Manifest: {debug.manifestLoaded ? "✅" : "❌"}</p>
        <p>💻 Platform: {debug.platform}</p>
        <p className="break-all">🌐 User Agent: {debug.userAgent}</p>
      </div>
    </Card>
  );
}
