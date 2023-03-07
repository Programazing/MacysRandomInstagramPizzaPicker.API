const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const cors = require('cors');
const { fetchPizzaItems } = require('./pizzas.js');

const app = express();
app.use(cors());
const router = express.Router();


const menusInput = {
    shortUrl: 'macy-s-place-pizzeria',
    restaurantGuid: '59d7aefc-7ec7-42fa-9c9a-1cf6f7e572e0',
    menuApi: 'DO'
  };

// Use body-parser middleware to parse incoming JSON requests
router.use(bodyParser.json());

// Serve the index.html file at the root path
router.get('/', (req, res) => {
    res.send('App is running..');
});

// Endpoint to fetch a random pizza item
router.get('/pizza', async (req, res) => {
  try {
    const pizzaItems = await fetchPizzaItems(menusInput);
    const randomPizza = pizzaItems[Math.floor(Math.random() * pizzaItems.length)];
    res.json(randomPizza);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error fetching pizza items. ${error}`);
  }
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
