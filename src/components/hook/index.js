/**
 * context 
 * 简化了组件树中的数据传递
 * 类似vue中的 provide | inject
 */
import React, { useState,useEffect } from 'react';

// 公共的hook，类似 mixin, 每个组件使用后都独立维护自己的数据
function useCommonCount(count) {
    const [commonCount,setCount] = useState(count);

    useEffect(()=>{
        // console.log('公有state更新');
    })
    // return [commonCount,setCount];
    return [commonCount,setCount];
}

function Comp1(props) {
    // useCommonCount 返回的内容由公共hook决定；
    let [count,setCount] = useCommonCount(0);

    // 多个effect 会同时出发
    useEffect(()=>{
        console.log('ui更新触发useEffect');
    })
    useEffect(()=>{
        console.log('触发多个effect');
    })
    return (
        <>
            <h1>useState</h1>
            <p onClick={()=> {setCount(count + 1)}}>count : {count};click me add</p>
            {/* <p >count : {count};click me add</p> */}
        </>
    )
}

function HookArea(){
    return (
        <>
            <Comp1></Comp1>
        </>
    )
}

export default HookArea;