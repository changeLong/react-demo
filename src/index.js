/* eslint-disable no-useless-constructor */
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Divider } from 'antd';
import { createStore } from 'redux';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Game from './components/game';
import Clock from './components/clock';
import List from './components/list';
import Slot from './components/slot';
import Refdom from './components/refs';
import Counter from './components/redux';
import { Provider } from 'react-redux';
moment(zhCN);

const initialState = {
    count: 1
}

//reducer
function reducer(state = initialState, action) {
    console.log('reducer', state, action);
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        default:
            return state;
    }
}  

//redux
const store = createStore(reducer);
store.dispatch({ type: "INCREMENT" });
//或者
//const store = createStore(reducer,initialState);


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
                <Divider></Divider>
                <Test />
                <Clock />
                <Divider></Divider>
                <List />
                <Divider></Divider>
                <Slot classname='aaa' nameSlot={<Nameslot />}>
                    <p>这是一个slot</p>
                </Slot>
                <Counter/>
                <Refdom></Refdom>
            </Provider>
        )
    }
}
// ========================================

// ReactDOM.render(
//     <Game />,
//     document.getElementById('root')
// );

ReactDOM.render(
    // new Root().render(),
    <Root />,
    document.getElementById('root')
);