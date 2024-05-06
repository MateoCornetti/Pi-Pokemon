const axios = require('axios');
const { URL_PATH_API } = process.env
const { Pokemon, Type } = require('../db')

const getPokemonByName = async (req, res) => {
    const { name } = req.params;

    try {
            // Busca en la API
            const search = await axios.get(URL_PATH_API);
    
            let pokemons_api = await Promise.all(
                search.data.results.map(async (pokemon) => {
                    const data = await axios.get(pokemon.url);
    
                    const hpStat = data.data.stats.find(stat => stat.stat.name === "hp");
                    const attackStat = data.data.stats.find(stat => stat.stat.name === "attack");
                    const defenseStat = data.data.stats.find(stat => stat.stat.name === "defense");
                    const speedStat = data.data.stats.find(stat => stat.stat.name === "speed");
    
                    const typeNames = data.data.types.map(type => type.type.name);
    
                    const {
                        id,
                        name,
                        sprites: {
                            other: {
                                "official-artwork": { front_default: image }
                            }
                        },
                        height,
                        weight
                    } = data.data;
    
                    return {
                        id,
                        name,
                        image,
                        hp: hpStat ? hpStat.base_stat : null, // Para manejar el caso cuando no hay datos
                        attack: attackStat ? attackStat.base_stat : null,
                        defense: defenseStat ? defenseStat.base_stat : null,
                        speed: speedStat ? speedStat.base_stat : null,
                        height,
                        weight,
                        types: typeNames,
                    };
                })
            );
    
            // Busca en la base de datos
            let pokemons_db_search = await Pokemon.findAll({include: {model: Type}});
            if (pokemons_db_search.length !== 0) {
                pokemons_db_search = pokemons_db_search.map(obj => obj.get({ plain: true }))
                pokemons_db_search = pokemons_db_search.map(obj => {
                    return ({ ...obj, "type": obj["Types"].map(e=>e.type).join(", ") })
                  });
              }
            let pokemons_db = await pokemons_db_search.map((pokemon) => {
                const {
                    id,
                    name,
                    image,
                    hp,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                    types,
                } = pokemon;
                return {
                    id,
                    name,
                    image,
                    hp,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                    types,
                }
            })
            let data= { "api": pokemons_api, "created": pokemons_db};
  
      if (data && data.api && Array.isArray(data.api)) {
        const pokemonEncontrado = data.api.find(pokemon => pokemon.name === name.toLowerCase());
  
        if (pokemonEncontrado) {
          res.status(200).json(pokemonEncontrado);
        } else {
          res.status(404).json({ message: 'No se encontraron pokemones con ese nombre' });
        }
      } else {
        res.status(500).json({ error: 'Error interno del servidor', message: 'Los datos recibidos no tienen el formato esperado' });
      }
    } catch (error) {
      console.error('Error en la función getPokemonByName:', error);
      res.status(500).json({ error: 'Error interno del servidor', message: error.message });
    }
  };
  
  module.exports = getPokemonByName;