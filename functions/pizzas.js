const { MENUS_QUERY } = require('./queries.js');
import fetch from 'node-fetch';

async function fetchPizzaItems(menusInput) {
  const url = 'https://ws-api.toasttab.com/consumer-app-bff/v1/graphql';

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: MENUS_QUERY, variables: { input: menusInput } }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const menus = data.data.menusV3.menus;
  const foodMenu = menus.find((menu) => menu.name === 'Food Menu');
  if (!foodMenu) {
    throw new Error('Food Menu not found');
  }

  const instagramPizzasGroup = foodMenu.groups.find((group) => group.name === 'Instagram Pizzas');
  if (!instagramPizzasGroup) {
    throw new Error('Instagram Pizzas group not found in Food Menu');
  }

const itemsToFilter = ['Macys Fish Fry Dinner'];
const instagramPizzasItems = instagramPizzasGroup.items.filter((item) => !itemsToFilter.includes(item.name));

const uniqueInstagramPizzasItems = instagramPizzasItems
  .map((item) => ({ ...item, name: item.name.replace(/^Large\s/, '').replace(/^Small\s/, '') }))
  .filter((item, index, arr) => arr.findIndex((i) => i.name === item.name) === index);

const pizzaItems = uniqueInstagramPizzasItems.map(({ name, description, imageUrl }) => ({ name, description, imageUrl }));

  return pizzaItems;
}

module.exports = { fetchPizzaItems };
