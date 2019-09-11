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
        //console.log(this.setState); //继承的时候就有这个方法了
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }
    /**
     * 生命周期-挂载
     */
    componentDidMount(){
        this.timer = setInterval(() => {
            this.tick();
        }, 1000);
    }

    render() {
        return (
            <Fragment>
                <p>时钟：{this.state.date.toLocaleTimeString()}</p>
            </Fragment>
        )
    }
 }

 class parent {
    componentDidMount(){
        console.log('parent');
    }
 }

 class children extends parent {
     constructor(props){
       super();
     }

     componentDidMount(){
         console.log('children');
     }
 }

 let obj = new children();
 obj.componentDidMount()

 export default Clock;