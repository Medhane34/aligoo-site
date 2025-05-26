/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import React, { useState, useRef } from 'react';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';

const MeaniningSection = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, setIsPronunciationHovered] = useState(false);
  const pronunciationAudioPath = "/aligoo-pro.mp4";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="relative py-24 bg-background-light dark:bg-background-dark p-12">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[length:200%_200%]" />
      <div className="container mx-auto text-center">
        <div
          className="relative inline-block cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Play pronunciation audio"
          onClick={() => {
            setIsPronunciationHovered(true);
            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsPronunciationHovered(true);
              if (audioRef.current) {
                audioRef.current.play().catch(() => {});
              }
            }
          }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-text-light dark:text-text-dark mb-2">
            Aligoo <span className="text-sm font-normal text-text-light dark:text-text-dark">/ˈæ.lɪ.guː/</span> (verb): To Create With <span className="text-pink-500">Soul</span>.
          </h2>
          <div className="flex items-center justify-center space-x-1 text-text-light dark:text-text-dark">
            <SpeakerWaveIcon className="h-4 w-4" />
            <span className="underline">[ah-lee-goo]</span>
          </div>
          <audio ref={audioRef} src={pronunciationAudioPath}>
            <track kind="captions" srcLang="en" label="English captions" />
          </audio>
        </div>

        <div className="mt-8 text-lg md:text-xl text-text-light dark:text-text-dark leading-relaxed">
          <p><strong>Aligoo</strong> is a word we made up.</p>
          <p>It means <em className="text-pink-600 font-semibold">to put a soul in your craft, and to deliver beyond expectation.</em></p>
          <p className="mt-4">It’s how we design, write, plan, launch, and show up for our clients.</p>
          <p>With intention. With pride. And always with a little extra.</p>
          <p className="mt-6">You don’t just get a service.</p>
          <p>You get the <strong className="text-pink-600 font-semibold">Aligoo touch</strong>.</p>
        </div>

        <p className="mt-12 text-sm text-gray-500 italic">A word born in Addis. A mindset made for the world.</p>
      </div>
    </div>
  );
};

export default MeaniningSection;