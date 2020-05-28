/**
 * context 
 * 简化了组件树中的数据传递
 * 类似vue中的 provide | inject
 */

import React, { createContext } from 'react';

// 初始一个context对象，里面的值为默认值
let context = createContext({ count: 2, addCount: function () { } })

class ContextChild extends React.Component {
    render(h) {
        // console.log(this);
        return (
            <>
                <p >count : {this.context.count}</p>
                <p onClick={() => { this.context.addCount() }}>将点击方法通过Provider 传下来，点击我触发context的方法</p>
            </>
        )
    }
}
// 使用context.contextType = createContext()对象，可使组件能用this.context 访问 Provider 传进来的值
ContextChild.contextType = context

class ContextChildBro extends React.Component {
    render(h) {
        return (
            <>
                <p>兄弟组件 count : {this.context.count}</p>
            </>
        )
    }
}
// 使用context.contextType = createContext()对象，可使组件能用this.context 访问 Provider 传进来的值
ContextChildBro.contextType = context

// 中间组件
function MiddleComp(props) {
    return (
        <>
            {props.children}
        </>
    )
}

class contextComp extends React.Component {
    constructor(props) {
        super(props)


        this.addCount = () => {
            let count = this.state.count;
            this.setState({
                count: ++count
            })
            console.log(this.state);
        }

        this.addSelfCount = () => {
            let selfValue = this.state.selfValue;
            this.setState({
                selfValue: ++selfValue
            })
        }

        this.state = {
            selfValue: 1,
            count: 1,
            addCount: this.addCount
        }
    }
    render() {
        return (
            //当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染
            <context.Provider value={this.state} >
                <h1>## context</h1>
                <p onClick={() => { this.addSelfCount() }}>点击更新父组件的值：{this.state.selfValue}，父组件的值更新会导致子组件的值更新，最好是把provider放到最外层</p>
                <MiddleComp>
                    <ContextChild ></ContextChild>
                    <ContextChildBro></ContextChildBro>
                </MiddleComp>
            </context.Provider>
        )
    }
}

export default contextComp;