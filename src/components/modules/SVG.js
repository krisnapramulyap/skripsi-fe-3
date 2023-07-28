export const BarsSVG = (props) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 25 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.59863 8.33333H13.5001M1.59863 1H23.5986M1.59863 15.6667H23.5986"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CloseSVG = (props) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M132 5109 c-68 -20 -132 -111 -132 -189 0 -87 -43 -41 1148 -1232
            l1127 -1128 -1127 -1128 c-1037 -1037 -1127 -1131 -1138 -1172 -42 -159 91
            -292 250 -250 41 11 135 101 1173 1138 l1127 1127 1128 -1127 c1037 -1037
            1131 -1127 1172 -1138 159 -42 292 91 250 250 -11 41 -101 135 -1138 1172
            l-1127 1128 1127 1128 c1037 1037 1127 1131 1138 1172 42 159 -91 292 -250
            250 -41 -11 -135 -101 -1172 -1138 l-1128 -1127 -1127 1127 c-978 976 -1133
            1128 -1168 1137 -47 13 -88 13 -133 0z"
        />
      </g>
    </svg>
  );
};
