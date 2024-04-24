import { useState, useEffect } from "react";

export function useLocalStorageState(inintilaState, key) {
  const [value, setValue] = useState(function () {
    const movies = localStorage.getItem(key);
    return movies ? JSON.parse(movies) : inintilaState;
  });

  useEffect(
    function () {
      localStorage.setItem("watched Movies", JSON.stringify(value));
    },
    [value]
  );

  return [value, setValue];
}
