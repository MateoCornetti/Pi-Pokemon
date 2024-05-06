const axios = require('axios')
const { URL_PATH_API } = process.env;
const { Types } = require('../db')

const cache = {};

const getTypes = async (req, res) => {
    try {
        // Verifica si hay datos en Caché
        if (cache.types) {
            console.log('Types encontrados en caché');
            return res.status(200).json(cache.types);
        }
        // Busca los tipos de la API
        const search = await axios.get(URL_PATH_API);

        let typesSet = new Set(); // Crear un conjunto para almacenar tipos únicos

        await Promise.all(
            search.data.results.map(async (pokemon) => {
                const data = await axios.get(pokemon.url);

                const typeNames = data.data.types.map(type => type.type.name);

                // Agregar cada tipo al conjunto
                typeNames.forEach(type => {
                    typesSet.add(type);
                });
            })
        );
        // Convertir el conjunto a un array
        const types = Array.from(typesSet);

        cache.types = types;

        res.status(200).json({ types });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getTypes;
