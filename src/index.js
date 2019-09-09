/* eslint-disable no-useless-constructor */
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Divider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import Game from './components/game';

moment(zhCN);

/**
 *  函数式自定义组件 
 */
function Welcome(props){
    console.log(arguments);
    return <h1>Hello, {props.data.name}</h1>;
 }

class Test extends React.Component {
    constructor(props){
        super(props)
    }
   
    render(){
        const name = 'czl';
        const userName = 'demo';
        const obj = {
            name : 'deme2'
        };  //jsx传数组
        function getGreeting(user) {
            if (user) {
              return <h1>Hello, {user}!</h1>;
            }
          }
        return (
            <Fragment>
                { 2 + 2 }
                <p>hello,{name}</p>
                <p tabIndex="0" className="demo-class">111</p>
                {getGreeting(userName)}
                <Welcome data={obj}/>
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
            <Fragment>
                <Game />
                <Test />
                <Divider>这是一条占位符</Divider>
            </Fragment>
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
    <Root/>,
    document.getElementById('root')
);