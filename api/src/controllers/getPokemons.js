const axios = require('axios');

const { URL_PATH_API } = process.env
const { Pokemon, Type } = require('../db')

const getPokemons = async (req, res) => {
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
                    hp: hpStat ? hpStat.base_stat : null, // Manejar el caso cuando la estadística no está presente
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
        let pokemons= { "api": pokemons_api, "created": pokemons_db};
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getPokemonById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Buscando pokemon con ID: ${id}`);
        // Convertir el id a un entero
        const pokemonId = parseInt(id, 10);
        console.log(`ID convertido a entero: ${pokemonId}`);

        // Buscar el pokemon por su id en el caché de la API
        const pokemonFromApi = cache.pokemons.api.find(pokemon => pokemon.id === pokemonId);
        if (pokemonFromApi) {
            console.log(`Pokemon encontrado en el caché de la API.`);
            return res.status(200).json(pokemonFromApi);
        }

        // Buscar el pokemon por su id en el caché de la base de datos
        const pokemonFromDatabase = cache.pokemons.created.find(pokemon => pokemon.id === pokemonId);
        if (pokemonFromDatabase) {
            console.log(`Pokemon encontrado en el caché de la base de datos.`);
            return res.status(200).json(pokemonFromDatabase);
        }

        // Si no se encuentra en ninguno de los cachés, lanzar un error
        console.log(`No se encontró el pokemon en el caché.`);
        return res.status(404).json({ message: `No se encontró el pokemon con ID ${pokemonId} en el caché.` });
    } catch (error) {
        return res.status(500).json({ error: `Error al buscar el pokemon con id ${id}: ${error.message}` });
    }
};

module.exports = {
    getPokemons,
    getPokemonById
};