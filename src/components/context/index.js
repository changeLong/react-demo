/**
 * state demo
 */

import React,{createContext} from 'react';

let init = {
    count : 1
}

let context = createContext({count : 2})


class ContextChild extends React.Component {
    render(h) {
        // console.log(this);
        return (
            <>
                <p>count : {this.context.count}</p>
            </>
        )
    }
}
// 使用context.contextType = createContext()对象，可使组件能用this.context 访问 Provider 传进来的值
ContextChild.contextType = context

function contextComp() {
    setInterval(() => {
        init.count++
    },1000)
    return (
        <context.Provider value={init}>
            <ContextChild></ContextChild>
        </context.Provider>
    )
}

export default contextComp;