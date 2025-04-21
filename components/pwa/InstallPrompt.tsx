"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowInstallButton(false);
    }
    setDeferredPrompt(null);
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg border flex items-center justify-between z-50">
      <div>
        <h3 className="font-semibold">Install My Weekly Meals</h3>
        <p className="text-sm text-gray-600">
          Add to your home screen for quick access
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={handleInstallClick}>Install</Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowInstallButton(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
