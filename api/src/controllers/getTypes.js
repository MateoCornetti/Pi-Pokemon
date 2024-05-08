const axios = require('axios');
const { URL_PATH_API } = process.env;
const { Type } = require('../db');

const cache = {};

const getTypes = async (req, res) => {
    try {
        // Verifica si hay datos en caché
        if (cache.types) {
            console.log('Tipos encontrados en caché');
            return res.status(200).json(cache.types);
        }

        // Obtiene los tipos de la API
        const search = await axios.get(URL_PATH_API);
        const types = new Set();

        // Recorre los resultados de la búsqueda para obtener los tipos únicos
        await Promise.all(search.data.results.map(async (pokemon) => {
            const data = await axios.get(pokemon.url);
            const typeNames = data.data.types.map(type => type.type.name);
            typeNames.forEach(type => types.add(type));
        }));

        // Convierte el conjunto a un array
        const uniqueTypes = Array.from(types);

        // Guarda los tipos en caché
        cache.types = uniqueTypes;

        // Busca los tipos en la base de datos
        const DBTypes = await Type.findAll();
        console.log("Types encontrados:", DBTypes);
        // Si no hay tipos en la base de datos, crea nuevos tipos
        if (DBTypes.length === 0) {
            const typesToCreate = uniqueTypes.map(name => ({ name }));
            await Type.bulkCreate(typesToCreate);
            console.log("Tipos creados en la base de datos");
        }
        res.status(200).json({ types: uniqueTypes });
    } catch (error) {
        console.error("Error al obtener/guardar los tipos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = getTypes;