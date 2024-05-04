import Friends from '../../assets/images/friends.webp'

const GameInfo = ({ status, ganador, xIsNext }) => {
  return (
    <section className="game-information">
      {xIsNext && !ganador ? (
        <h3 className="jugador-x">Es tu turno, jugador X</h3>
      ) : !xIsNext && !ganador ? (
        <h3 className="jugador-o">Es tu turno, jugador O! </h3>
      ) : ganador && status === 'Ganador: X' ? (
        <h3 className="jugador-x">Nice! Yo gano! </h3>
      ) : (
        <h3 className="jugador-o">Wohoo! Lo Logre!</h3>
      )}
      <img src={Friends} alt="Jugador X and Jugador O" />
    </section>
  )
}

export default GameInfo
