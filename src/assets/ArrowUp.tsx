import React from "react";

export default function ArrowUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="17"
      viewBox="0 0 10 17"
      fill="none"
      {...props}
    >
      <path
        d="M4.75 15.75L4.75 0.75M4.75 0.75L0.75 4.75M4.75 0.75L8.75 4.75"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
