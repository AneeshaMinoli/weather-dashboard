"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoBackground({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    videoRef.current?.load();
  }, [src]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img src={poster} alt="" className={`absolute inset-0 w-full h-full object-cover ${reduceMotion ? "z-[1]" : "z-0"}`} />
      {!reduceMotion && (
        <video ref={videoRef} autoPlay loop muted playsInline poster={poster} className="absolute inset-0 w-full h-full object-cover z-[1]">
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/15 via-black/5 to-black/55" />
    </div>
  );
}