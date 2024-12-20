import * as React from "react";
import type { SVGProps } from "react";
const SvgQueue = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18 18H6c-.943 0-1.414 0-1.707-.293S4 16.943 4 16s0-1.414.293-1.707S5.057 14 6 14h12c.943 0 1.414 0 1.707.293S20 15.057 20 16s0 1.414-.293 1.707S18.943 18 18 18M4 10h16M4 6h16"
      color="currentColor"
    />
  </svg>
);
export default SvgQueue;
