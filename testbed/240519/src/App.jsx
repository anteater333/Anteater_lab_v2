import { useState, memo, useMemo, useCallback, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";

/*
  권장. React.memo 사용.
  React 코어에 의해 다른 로직으로 관리되는 컴포넌트 (REACT_MEMO_TYPE)
  App이 재렌더링 되어도 count, onClick이 변경되지 않으면 이 컴포넌트는 재렌더링되지 않음.
*/
const MemoedCounter = memo(function Counter({ count, onClick }) {
  console.log("TEST :: (A) rendered <MemoedCounter />");
  return (
    <button onClick={onClick}>
      (A) {`<MemoedCounter />`} {count}
    </button>
  );
});

/*
  아래 useMemo로 렌더링 함수가 아니라 JSX 자체를 반환하는 방법을 Custom Hook으로 만든 것
  해당 방법에서 props 전달을 가능하도록 하는 법
  여기까지 오면 너무 먼길을 온게 아닌가...
*/
const usePreRenderedCustomHookCounter = (onClick, count) => {
  return useMemo(() => {
    console.log(
      "TEST :: (E) rendered and memoed <PreRenderedCustomHookCounter />"
    );
    return (
      <button onClick={onClick}>
        (E) {`<PreRenderedCustomHookCounter />`} {count}
      </button>
    );
  }, [onClick, count]);
};

/** 메모되지 않는 컴포넌트 */
const PlainCounter = ({ count, onClick }) => {
  console.log("TEST :: (F) rendered <PlainCounter />");
  return (
    <button onClick={onClick}>
      (F) {`<PlainCounter />`} {count}
    </button>
  );
};

function App() {
  console.log("TEST :: (0) rendered <App />");

  const [count, setCount] = useState(0);
  const [isGood, setIsGood] = useState(false);
  const [isOK, setIsOK] = useState(false);

  const onCountHandler = useCallback(() => {
    console.log("TEST :: counter triggered !!");
    setCount((count) => count + 1), [];
  }, []);

  const onGoodToggleHandler = useCallback(() => {
    console.log("TEST :: isGood toggled !!");
    setIsGood((isGood) => !isGood);
  }, []);

  const onOKToggleHandler = useCallback(() => {
    console.log("TEST :: isOK toggled !!");
    setIsOK((isOK) => !isOK);
  }, []);

  /**
    useMemo로 컴포넌트 메모를 시도
    => 렌더 함수를 메모한 것이기 때문에 App이 다시 렌더링 될때마다 이 컴포넌트도 재렌더링됨
   */
  const UseMemoedCounter = useMemo(() => {
    console.log("TEST :: (B) memoed () => <UseMemoedCounter />");
    return ({ count, onClick }) => {
      console.log("TEST :: (B) rendered <UseMemoedCounter />");

      return (
        <button onClick={onClick}>
          (B) {`<UseMemoedCounter />`} {count}
        </button>
      );
    };
  }, []);

  /**
    useMemo로 컴포넌트 메모를 시도 2
    props 대신 의존성 배열을 사용
    => 역시 App이 다시 렌더링 될때마다 이 컴포넌트도 재렌더링됨
    => 심지어 deps가 변경될때마다 렌더링 함수 자체도 다시 메모됨
   */
  const UseMemoedCounterByDeps = useMemo(() => {
    console.log("TEST :: (C) memoed () => <UseMemoedCounterByDeps />");
    return () => {
      console.log("TEST :: (C) rendered <UseMemoedCounterByDeps />");

      return (
        <button onClick={onCountHandler}>
          (C) {`<UseMemoedCounterByDeps />`} {count}
        </button>
      );
    };
  }, [onCountHandler, count]);

  /*
    React.memo와 그나마 비슷한 효과를 내는 방법.
    렌더링 함수를 반환하는것이 아니라 useMemo에서 바로 JSX Element를 렌더링
    의존성 배열이 바뀔 때 마다 재렌더링 & 메모
    App이 재렌더링 되어도 재렌더링 되지 않음
    아래에 전달된 것이 렌더링 함수가 아니라 JSX Element 그 자체이기 때문에
    하지만 이렇게는 props 전달이 불가능
    React Dev Tools에 파악되지도 않음
  */
  const PreRenderedMemoedCounter = useMemo(() => {
    console.log("TEST :: (D) rendered and memoed <PreRenderedMemoedCounter />");
    return (
      <button onClick={onCountHandler}>
        (D) {`<PreRenderedMemoedCounter />`} {count}
      </button>
    );
  }, [onCountHandler, count]);

  /** 위 방식을 커스텀 hook 형태로 분리해서 사용 */
  const PreRenderedCustomHookCounter = usePreRenderedCustomHookCounter(
    onCountHandler,
    count
  );

  // 로그 구분용
  useEffect(() => {
    console.log("TEST :: =============================");
  }, [count, isGood, isOK]);

  return (
    <>
      <h1>About Memo</h1>
      <div className="card">
        <button onClick={onGoodToggleHandler}>{isGood ? "Good" : "Bad"}</button>
        <p />
        {isGood ? (
          <>
            <MemoedCounter onClick={onCountHandler} count={count} />
            <UseMemoedCounter onClick={onCountHandler} count={count} />
            <UseMemoedCounterByDeps />
            {PreRenderedMemoedCounter}
            {PreRenderedCustomHookCounter}
            <PlainCounter onClick={onCountHandler} count={count} />
          </>
        ) : undefined}
        <p />
        <button onClick={onOKToggleHandler}>{isOK ? "OK" : "NOT OK"}</button>
        <p />
        <div>
          <Link to={"/withUseCallback"}>
            <button>with</button>
          </Link>
          <Link to={"/withoutUseCallBack"}>
            <button>without</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
