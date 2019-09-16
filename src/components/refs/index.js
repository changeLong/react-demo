import React from 'react';

class Refdom extends React.Component {
    constructor(props){
        super(props);
        this.handldClick = this.handldClick.bind(this);
        this.myRef = React.createRef();
    }
    handldClick (){
        console.log(this.myRef);
    }
    render(h) {
        return (
            <>
                <input ref={this.myRef} onClick= { () => this.handldClick() }></input>
                <p ref={this.myRef}  onClick= { () => this.handldClick() }>123123123</p>
            </>
        )
    }
}

export default Refdom;