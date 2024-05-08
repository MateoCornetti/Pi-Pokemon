import styled from "styled-components"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { filterPokemons, orderPokemons, searchPokemon, getTypes, filterPokemonsByType } from "../../redux/actions"
import { connect } from "react-redux"

const Fondo = styled.div`
   display: flex;
   justify-content: space-between;
   align-content: center;
   background-color: #ffffff;
   height: 8em;
   box-shadow: -4px 8px 10px rgba(32, 32, 32, 0.3);
   border-style: solid;
   border-width: 0px;
   border-top-width: 0px;
   border-bottom-width: 0px;
   padding-top: 0em;
   padding-right: 0.5em;
   padding-bottom: 1em;
   margin-left: 13em;
   margin-right: 13em;
`
const Selector = styled.select`
  font-size: 16px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  height: 6em;
  width: 6em;
  border-radius: 0.5em;
  border-width: 0em;
  padding-left: 0.5em;
  box-shadow: -2px 2px 10px rgba(32, 32, 32, 0.5);
`;
const Cabecera = styled.div`
   justify-content: start;
   padding-top: 1em;
`
const BotonTitulo = styled.button`
   padding-bottom: 50px;
   background-color: transparent;
   border-width: 0em;
   font-family: 'PokemonSolid';
   color: #214094;
   height: 0.5em;
   width: 6em;
   font-size: 3em;
   cursor: pointer;
`
const Botonera = styled.div`
   align-items: center;
   left: 60%;
`
const Botones = styled.button`
   background-color: #e8ffdf;
   color: #90aa86;
   box-shadow: -2px 2px 10px rgba(32, 32, 32, 0.5);
   border-width: 0px;
   border-style: solid;
   height: 50px;
   width: 4em;
   margin-top: 45px;
   margin-right: 1em;
   border-radius: 2em;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   font-size: 22px;
   cursor: pointer;
   &:hover {
      box-shadow: -1px 1px 5px rgba(32, 32, 32, 0.5);
      background-color: #90aa86;
      color: #e8ffdf;
   };
`
const Botones3 = styled.button`
   background-color: #e8ffdf;
   color: #90aa86;
   box-shadow: -2px 2px 10px rgba(32, 32, 32, 0.5);
   border-width: 0px;
   border-style: solid;
   height: 40px;
   width: 70px;
   margin: 5px;
   border-radius: 2em;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   font-size: 14px;
   cursor: pointer;
   &:hover {
      box-shadow: -1px 1px 5px rgba(32, 32, 32, 0.5);
      background-color: #90aa86;
      color: #e8ffdf;
   };
`

const Texto = styled.div`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   color: #214094;
   font-size: 20px;
`
const Filtros = styled.div`
   display: flex;
   flex-direction: column;
   margin-top: 1px;
   align-items: center;
`
const FiltrosA = styled.div`
   display: flex;
   flex-direction: row;
   margin: 5px;
   justify-content: center;
   align-items: center;
`
const FiltrosB = styled.div`
   display: flex;
   margin-top: 5px;
   justify-content: center;
   align-items: center;
`
const Botones2 = styled.button`
   background-color: #e8ffdf;
   color: #90aa86;
   box-shadow: -2px 2px 10px rgba(32, 32, 32, 0.5);
   border-width: 0px;
   border-style: solid;
   height: 25px;
   width: 70px;
   margin: 5px;
   border-radius: 2em;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   font-size: 14px;
   cursor: pointer;
   &:hover {
      box-shadow: -1px 1px 5px rgba(32, 32, 32, 0.5);
      background-color: #90aa86;
      color: #e8ffdf;
   };
`
const Busqueda = styled.input`
   background-color: #e9e9e9;
   font-size: 22px;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   height: 50px;
   width: 300px;   
   margin: 5px;
   margin-top: 15px;
   border-radius: 2em;
   border-width: 0em;
   padding-right: 2em;
   padding-left: 2em;
   box-shadow: -2px 2px 10px rgba(32, 32, 32, 0.5);
`
const Buscador = styled.div`
   display: flex;
`
function Nav ({ filterPokemons, orderPokemons, types, searchPokemon, getTypes, filterPokemonsByType }) {
   const [filter, setFilter] = useState("");
   const [search, setSearch] = useState("");
   const [select, setSelect] = useState([]);
   const [searchTxt, setSearchTxt] = useState([])
   const [typesLoaded, setTypesLoaded] = useState(false); 

   useEffect(() => {
      if (!types.length) {
        getTypes();
      } else {
        console.log(types);
        setTypesLoaded(true);
      }
    }, [types, typesLoaded, getTypes]);
  
    const handleChangeTypes = (e) => {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setSelect(selectedOptions);
      filterPokemonsByType(selectedOptions);
   };

   // Esto maneja la busqueda para que realize la busqueda al solo escribir, sin tener que tocar un boton
   useEffect(() => {   
      if (search) searchPokemon(search);
   }, [search, setSearch, filter, setFilter, types, searchPokemon]);

   const handleChange = (event) => {
      switch (event.target.id) {
         case "inputSearch":
           setSearchTxt(event.target.value);
           if (event.target.value === "") filterPokemons("allP");
           break;
         default:
           break;
       }
   };

   // basicamente lo que te dice es que hagas todo igual pero que cuando se actualice el state "search" no dispares una action para cambiar
   // la lista de pokemons, sino que la dispares con handleSearch que es lo que va a tener el botón de search 

   const handleSearch = () => {
      setSearch(searchTxt)
      console.log("Performing search:", search);
    };

   const onFilter = (event) => {
      const filterId = event.target.id;
      if (filterId === "reset") {
         // Si el botón de reset es clicado, resetea el filtro por tipo
         setSelect([]);
         filterPokemons("allP");
      } else {
         filterPokemons(filterId);
      }
   };
   const onSort = (event) => {
      orderPokemons(event.target.id);
   };

   return (
      <nav>
         <Fondo>
            <Cabecera>
            <Link to={'/Home'}><BotonTitulo>PoketDex!</BotonTitulo></Link>
            </Cabecera>
            <Botonera>
               <Filtros>
                  <Texto>Sort Pokemons by</Texto>
                  <Filtros>
                     <FiltrosB>
                     <Botones3 id="nameasc" onClick={onSort}>Name ↑↑</Botones3>
                     <Botones3 id="namedes" onClick={onSort}>Name ↓↓</Botones3> 
                     </FiltrosB>
                     <FiltrosB>
                     <Botones3 id="attackasc" onClick={onSort}>Attack ↑↑</Botones3>                    
                     <Botones3 id="attackdes" onClick={onSort}>Attack ↓↓</Botones3>
                     </FiltrosB>                
                  </Filtros>
               </Filtros>
               </Botonera>
               <Botonera>
               <Filtros>
                  <Texto>Filter Pokemons</Texto>
                  <FiltrosA>
                  <FiltrosA>            
                     <Selector
                        name="type"
                        value={select}
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
                     <Botones2 id="allP" onClick={onFilter}>Reset</Botones2>
                     </FiltrosA> 
                     <Filtros>
                     <Botones2 id="created" onClick={onFilter}>Created</Botones2>                    
                     <Botones2 id="api" onClick={onFilter}>API</Botones2>
                     <Botones2 id="allP" onClick={onFilter}>All</Botones2>
                     </Filtros>              
                  </FiltrosA>
               </Filtros>
               </Botonera>
               <Botonera>
               <Buscador>
               <Filtros>
                  <Texto>Search Poke</Texto>
                        <Busqueda 
                        type="text"
                        placeholder="..."
                        id="inputSearch"
                        autoComplete="off"
                        value={searchTxt || ""}
                        onChange={handleChange}
                         />
                        <Botones2 onClick={handleSearch}>Search</Botones2>
               </Filtros>
               </Buscador>
               </Botonera> 
            <Botonera>
              <Link to={'/Form'}><Botones>New</Botones></Link>
            </Botonera>
         </Fondo>
      </nav>
   );
}

const mapStateToProps = (state) => {
   return {
     types: state.types,
   };
 };
 const mapDispatchToProps = (dispatch) => {
   return {
     filterPokemons: (status) => {
       dispatch(filterPokemons(status));
     },
     getTypes: (status) => {
      dispatch(getTypes(status))
     },
     orderPokemons: (order) => {
       dispatch(orderPokemons(order));
     },
     searchPokemon: (pokemon) => {
       dispatch(searchPokemon(pokemon));
     },
     filterPokemonsByType: (types) => {
       dispatch(filterPokemonsByType(types));
     },
   };
 };
 

export default connect(mapStateToProps, mapDispatchToProps)(Nav);