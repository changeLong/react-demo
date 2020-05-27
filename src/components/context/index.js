/**
 * state demo
 */

import React, { createContext } from 'react';

let init = {
    count: 1
}

let context = createContext({ count: 2 })


class ContextChild extends React.Component {
    render(h) {
        console.log(this);
        return (
            <>
                <p >count : {this.context.count}</p>
            </>
        )
    }
}
// 使用context.contextType = createContext()对象，可使组件能用this.context 访问 Provider 传进来的值
ContextChild.contextType = context

// function contextComp() {
//     setInterval(() => {
//         init.count++;
//         console.log(init.count);
//     },1000)
//     return (
//         <context.Provider value={init}>
//             <ContextChild></ContextChild>
//         </context.Provider>
//     )
// }

class contextComp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count : 1
        }
        this.toggle = () => {
            this.setState({
                init : 2
            })
        }
    }
    render() {
        return (
            <context.Provider value={this.state} >
                <ContextChild ></ContextChild>
                <p onClick={()=>{console.log(1111)}}>1111</p>
            </context.Provider>
        )
    }
}

export default contextComp;