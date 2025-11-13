import React from "react";

export default function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="2"
      viewBox="0 0 20 2"
      fill="none"
      {...props}
    >
      <path
        d="M0.75 0.75H18.75"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
