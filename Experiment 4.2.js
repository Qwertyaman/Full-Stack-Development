app.get('/', (req, res) => {
  res.send('Welcome to the Playing Cards API 🎴 <br> Try <a href="/cards">/cards</a>');
});

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" },
  { id: 3, suit: "Diamonds", value: "Queen" }
];

app.get('/cards', (req, res) => {
  res.json(cards);
});

app.get('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find(c => c.id === cardId);

  if (!card) {
    return res.status(404).json({ message: `Card with ID ${cardId} not found` });
  }
  res.json(card);
});

// POST (add) a new card
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    return res.status(400).json({ message: "Suit and value are required" });
  }

  const newCard = {
    id: cards.length > 0 ? cards[cards.length - 1].id + 1 : 1,
    suit,
    value
  };

  cards.push(newCard);
  res.status(201).json(newCard);
});

// DELETE a card by ID
app.delete('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const cardIndex = cards.findIndex(c => c.id === cardId);

  if (cardIndex === -1) {
    return res.status(404).json({ message: `Card with ID ${cardId} not found` });
  }

  const removedCard = cards.splice(cardIndex, 1)[0];
  res.json({ message: `Card with ID ${cardId} removed`, card: removedCard });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
