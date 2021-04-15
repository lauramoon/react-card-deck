import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "./Card.js";
import "./CardDeck.css";

function CardDeck() {
  const [cardList, setCardList] = useState([]);
  const deckId = useRef();

  useEffect(() => {
    async function getDeck() {
      try {
        const res = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/shuffle/"
        );
        deckId.current = res.data.deck_id;
      } catch (err) {
        console.log(err);
        alert("Unable to get deck of cards");
      }
    }
    getDeck();
  }, []);

  const dealCard = () => {
    async function getNextCard() {
      try {
        const res = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`
        );
        const newCard = res.data.cards[0];
        newCard.degree = (Math.random() - 0.5) * 60;
        newCard.xPos = Math.random() * 20;
        newCard.yPos = Math.random() * 20;
        setCardList((cardList) => [...cardList, newCard]);
      } catch (err) {
        console.log(err);
        alert("Unable to get next card");
      }
    }
    getNextCard();
  };

  return (
    <div className="CardDeck">
      <div>
        <button onClick={dealCard}>Deal Card!</button>
      </div>
      <div className="CardPile">
        {cardList.map((c) => (
          <Card card={c} key={`${c.value}-${c.suit}`} />
        ))}
      </div>
    </div>
  );
}

export default CardDeck;
