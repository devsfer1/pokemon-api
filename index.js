const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://devsfer:oP8mF59i@cluster0.063gm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const pokemonSchema = new mongoose.Schema({
    name: String,
    type: String,
    imageUrl: String
})

const pokemonModel = new mongoose.model('pokemon', pokemonSchema);

app.get('/pokemons', async (req, res) => {
  let pokemons = await pokemonModel.find();
  res.send(pokemons);
})

app.listen(3001, () => {
  console.log('Server is listening on 3001')
})