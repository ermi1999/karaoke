import * as React from "react";
import type { SVGProps } from "react";
const SvgVolumeMute = (props: SVGProps<SVGSVGElement>) => (
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
      d="M14 14.814V9.186c0-3.145 0-4.717-.925-5.109-.926-.391-2.015.72-4.193 2.945-1.128 1.152-1.771 1.407-3.376 1.407-1.403 0-2.105 0-2.61.344C1.85 9.487 2.01 10.882 2.01 12s-.159 2.513.888 3.227c.504.344 1.206.344 2.609.344 1.605 0 2.248.255 3.376 1.407 2.178 2.224 3.267 3.336 4.193 2.945.925-.392.925-1.964.925-5.11M18 10l4 4m-4 0 4-4"
      color="currentColor"
    />
  </svg>
);
export default SvgVolumeMute;
