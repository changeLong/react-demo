/**
 * 列表渲染
 */
import React, { Fragment } from 'react';

class List extends React.Component {
    render(h) {
        let arr = [1, 2, 3],
            arr2 = [4,5,6,], 
            listDom = arr.map((item) => {
                return <li key={item.toString()}>{item}</li>
            }); //方式1
        return (
            <Fragment>
                <h2>列表渲染：</h2>
                <h3>1.在jsx外生成jsx列表</h3>
                <ul>{listDom}</ul>
                <h3>2.在jsx里循环</h3>
                <ul>
                    {
                        arr2.map((item) => <li key={item}>{item}</li>)
                    }
                </ul>
            </Fragment>
        )
    }
}

export default List;