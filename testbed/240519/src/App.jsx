import { useState, memo, useMemo, useCallback, useEffect } from "react";
import "./App.css";
import { useComponentMemoCounter } from "./hooks/useComponentMemoCounter";

const MemoedCounter = memo(function MemoedComponent({ count, onClick }) {
  console.log("TEST :: memoed");
  return <button onClick={onClick}>memoed count is {count}</button>;
});

function App() {
  console.log("TEST :: ROOT");
  const [count, setCount] = useState(0);
  const [isGood, setIsGood] = useState(false);

  const onCountHandler = useCallback(() => setCount((count) => count + 1), []);

  const UseMemoedCount = useMemo(() => {
    console.log("TEST :: useMemoed");
    return ({ count, onClick }) => {
      console.log("TEST :: useMemoed inner");

      return <button onClick={onClick}>useMemoed count is {count}</button>;
    };
  }, []);

  const UseMemoedCountAlt = useMemo(() => {
    console.log("TEST :: useMemoed alt");
    return () => {
      console.log("TEST :: useMemoed alt inner");

      return (
        <button onClick={onCountHandler}>useMemoed Alt count is {count}</button>
      );
    };
  }, [count]);

  const UseCallbackMemoedCount = useCallback(({ count, onClick }) => {
    console.log("TEST :: useCallbackMemoed");
    return (
      <button onClick={onClick}>useCallbackMemoed count is {count}</button>
    );
  }, []);

  const UseCallbackMemoedAltCount = useCallback(() => {
    console.log("TEST :: useCallbackMemoed alt");
    return (
      <button onClick={onCountHandler}>
        useCallbackMemoed Alt count is {count}
      </button>
    );
  }, [count]);

  const ComponentMemoCount = useComponentMemoCounter(onCountHandler, count);

  // React.memo와 그나마 비슷한 효과를 내는 방법.
  // props 전달이 불가능
  const UseUltimateMemoedCount = useMemo(() => {
    console.log("TEST :: useUltimateMemoedCount");
    return (
      <button onClick={onCountHandler}>
        useUltimateMemeod count is {count}
      </button>
    );
  }, [onCountHandler, count]);

  useEffect(() => {
    console.log("TEST :: useEffect");
  }, []);

  return (
    <>
      <h1>About Memo</h1>
      <div className="card">
        <button onClick={() => setIsGood((isGood) => !isGood)}>
          {isGood ? "Good" : "Bad"}
        </button>
        <p />
        <MemoedCounter onClick={onCountHandler} count={count} />
        <UseMemoedCount onClick={onCountHandler} count={count} />
        <UseMemoedCountAlt />
        <UseCallbackMemoedCount onClick={onCountHandler} count={count} />
        <UseCallbackMemoedAltCount />
        {UseUltimateMemoedCount}
        {ComponentMemoCount}
      </div>
    </>
  );
}

export default App;
