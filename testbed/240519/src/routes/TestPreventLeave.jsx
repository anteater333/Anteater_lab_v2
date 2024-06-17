import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// With ///////////////////////////////////////////////////

/** useCallback을 사용하는 preventLeave 기능 */
function usePreventLeaveWithUseCallback() {
  /** 페이지 전환 전 사용자에게 확인을 요청하도록 만드는 handler 함수 */
  const handler = useCallback((e) => {
    e.preventDefault();
    e.returnValue = true;
  }, []);

  const enablePrevent = useCallback(
    () => window.addEventListener("beforeunload", handler),
    []
  );

  const disablePrevent = useCallback(
    () => window.removeEventListener("beforeunload", handler),
    []
  );

  /** DEBUG */
  useEffect(() => {
    console.log("with useCallback handler reassigned");
  }, [handler]);
  useEffect(() => {
    console.log("with useCallback enablePrevent reassigned");
  }, [enablePrevent]);
  useEffect(() => {
    console.log("with useCallback disablePrevent reassigned");
  }, [disablePrevent]);

  return { enablePrevent, disablePrevent };
}

export function PagePreventedLeaveWithUseCallback() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let id;
    if (isRunning) id = setInterval(() => setCount((prev) => prev + 1), 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const { enablePrevent, disablePrevent } = usePreventLeaveWithUseCallback();

  useEffect(() => {
    if (isRunning) enablePrevent();
    else disablePrevent();
  }, [isRunning]);

  return (
    <div>
      <h1>WithUseCallback</h1>
      <div>
        <Link to={isRunning ? "#" : "/withoutUseCallBack"}>
          <button>to without</button>
        </Link>
        <br />
        <div>{count}</div>
        <br />
        <button onClick={() => setIsRunning((prev) => !prev)}>
          {isRunning ? "Running (preventLeave On)" : "Ready (preventLeave Off)"}
        </button>
      </div>
    </div>
  );
}

// Without ////////////////////////////////////////////////

function usePreventLeaveWithoutUseCallback() {
  /** 페이지 전환 전 사용자에게 확인을 요청하도록 만드는 handler 함수 */
  const handler = (e) => {
    e.preventDefault();
    e.returnValue = true;
  };

  const enablePrevent = () => window.addEventListener("beforeunload", handler);

  const disablePrevent = () =>
    window.removeEventListener("beforeunload", handler);

  /** DEBUG */
  useEffect(() => {
    console.log("with useCallback handler reassigned");
  }, [handler]);
  useEffect(() => {
    console.log("with useCallback enablePrevent reassigned");
  }, [enablePrevent]);
  useEffect(() => {
    console.log("with useCallback disablePrevent reassigned");
  }, [disablePrevent]);

  return { enablePrevent, disablePrevent };
}

export function PagePreventedLeaveWithoutUseCallback() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let id;
    if (isRunning) id = setInterval(() => setCount((prev) => prev + 1), 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const { enablePrevent, disablePrevent } = usePreventLeaveWithoutUseCallback();

  useEffect(() => {
    if (isRunning) enablePrevent();
    else disablePrevent();
  }, [isRunning]);

  return (
    <div>
      <h1>WithoutUseCallback</h1>
      <div>
        <Link to={isRunning ? "#" : "/withUseCallBack"}>
          <button>to with</button>
        </Link>
        <br />
        <div>{count}</div>
        <br />
        <button onClick={() => setIsRunning((prev) => !prev)}>
          {isRunning ? "Running (preventLeave On)" : "Ready (preventLeave Off)"}
        </button>
      </div>
    </div>
  );
}
