import React from "react";

const StarIcon = ({
  offset = 0,          // 0 | 50 | 100
  size = 24,
  color = "#FFD700",       // filled color
  emptyColor = "#E0E0E0",  // <-- empty part should match this
  strokeColor = "#000",
  strokeWidth = 1.5,
  ...props
}) => {
  const polygonPoints =
    "12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9";

  const gradientId = `star-grad-${offset}-${color.replace("#", "")}`;

  // FIX: offset = 0 → use emptyColor
  // FIX: offset = 100 → use color
  // FIX: offset in between → use gradient
  const fill =
    offset === 0
      ? emptyColor
      : offset === 100
      ? color
      : `url(#${gradientId})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {(offset > 0 && offset < 100) && (
        <defs>
          <linearGradient 
            id={gradientId} 
            x1="0%" 
            y1="0%" 
            x2="100%" 
            y2="0%"
          >
            {/* left side = filled color */}
            <stop offset={`${offset}%`} stopColor={color} />

            {/* right side = empty color */}
            <stop offset={`${offset}%`} stopColor={emptyColor} />
          </linearGradient>
        </defs>
      )}

      <polygon fill={fill} points={polygonPoints} />
    </svg>
  );
};

export default StarIcon;
