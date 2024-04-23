import React, { useState, useEffect } from "react";
import PropTyps from "prop-types";
const rateStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
RatingIcons.prototype = {
  initialRate: PropTyps.number,
  maxRating: PropTyps.number,
  color: PropTyps.string,
  size: PropTyps.number,
  onSetRating: PropTyps.func,
};
export default function RatingIcons({
  initialRate = 0,
  maxRating = 10,
  color = "#fcc419",
  size = 24,
  onSetRating,
}) {
  const [rate, setRate] = useState(initialRate);
  const [hover, setHover] = useState(initialRate);

  useEffect(() => {
    setRate(initialRate);
    setHover(initialRate);
  }, [initialRate]);

  function onIconHover(i) {
    setHover(i);
  }

  function onIconHoverEnd() {
    setHover(rate);
  }

  function onIconCLick(i) {
    setRate(i);
    onSetRating(i);
    setHover(i);
  }

  const rateShowingStyle = {
    lineHeight: "1",
    margin: "0px",
    fontSize: "16px",
    color: color,
  };

  return (
    <div className="rate" style={rateStyle}>
      <div className="rate-input" style={{ display: "flex" }}>
        {[...Array(maxRating).keys()].map((num, index) => (
          <Star
            // fill={num >= rate ? "none" : "#fcc419"}
            fill={num >= hover ? "none" : color}
            size={size}
            num={index + 1}
            key={index}
            handleIconHover={onIconHover}
            handleEndIconHover={onIconHoverEnd}
            handleIconClick={onIconCLick}
          />
        ))}
      </div>
      <p style={rateShowingStyle}>{hover || ""}</p>
    </div>
  );
}

function Star({
  fill,
  num,
  handleIconHover,
  handleEndIconHover,
  handleIconClick,
  size,
}) {
  const spanStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      style={spanStyle}
      onMouseEnter={() => handleIconHover(num)}
      onMouseLeave={() => handleEndIconHover()}
      onClick={() => handleIconClick(num)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        viewBox="0 0 20 20"
        stroke="#fcc419"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    </span>
  );
}
