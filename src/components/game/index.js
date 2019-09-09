import React from 'react';
import './index.css';


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

/**
 * 函数式组件
 */
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            nextIsX: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.jumoTo = this.jumoTo.bind(this);
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.nextIsX ? 'O' : 'X';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            nextIsX: !this.state.nextIsX,
        });
    }

    jumoTo(i){
        const arr = [...this.state.history];
        const arr1 = arr.slice(0,i+1);
        this.setState({
            history: arr1,
            nextIsX : (this.i+1) % 2 === 0 ? true : false
        })
    }
   

    render() {
        const history = this.state.history;
        const current = this.state.history.slice(-1)[0];    //obj
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.nextIsX ? 'O' : 'X');
        }

        const step = history.map((item,index) => {
            const txt = index ? 'step' + index : 'go back start';
            return (
                <li key={index} onClick={ () => {this.jumoTo(index)} }>{txt}</li>
            )
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{step}</ol>
                </div>
            </div>
        );
    }
}

export default Game;