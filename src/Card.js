import "./Card.css";

function Card({ card }) {
  //console.log(card);
  return (
    <img
      src={card.image}
      alt="card"
      className="Card"
      style={{
        transform: `rotate(${card.degree}deg)`,
        top: card.yPos + 50 + "px",
        left: card.xPos + 20 + "px",
      }}
    />
  );
}

export default Card;
