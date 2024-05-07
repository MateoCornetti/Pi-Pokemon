import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Cards from '../Cards/Cards';
import { getAllPokemons, setCurrentPage } from '../../redux/actions';

const Pagina = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Cartita = styled.div`
  height: 47em;
  box-shadow: -4px 8px 10px rgba(32, 32, 32, 0.5);
  background-color: #ffffff;
  border-bottom-right-radius: 3em;
  border-bottom-left-radius: 3em;
  border-style: solid;
  border-width: 0px;
  margin-left: 13em;
  margin-right: 13em;
`
const Botonera = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
`
const Boton = styled.button`
  background-color: #ffffff;
  color: #90aa86;
  box-shadow: -4px 8px 10px rgba(32, 32, 32, 0.5);
  border-width: 0px;
  border-style: solid;
  height: 35px;
  width: 90px;
  margin-right: 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: #e8ffdf;
    color: #90aa86;
  };
`
const Separador = styled.div`
  width: 2em;
`

const Home = ({ allCards, currentPage, cardsPerPage, getAllPokemons, setCurrentPage }) => {
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchAllPokemons = useCallback(() => {
    getAllPokemons();
  }, [getAllPokemons]);

  useEffect(() => {
    // Verifica si ya se cargaron los pokemones
    if (!dataLoaded) {
      const delay = 8000; // 10 segundos
  
      const fetchData = async () => {
        await fetchAllPokemons(); // Espera a que se complete la llamada a getAllPokemons()
        const timeout = setTimeout(() => {
          setDataLoaded(true); // Establece dataLoaded en true después de 10 segundos
        }, delay);
        return timeout;
      };
    
      const fetchDataAndSetTimeout = async () => {
        const timeout = await fetchData();
        // Limpia el timeout si el componente se desmonta antes de que se complete
        return () => clearTimeout(timeout);
      };
    
      fetchDataAndSetTimeout();
    }
  }, [fetchAllPokemons, dataLoaded]);

  // Calcula el número total de páginas
  const totalPages = Math.ceil(allCards.length / cardsPerPage);

  // Calcula el índice de inicio y fin de las tarjetas en la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = allCards.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const goToFirstPage = () => {
    handlePageChange(1);
  };

  const goToLastPage = () => {
    handlePageChange(totalPages);
  };

  return (
    <Pagina>
      <Cartita>
        <Cards cards={currentCards} />
      </Cartita>
      <Botonera>
        <Boton
          onClick={goToFirstPage}
          disabled={currentPage === 1}>Inicio
        </Boton>
        <Separador/>
        <Boton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>Anterior
        </Boton>
        <Boton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentCards.length < cardsPerPage}>Siguiente
        </Boton>
        <Separador/>
        <Boton
          onClick={goToLastPage}
          disabled={currentCards.length < cardsPerPage}>Fin
        </Boton>
      </Botonera>
    </Pagina>
  );
};

const mapStateToProps = (state) => ({
  allCards: state.allCards,
  currentPage: state.currentPage,
  cardsPerPage: state.cardsPerPage,
});

const mapDispatchToProps = (dispatch) => ({
  getAllPokemons: () => {
    dispatch(getAllPokemons());
  },
  setCurrentPage: (newPage) => {
    dispatch(setCurrentPage(newPage));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);