import { useState } from "react";

export default function Box({ children, classname }) {
  const [showProp, setShowProp] = useState(true);
  return (
    <div className={`box ${classname}`}>
      <button className="btn" onClick={() => setShowProp((s) => !s)}>
        {`${showProp ? "–" : "+"}`}{" "}
      </button>
      {showProp && children}
    </div>
  );
}
