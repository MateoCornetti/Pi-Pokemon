const { Router } = require('express');
const {getPokemons, getPokemonById} = require('../controllers/getPokemons');
const getPokemonByName = require('../controllers/getPokemonByName');
const getTypes = require('../controllers/getTypes');
const postPokemon = require('../controllers/postPokemon');


const router = Router();

router.get('/pokemons', getPokemons);
router.get('/pokemon/name/:name', getPokemonByName);
router.get('/pokemon/id/:id', getPokemonById)
router.get('/types', getTypes);
router.post('/pokemons', postPokemon);

module.exports = router;
