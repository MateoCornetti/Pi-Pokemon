const { Pokemon, Type } = require('../db');

const postPokemon = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

  try {
    console.log('Data received', [name, image, hp, attack, defense, speed, height, weight, types]);

    // Verificar si se proporcionaron todos los datos necesarios
    if (!name || !hp || !attack || !defense || !speed || !height || !weight || !types) {
      console.log("Faltan datos");
      return res.status(400).json({ error: "Faltan datos" });
    }
    // Convertir los valores de cadena a números enteros
    const parsedHp = parseInt(hp);
    const parsedAttack = parseInt(attack);
    const parsedDefense = parseInt(defense);
    const parsedSpeed = parseInt(speed);
    const parsedHeight = parseInt(height);
    const parsedWeight = parseInt(weight);

    // Verificar si se proporcionaron todos los datos necesarios y si los valores son números
    if (!name || isNaN(parsedHp) || isNaN(parsedAttack) || isNaN(parsedDefense) || isNaN(parsedSpeed) || isNaN(parsedHeight) || isNaN(parsedWeight) || !types) {
      console.log("Datos faltantes o no válidos");
      return res.status(400).json({ error: "Los stats tienen que ser números" });
    }
    // Verificar si el pokemon ya existe en la base de datos
    let existingPokemon = await Pokemon.findOne({ where: { name: name }});
    if (existingPokemon) {
      console.log("Ese pokemon ya existe");
      return res.status(400).json({ error: 'Ese pokemon ya existe' });
    }

    // Crear el nuevo pokemon en la base de datos
    const newPokemon = await Pokemon.create({
      name: name,
      image: image,
      attack: attack,
      defense: defense,
      speed: speed,
      hp: hp,
      height: height,
      weight: weight,
    });

    // Asociar los tipos al nuevo pokemon
    for (let index = 0; index < types.length; index++) {
      const typeName = types[index];
      console.log("Type a buscar:", typeName);
      const allTypes = await Type.findAll()
      console.log("Todos los tipos de la DB:", allTypes);
      const type = await Type.findOne({ where: { name: typeName }});
      console.log("Respuesta de Type:", type);
      if (type) {
        await newPokemon.addType(type);
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