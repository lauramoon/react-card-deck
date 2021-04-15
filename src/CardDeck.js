import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "./Card.js";
import "./CardDeck.css";

function CardDeck() {
  const [cardList, setCardList] = useState([]);
  const [dealing, setDealing] = useState(false);
  const [deckDone, setDeckDone] = useState(false);
  const [buttonText, setButtonText] = useState("Getting Deck");
  const deckId = useRef();
  const timerId = useRef();

  useEffect(() => {
    if (dealing) {
      timerId.current = setInterval(() => {
        dealCard();
      }, 1000);

      return () => {
        clearInterval(timerId.current);
      };
    }
    // eslint-disable-next-line
  }, [dealing]);

  useEffect(() => {
    async function getDeck() {
      try {
        const res = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/shuffle/"
        );
        deckId.current = res.data.deck_id;
        setCardList([]);
        setButtonText("Start Dealing");
      } catch (err) {
        console.log(err);
        alert("Unable to get deck of cards");
      }
    }
    if (!deckDone) getDeck();
  }, [deckDone]);

  const dealCard = () => {
    async function getNextCard() {
      try {
        const res = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`
        );
        const newCard = res.data.cards[0];
        if (newCard) {
          newCard.degree = (Math.random() - 0.5) * 60;
          newCard.xPos = Math.random() * 20;
          newCard.yPos = Math.random() * 20;
          setCardList((cardList) => [...cardList, newCard]);
        } else {
          setDeckDone(true);
          setDealing(false);
          setButtonText("Shuffle Deck");
          alert("No more cards in this deck");
        }
      } catch (err) {
        console.log(err);
        toggleDealing();
        alert("Unable to get next card");
      }
    }
    getNextCard();
  };

  const toggleDealing = () => {
    setButtonText(dealing ? "Start Dealing" : "Stop Dealing");
    setDealing(!dealing);
  };

  const handeClick = () => {
    deckDone ? setDeckDone(false) : toggleDealing();
  };

  return (
    <div className="CardDeck">
      <div>
        <button onClick={handeClick}>{buttonText}</button>
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
