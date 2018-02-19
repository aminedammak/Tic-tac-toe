import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  

function Square (props) {
	return (
		<button className="square" onClick={props.onClick}>{props.sign}</button>
	);
}

class Board extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			squares: ["", "", "", "", "", "","", "", ""],
			nextSignX: false,
			winner: ""
		}
		this.topMessage = this.topMessage.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.combinationWin = this.combinationWin.bind(this);
		this.winnerPossibilities = [
			[0,1,2], [3, 4, 5], [6, 7, 8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
		];
	}

	handleClick(i){
		if(!this.state.winner) {
			let squaresTable = this.state.squares.slice();
			if(squaresTable[i]) {
				return
			}
			else {

				squaresTable[i] = this.state.nextSignX ? "X" : "O";
				this.setState({squares: squaresTable,
							   nextSignX: !this.state.nextSignX}, function() {
				   					this.setState({winner: this.combinationWin ()});
							   });
			}
		} else {
			return;
		}
	}

	combinationWin () {
		let squares = this.state.squares;
		for(let i=0; i < this.winnerPossibilities.length; i++) {
			if((squares[this.winnerPossibilities[i][0]]) && (squares[this.winnerPossibilities[i][0]] === squares[this.winnerPossibilities[i][1]]) && (squares[this.winnerPossibilities[i][0]] === squares[this.winnerPossibilities[i][2]])) {
				return squares[this.winnerPossibilities[i][0]];
			} 
		}
	}
	

	topMessage() {
		let topMessage = '';
		if (this.state.winner) {
			return <div>The winner is {this.state.winner} !!!</div>;		
		} 
        
		else {
			for( var i= 0; i < this.state.squares.length; i++) {
				if (!this.state.squares[i]) {
					return <div>Its Player <strong>{this.state.nextSignX ? "X" : "O"}</strong> turn</div>;				
				}
			}
			return topMessage = "No winner";
		}
	}

	render () {

		return (
			<div>
			{this.topMessage()}
			
			
			<table>
				<tbody>
					<tr>
						<td><Square sign= {this.state.squares[0]} onClick={()=>this.handleClick(0)} /></td>
						<td><Square sign= {this.state.squares[1]}  onClick={()=>this.handleClick(1)} /></td>
						<td><Square sign= {this.state.squares[2]}  onClick={()=>this.handleClick(2)} /></td>
					</tr>
					<tr>
						<td><Square sign= {this.state.squares[3]} onClick={()=>this.handleClick(3)} /></td>
						<td><Square sign= {this.state.squares[4]}  onClick={()=>this.handleClick(4)} /></td>
						<td><Square sign= {this.state.squares[5]}  onClick={()=>this.handleClick(5)} /></td>
					</tr>
					<tr>
						<td><Square sign= {this.state.squares[6]} onClick={()=>this.handleClick(6)} /></td>
						<td><Square sign= {this.state.squares[7]}  onClick={()=>this.handleClick(7)} /></td>
						<td><Square sign= {this.state.squares[8]}  onClick={()=>this.handleClick(8)} /></td>
					</tr>

				</tbody>
			</table>
			</div>
			);
	}
}

class Game extends React.Component{
	render () {
		return (<Board/>);
	}
}

ReactDOM.render(
	<Game />, 
	document.getElementById('root') 
);