const express = require('express');
const app = express();
const PORT = 3000;


// Section 1: Greetings
app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}!`);
});


// Section 2: Roll the Dice
app.get('/roll/:number', (req, res) => {
  const number = parseInt(req.params.number);

  if (isNaN(number)) {
    res.send("You must specify a number.");
  } else {
    const rolled = Math.floor(Math.random() * (number + 1));
    res.send(`You rolled a ${rolled}.`);
  }
});


// Section 3: Collectibles
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const item = collectibles[index];

  if (!item) {
    res.send("This item is not yet in stock. Check back soon!");
  } else {
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
  }
});


// Section 4: Shoes with Query Params
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
  let filteredShoes = shoes;

  const minPrice = parseInt(req.query['min-price']);
  const maxPrice = parseInt(req.query['max-price']);
  const type = req.query.type;

  if (!isNaN(minPrice)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }

  if (!isNaN(maxPrice)) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }

  if (type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.send(filteredShoes);
});


// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
