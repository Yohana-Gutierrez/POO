/*se encarga de determinar si hay un ganador en el juego de tic-tac-toe (tres en raya)
 dado un estado de tablero representado por el array squares.*/

function calculateGanador(squares) {
    const lines = [

      /*todas las combinaciones posibles de líneas en el tablero que podrían conducir a una victoria. 
      Esto incluye líneas horizontales, verticales y diagonales.*/
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

      /*Verifica si las posiciones a, b y c del tablero contienen fichas del mismo jugador y no son null.
       Si estas condiciones se cumplen, significa que hay un ganador en esa línea, y la función devuelve
        el valor de la ficha que ha ganado (es decir, 'X' o 'O').*/
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  export default calculateGanador;