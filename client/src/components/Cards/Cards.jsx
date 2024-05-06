import Card from './Card';
import styled from "styled-components";
import { connect } from 'react-redux';

const Container = styled.div`
   display: flex;
   margin: 3.3em;
   margin-top: 2em;
   justify-content: center;
   flex-wrap: wrap;
`;

function Cards({ allCards, currentPage, cardsPerPage }) {
  if (!Array.isArray(allCards)) {
    return "No hay";
  }

  // Calcula el índice de inicio y fin de las tarjetas en la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = allCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <Container>
      {currentCards.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types.join(' - ')}
        />
      ))}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    allCards: state.allCards,
    currentPage: state.currentPage,
    cardsPerPage: state.cardsPerPage,
  };
};

export default connect(mapStateToProps)(Cards);