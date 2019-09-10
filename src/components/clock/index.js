/**
 * state demo
 */

 import React,{Fragment} from 'react';

 class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {  // 此处设置组件自己的state，即状态，不受外部影响
            date : new Date()
        }
    }
    render() {
        return (
            <Fragment>
                <p>时钟：{this.state.date.toLocaleTimeString()}</p>
            </Fragment>
        )
    }
 }

 console.log(new Clock().state);

 export default Clock;