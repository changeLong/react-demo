

## combineReducers

返回新的state的函数，用来调用一系列自己写的reducer，根据key来调用对应的reducer

只是将reducer变的简单点：

```js
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}
```

等价于

```js
import { combineReducers } from 'redux'

const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})
```





## 创建一个stores

Redux 有一个很方便的函数用来创建 stores，叫做 `createStore`。

并且该方法提供一个函数作为参数，否则会报错。这个参数称为`reducer`。

```js
import { createStore } from 'redux';

//const store = createStore(); //Error: Expected the reducer to be a function.

function reducer(){
    
}

const store = createStore(reducer)

const App = () => (
  <div>
    <Counter/>
  </div>
);
```

## reducer

根据action更新store

其实就是个函数嘛，非要说的那么高端

接收state,action,返回新的state

强调纯函数

不要修改原来的state

> reducer 决不能返回undefined



###  给reducer一个初始状态

就像`Array.reduce` 函数一样,给步进器一个初始的`initialState` 值

```js
const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  console.log('reducer', state, action);
  return state;
}
```



## action

在 Redux 中，具有 `type` 属性的普通对象就被称为 action.

主要的作用是用于dispatch时的对象；

```
{
  type: "add an item",
  item: "Apple"
}
```

## dispatch

 store 有一个内置函数 `dispatch`。调用的时候携带 action，Redux 调用 reducer 时就会携带 action

```
const store = createStore(reducer);
store.dispatch({ type: "INCREMENT" });
//reducer 函数中打印 reducer {count: 1} {type: "INCREMENT"}
```

**通过触发dispatch传入对应的action，reducer根据action的type值来进行对应的操作，并且返回新的state**

```
function reducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch (action.type) {
        case 'INCREMENT':
            return Object.assign({},state,{count : 2});
        default:
            return state;
    }
}
```



# react 中使用redux

## provider

通过这个组件包装整个应用，使每个组件都可以访问`redux`。

`store`会以prop形式传递。

```
import { Provider } from 'react-redux';

const store = ....;

const App = () => (
  <Provider store={store}>
    <Counter/>
  </Provider>
);
```

