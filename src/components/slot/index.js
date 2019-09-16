import React from 'react';


class slotDom extends React.Component {
    constructor(props){
        super(props)
        console.log(props);
    }

    render() {
        return (
            <div className={this.props.classname}>
                {this.props.children}
                <div>
                    {this.props.nameSlot}
                </div>
            </div>
        )
    }
}

export default slotDom