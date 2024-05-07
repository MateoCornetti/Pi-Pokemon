const { Pokemon, Type } = require('../db');

const postPokemon = async (req, res) => {
  const {name, image, hp, attack, defense, speed, height, weight, types}= req.body;
  try {
    console.log('Data received', [name, image, hp, attack, defense, speed, height, weight, types]);
    // Si ya hay un pokemon en la base de datos con el nombre que le pasamos devuelve el error correspondiente
    let ExistingPokemon = await Pokemon.findOne({ where: { name: name }})
    if (ExistingPokemon) {
      return res.status(400).json({error: 'Esa pokemon ya existe'});
    }
    // Si no hay pokemones con ese nombre crea uno nuevo
      const newPokemon = await Pokemon.create({
        name: name,
        image: image,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
      });
    // Si le pasamos tipos los añade al pokemon que estamos creando
    if (types) {
      for (let index = 0; index < types.length; index++) {
        const typeName = types[index];
        const type = await Type.findOne({
          where: { type: typeName },
        });
        if (types) {
          await newPokemon.addType(type);
        }
      }
    }
    console.log("Pokemon creado", newPokemon);
    res.status(200).json(newPokemon);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = postPokemon;