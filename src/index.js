/* eslint-disable no-useless-constructor */
import React, { Fragment,useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Divider } from 'antd';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Game from './components/game';
import Clock from './components/clock';
import List from './components/list';
import Slot from './components/slot';
import Routerarea from './components/router';
import Context from './components/context';
import Refdom from './components/refs';
import Counter from './components/redux';
import HookArea from './components/hook';
import { Provider, connect } from 'react-redux';
// import thunk from 'redux-thunk'
moment(zhCN);



// combineReducers reducer
function handleIncrement(state = 0, action) {
    if (action.type === 'INCREMENT') {
        return state + 1;
    }
    return state;
}

// 中间件
function applyMiddleware1(middlewareAPI) {
    return function (dispatch) {
        return function (action) {
            console.log('dispatch 前：', middlewareAPI.getState());
            var returnValue = dispatch(action);
            console.log('dispatch 后：', middlewareAPI.getState(), '\n');
            return returnValue;
        };
    };
}

// 合并 combineReducers 的键值为 state 的 key , 默认值就是reducer的默认值
const reducer = combineReducers({
    count: handleIncrement
})

//createStore接受一个方法作为对象，返回store对象，用于生成store,每次dispatch 都会执行传入的方法，即reducer
const store = createStore(reducer, applyMiddleware(applyMiddleware1));
// const store = createStore(reducer,applyMiddleware(thunk));
// store.dispatch方法会触发 Reducer 的自动执行
store.dispatch({ type: "INCREMENT" });
console.log(store.getState());



class StoreJsx extends React.Component {
    constructor(props) {
        super(props);
        this.aa = 1;
    }

    render() {
        return (
            <div>
                <p onClick={this.props.INCREMENT}>count : {this.props.count}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}

const dispatchToProps = (dispatch, ownProps) => {
    return {
        INCREMENT() {
            let type = { type: "INCREMENT" };
            dispatch(type)
        }
    }
}
StoreJsx = connect(mapStateToProps, dispatchToProps)(StoreJsx);



/**
 *  函数式自定义组件 
 */
function Welcome(props) {
    return <h3>Hello, {props.data.name}</h3>;
}

function Nameslot(props) {
    return <p>这是一个具名slot</p>
}

class Test extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const name = 'czl';
        const userName = 'demo';
        const obj = {
            name: 'demo2'
        };  //jsx传数组
        function getGreeting(user) {
            if (user) {
                return <h3>Hello, {user}!</h3>;
            }
        }
        return (
            <Fragment>
                <h2>JSX</h2>
                {2 + 2}
                <p>hello,{name}</p>
                <p tabIndex="0" className="demo-class">111</p>
                {getGreeting(userName)}
                <Welcome data={obj} />
            </Fragment>
        )
    }
}




class Root extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Provider store={store}>
                <Game />
                <Context></Context>
                <Divider></Divider>
                <HookArea></HookArea>
                <Divider></Divider>
                <StoreJsx></StoreJsx>
                <Divider></Divider>
                <Test />
                <Clock />
                <Divider></Divider>
                <Routerarea></Routerarea>
                <Divider></Divider>
                <List />
                <Divider></Divider>
                <Slot classname='aaa' nameSlot={<Nameslot />}>
                    <p>这是一个slot</p>
                </Slot>
                <Counter />
                <Refdom></Refdom>
            </Provider>
        )
    }
}


ReactDOM.render(
    // new Root().render(),
    <Root />,
    document.getElementById('root')
);