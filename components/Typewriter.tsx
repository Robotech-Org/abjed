"use client";

import { useState, useEffect } from "react";

export default function Typewriter({ text, speed = 60 }: { text: string, speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <>
      {displayedText}
      <span className="animate-pulse border-r-4 border-[#2B4238] ml-1 inline-block h-[0.8em] align-middle -mt-2"></span>
    </>
  );
}
