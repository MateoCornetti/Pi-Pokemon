import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createPokemon, getTypes } from '../../redux/actions';

const Cartita = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 45em;
  box-shadow: -4px 8px 10px rgba(32, 32, 32, 0.5);
  background-color: #ffffff;
  border-bottom-right-radius: 3em;
  border-bottom-left-radius: 3em;
  border-style: solid;
  border-width: 0px;
  border-top-width: 0px;
  margin-left: 13em;
  margin-right: 13em;
  padding-bottom: 2em;
`;
const Divs = styled.div`
  display: flex;
`;
const Entrada = styled.input`
  font-size: 22px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  height: 50px;
  width: 20em;
  border-radius: 2em;
  border-width: 0em;
  padding-right: 2em;
  padding-left: 2em;
  box-shadow: -2px 2px 10px rgba(32, 32, 32, 0.5);
`;
const EntradaChica = styled.input`
  font-size: 22px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  height: 50px;
  width: 6em;
  border-radius: 2em;
  border-width: 0em;
  padding-right: 1em;
  padding-left: 1em;
  box-shadow: -2px 2px 10px rgba(32, 32, 32, 0.5);
`;
const DivA = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 1em;
  width: 40em;
`;
const DivB = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-left: 4em;
`;
const DivC = styled.div`
  display: flex;
`;
const DivIndividual = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Titulo = styled.div`
  margin-top: 30px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 4em;
  color: #214094;
`;
const Descripcion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  margin-top: 30px;
  width: 6em;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 2.5em;
  color: #214094;
`;
const EntradaSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  resize: vertical;
  background-color: white;
  font-size: 22px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  min-height: 50px;
  max-height: 150px;
  width: 20em;
  border-top-right-radius: 0.5em;
  border-top-left-radius: 2em;
  border-width: 0em;
  padding-right: 2em;
  padding-left: 2em;
  box-shadow: -2px 2px 10px rgba(32, 32, 32, 0.5);
  overflow: auto;
`;
const Selector = styled.select`
  font-size: 22px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  height: 13em;
  width: 24em;
  border-bottom-left-radius: 2em;
  border-width: 0em;
  padding-right: 2em;
  padding-left: 2em;
  box-shadow: -2px 2px 10px rgba(32, 32, 32, 0.5);
`;
const Boton = styled.button`
  background-color: #e8ffdf;
  color: #90aa86;
  box-shadow: -2px 2px 10px rgba(32, 32, 32, 0.5);
  border-width: 0px;
  border-style: solid;
  height: 2em;
  width: 6em;
  margin-bottom: 1em;
  border-radius: 2em;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 2em;
  cursor: pointer;
  &:hover {
    box-shadow: -1px 1px 5px rgba(32, 32, 32, 0.5);
    background-color: #90aa86;
    color: #e8ffdf;
  }
`;
const Creador = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1em;
`;
const Borrador = styled.button`
  background-color: #e8ffdf;
  color: #90aa86;
  box-shadow: -2px 2px 10px rgba(32, 32, 32, 0.5);
  border-width: 0px;
  border-style: solid;
  height: 40px;
  width: 50px;
  margin-left: 5em;
  border-radius: 2em;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    box-shadow: -1px 1px 5px rgba(32, 32, 32, 0.5);
    background-color: #90aa86;
    color: #e8ffdf;
  }
`;
const NewBreedForm = ({ types, createPokemon, getTypes }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    attack: '',
    defense: '',
    speed: '',
    hp: '',
    height: '',
    weight: '',
    types: [],
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      getTypes();
      setDataLoaded(true);
    }
  }, [getTypes, dataLoaded]);

// Para manejar los temperamentos seleccionados
const handleChangeTypes = (e) => {
    const { options } = e.target;
    const selectedTypes = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
  
    // Verificar si el número de tipos seleccionados es mayor que 2
    if (selectedTypes.length > 2) {
      alert('¡Solo puedes seleccionar hasta 2 tipos!');
      return; // Salir de la función si se seleccionan más de 2 tipos
    }
  
    // Verificar si ya hay tipos seleccionados
    if (formData.types.length > 0) {
      // Si hay tipos seleccionados, se agrega el nuevo tipo seleccionado
      // si no está presente en la lista actual
      setFormData((prevData) => ({
        ...prevData,
        types: [
          ...prevData.types,
          ...selectedTypes.filter((type) => !prevData.types.includes(type)),
        ],
      }));
    } else {
      // Si no hay tipos seleccionados, se establece la lista de tipos seleccionados
      setFormData((prevData) => ({
        ...prevData,
        types: selectedTypes,
      }));
    }
  };
// Para manejar los inputs
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// Para limpiar la lista de temperamentos seleccionados
  const handleClearTypes = () => {
    setFormData((prevData) => ({
      ...prevData,
      types: [], 
    }));
  };

// Para crear la raza
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.name) {
      alert('Debes ingresar un nombre')
    }
    if (!formData.hp || !formData.attack || !formData.defense || !formData.speed) {
      alert('Completá las stats de tu pokemon')
    }
    if (!formData.height || !formData.weight) {
      alert('Falta dato de altura y/o peso del pokemon')
    }
    if (formData.types.length === 0) {
      alert('Agrega al menos un tipo a tu pokemon')
    }
    else {
      createPokemon(formData)
    } 
  };

  return (
    <Cartita>
      <Titulo>Crear una nueva raza</Titulo>
      <form onSubmit={handleSubmit} noValidate>
        <Divs>
          <DivA>
            <DivIndividual>
              <Descripcion>Nombre</Descripcion>
              <Entrada
                type="text"
                name="name"
                placeholder="..."
                value={formData.name}
                onChange={handleChange}
                required
              />
            </DivIndividual>
            <DivIndividual>
              <Descripcion>Imagen</Descripcion>
              <Entrada
                type="text"
                name="image"
                placeholder="inserte URL"
                value={formData.image}
                onChange={handleChange}
              />
            </DivIndividual>
            <DivC>
            
            <DivIndividual>
              <Descripcion>Attack</Descripcion>
              <EntradaChica
                type="text"
                name="attack"
                placeholder="..."
                value={formData.attack}
                onChange={handleChange}
                required
              />
            </DivIndividual>
            <DivIndividual>
              <Descripcion>Defense</Descripcion>
              <EntradaChica
                type="text"
                name="defense"
                placeholder="..."
                value={formData.defense}
                onChange={handleChange}
                required
              />
            </DivIndividual>
            <DivIndividual>
              <Descripcion>Speed</Descripcion>
              <EntradaChica
                type="text"
                name="speed"
                placeholder="..."
                value={formData.speed}
                onChange={handleChange}
                required
              />
            </DivIndividual> 
            </DivC>
            <DivC>
            <DivIndividual>
              <Descripcion>HP</Descripcion>
              <EntradaChica
                type="text"
                name="hp"
                placeholder="..."
                value={formData.hp}
                onChange={handleChange}
                required
              />
            </DivIndividual>
            <DivIndividual>
                <Descripcion>Altura</Descripcion>
                <EntradaChica
                  type="text"
                  name="height"
                  placeholder="..."
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </DivIndividual>
              <DivIndividual>
                <Descripcion>Peso</Descripcion>
                <EntradaChica
                  type="text"
                  name="weight"
                  placeholder="..."
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </DivIndividual>
            </DivC>
          </DivA>
          <DivB>
            <Descripcion>
              Types
              <Borrador onClick={handleClearTypes}>X</Borrador>
              </Descripcion>
              <EntradaSelector>
                {formData.types.length > 0 ? formData.types.join(", ") : "..."}
                </EntradaSelector>
            <Selector
                name="type"
                value={formData.types}
                onChange={handleChangeTypes}
                required
                multiple
                >
                {
                Array.isArray(types) && types.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))
                }
            </Selector>
          </DivB>
        </Divs>
        <Creador>
          <Boton type="submit">CREAR</Boton>
        </Creador>
      </form>
    </Cartita>
  );
};

const mapStateToProps = (state) => {
  return {
    types: state.types,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPokemon: (formData) => {
      dispatch(createPokemon(formData));
    },
    getTypes: () => {
      dispatch(getTypes());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewBreedForm);