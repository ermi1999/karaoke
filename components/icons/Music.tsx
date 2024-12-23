import * as React from "react";
import type { SVGProps } from "react";
const SvgMusic1 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      color="currentColor"
    >
      <circle cx={6.5} cy={18.5} r={3.5} />
      <circle cx={18} cy={16} r={3} />
      <path d="M10 18.5V7c0-.923 0-1.385.264-1.672.263-.287.754-.329 1.735-.413 4.023-.343 6.91-1.655 8.356-2.505.296-.174.444-.26.544-.203s.101.225.101.559V16" />
      <path d="M10 10c5.867 0 9.778-2.333 11-3" />
    </g>
  </svg>
);
export default SvgMusic1;
