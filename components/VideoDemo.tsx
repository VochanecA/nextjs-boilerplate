"use client";

import { useTheme } from "next-themes";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function VideoDemo() {
  const { theme } = useTheme();
  
  return (
    <div className="mx-auto max-w-4xl rounded-xl overflow-hidden shadow-lg">
      <div className={theme === 'dark' ? 'dark:bg-black dark:bg-opacity-20' : ''}>
        <LiteYouTubeEmbed
          id="dQw4w9WgXcQ" // Replace with your actual YouTube video ID
          title="Next.js Boilerplate Demo"
          poster="maxresdefault"
          webp={true}
          wrapperClass="yt-lite rounded-lg"
          playerClass={`lty-playbtn ${theme === 'dark' ? 'bg-indigo-700' : 'bg-indigo-600'}`}
          iframeClass="rounded-lg"
          noCookie={true}
        />
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Watch our 2-minute demo to see the boilerplate in action
      </div>
    </div>
  );
}