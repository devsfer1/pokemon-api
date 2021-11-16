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

app.post('/pokemons', async (req, res) => {
  let pokemon = req.body
  let pokemonObj = new pokemonModel(pokemon);
  pokemonObj.save((err, data) => {
    if(err === null) {
      res.send({message: 'Pokemon created'})
    } else {
      res.send({message: 'Pokemon not created'})
    }
  })
})

app.delete('/pokemon/:id', async (req, res) => {
  let id = req.params.id;
  pokemonModel.deleteOne({_id: id}, (err, data) => {
    if(err === null) {
      res.send({message: 'Pokemon deleted'})
    } else {
      res.send({message: 'Pokemon not deleted'})
    }
  })
})

app.put('/pokemon/:id', async (req, res) => {
  let id = req.params.id;
  let pokemon = req.body;
  pokemonModel.updateOne({_id: id}, pokemon, (err, data) => {
    if(err === null) {
      res.send({message: 'Pokemon updated'})
    } else {
      res.send({message: 'Pokemon not updated'})
    }
  })
  findByIdUpdate(id,pokemon)
})

app.listen(3001, () => {
  console.log('Server is listening on 3001')
})