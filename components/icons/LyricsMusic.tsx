import * as React from "react";
import type { SVGProps } from "react";
const SvgLyricsMusic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.5 3v14m0 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0m0-14a7 7 0 0 1 7 7c-1.5-1.5-5.444-3.733-7-1.556"
      color="currentColor"
    />
  </svg>
);
export default SvgLyricsMusic;
