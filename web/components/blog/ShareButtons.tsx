"use client";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  XIcon,
} from "react-share";

interface ShareButtonsProps {
  url: string;
  title: string;
}

import { ShareIcon } from "@heroicons/react/24/outline";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  return (
    <div className="relative group flex items-center">
      <div className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-primary transition-colors">
        <ShareIcon className="w-5 h-5" />
        <span className="text-sm font-medium">Share</span>
      </div>

      <div className="absolute left-full ml-2 flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto bg-white dark:bg-neutral-800 p-2 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700">
        <TwitterShareButton
          className="hover:scale-110 transition-transform"
          title={title}
          url={url}
        >
          <XIcon round size={32} />
        </TwitterShareButton>
        <LinkedinShareButton
          className="hover:scale-110 transition-transform"
          title={title}
          url={url}
        >
          <LinkedinIcon round size={32} />
        </LinkedinShareButton>
        <FacebookShareButton
          className="hover:scale-110 transition-transform"
          hashtag="#aligoo"
          url={url}
        >
          <FacebookIcon round size={32} />
        </FacebookShareButton>
      </div>
    </div>
  );
}
