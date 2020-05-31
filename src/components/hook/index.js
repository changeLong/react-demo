/**
 * hook
 */
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";

let initState = {
  user: {
    name: "czl",
    tel: 15219277736,
  },
};
let context = createContext(initState);

function reducer(state, action) {
  switch (action.type) {
    case "changeTel":
      return { user: { ...state.user, tel: "15219277735" } };
    case "changeName":
      return { user: { ...state.user, name: "张三" } };
    default:
      return state;
  }
}

// function User() {
//   const state = useContext(context);
//   console.log(state);
//   return (
//     <>
//       <p>username : {state.user.name}</p>
//     </>
//   );
// }

// useContext 类似hook的 contextType ，需要指明才可以用，并且值为creactContext对象
function UserInfo() {
  const [state, dispatch] = useContext(context);
  return (
    <>
      <p>user tel: {state.user.tel}</p>
      <button
        onClick={() => {
          dispatch({ type: "changeTel" });
        }}
      >
        点击改变手机号
      </button>
      <button
        onClick={() => {
          dispatch({ type: "changeName" });
        }}
      >
        点击改变名称
      </button>
    </>
  );
}

// 数据共享
function UserInfo2() {
  const [state, dispatch] = useContext(context);

  // useEffect 可传递第二个参数，当数组里面的值发生改变时，才触发useEffect，避免无相关的中心化数据更新导致意外的更新
  useEffect(() => {
    console.log("改变特定值才触发");
  }, [state.user.name, state.user.tel]);

  return (
    <>
      <h3>共享数据</h3>
      <p>name: {state.user.name}</p>
      <p>tel: {state.user.tel}</p>
    </>
  );
}

// 公共的hook，类似 mixin, 每个组件使用后都独立维护自己的数据
function useCommonCount(count) {
  //useState 返回当前 state 以及更新 state 的函数，这与 class 里面 this.state.count 和 this.setState 类似，唯一区别就是你需要成对的获取它们
  const [commonCount, setCount] = useState(count);

  useEffect(() => {
    // console.log('公有state更新');
  });
  // return [commonCount,setCount];
  return [commonCount, setCount];
}

function Comp1(props) {
  // useCommonCount 返回的内容由公共hook决定；
  let [count, setCount] = useCommonCount(0);

  // 多个effect 会同时出发
  useEffect(() => {
    // console.log("ui更新触发useEffect");
  });
  useEffect(() => {
    // console.log("触发多个effect");
  });
  return (
    <>
      <h1>useState</h1>
      <p
        onClick={() => {
          setCount(count + 1);
        }}
      >
        count : {count};click me add
      </p>
      {/* <p >count : {count};click me add</p> */}
    </>
  );
}

function HookArea() {
  let [state, dispatch] = useReducer(reducer, initState);
  // 把state,dispatch 作为 Provider value 传递，那么所有的组件都可以使用到，并且共享
  return (
    <context.Provider value={[state, dispatch]}>
      <Comp1></Comp1>
      {/* <User></User> */}
      <UserInfo></UserInfo>
      <UserInfo2></UserInfo2>
    </context.Provider>
  );
}

export default HookArea;
