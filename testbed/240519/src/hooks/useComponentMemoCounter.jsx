import { useMemo } from "react";

export const useComponentMemoCounter = (onClick, count) => {
  return useMemo(() => {
    console.log("TEST :: useComponentMemoCounter");
    return (
      <button onClick={onClick}>component memoed counter is {count}</button>
    );
  }, [onClick, count]);
};
