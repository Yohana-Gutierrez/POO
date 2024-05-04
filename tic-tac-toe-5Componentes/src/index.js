import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import calculateGanador from './helpers/calculateGanador'
import Board from './components/board/Board'
import GameInfo from './components/game-info/GameInfo'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

 /* Verificamos si el juego ya ha terminado o si la casilla ya está ocupada.
   Si el juego no ha terminado y la casilla está vacía, actualiza el
    estado del juego con el nuevo movimiento.*/
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateGanador(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }
  /* Esta función la llamamos cuando se hace clic en un paso anterior en la lista de movimientos. 
  Actualiza el estado del juego para mostrar el tablero en el paso seleccionado.*/
  jumpTo(step) {
    console.log(step)
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
  }
 /* Muestra el estado del juego 
  (por ejemplo, quién es el próximo jugador o si hay un ganador) y el tablero de juego.*/
  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const ganador = calculateGanador(current.squares)
    let status
    if (ganador) {
      status = 'Ganador: ' + ganador
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    return (
      <React.Fragment>
        <h1>Tic Tac Toe</h1>
        <section className="game">
          <GameInfo
            status={status}
            ganador={ganador}
            xIsNext={this.state.xIsNext}
          />
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            jumpTo={(i) => this.jumpTo(i)}
          />
        </section>
      </React.Fragment>
    )
  }
}
/*Este método de ReactDOM se utiliza para renderizar el componente Game en el elemento 
con el id "root" en el DOM.*/
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Game />)
