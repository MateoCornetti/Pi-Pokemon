import styled from "styled-components";
import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Cartita = styled.div`
    display: flex;
    margin-top: 0em;
    box-shadow: -4px 8px 10px rgba(32, 32, 32, 0.3);
    background-color: #ffffff;
    border-bottom-right-radius: 3em;
    border-bottom-left-radius: 3em;
    border-style: solid;
    border-width: 0px;
    border-top-width: 0px;
    margin-left: 13em;
    margin-right: 13em;
`
const DivA = styled.div `
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    position: absolute;
    right: 15%;
`
const Img = styled.img `
    border-width: 0px;
    border-style: solid;
    width: 40em;
    height: 40em;
`
const DivB = styled.div `
    background-color: #fff8d7;
    border-style: solid;
    border-width: 0px;
    border-radius: 3em;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin: 5em;
    padding: 2em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`
const Title = styled.div `
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #808080;
    font-size: 4em;
    max-width: 10em;
`
const Types = styled.div `
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #808080;
    padding-top: 1em;
    font-size: 2.5em;
`
const Content = styled.div `
display: flex;
flex-direction: column;
align-items: flex-start;
    padding-top: 1em;
    justify-content: flex-start;
`
const Text = styled.div `
    color: #808080;
    font-size: 2em;
    padding-top: 10px;
`
const CenterDiv = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Hp = styled.div `
    background-color: #45f07e;
    width: 15em;
    height: 0.5em;
    border-radius: 5px;
`

export const Detail = () => {
    const { id } = useParams();
    const [pokemonDetail, setPokemonDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const defaultImg = '/images/default.jpg';

    useEffect(()=> {
      axios(`http://localhost:3001/pokemon/id/${id}`).then(({data}) => {
        console.log("Data recibida:", data); 
        if(data) { // Verificar si hay datos recibidos
          setPokemonDetail(data); // Establecer pokemonDetail con los datos recibidos
        } else {
          window.alert('No hay pokemones con ese ID');
          console.log(data);
        }
        setLoading(false);
      })
    }, [id]);

    if (loading) {
      return <Cartita>
        <Types>Cargando...</Types>
      </Cartita>;
    }

    return (
      <Cartita>
          <DivB>
            <CenterDiv>
              <Title>{pokemonDetail.name}</Title>
              <Text>HP: {pokemonDetail.hp} / {pokemonDetail.hp} PS</Text>
              <Hp></Hp>
              <Types>{pokemonDetail.types && pokemonDetail.types.join(" - ")}</Types>
            </CenterDiv>     
          <Content>
              <Text>Attack: {pokemonDetail.attack}</Text>
              <Text>Defense: {pokemonDetail.defense}</Text>
              <Text>Speed: {pokemonDetail.speed}</Text>
              <Text>Weight: {pokemonDetail.weight} kg</Text>
              <Text>Height: {pokemonDetail.height} m</Text>
          </Content>  
          </DivB>
          <DivA>
              <Img src={pokemonDetail.image || defaultImg}/>
          </DivA>
      </Cartita>
    );
  }
  
  export default Detail;