import styled from "styled-components"
import { Link } from "react-router-dom";

const Carta = styled.div `
   background-color: transparent;
   color: #808080;
   font-size: 0.7em;
   border-radius: 1em;
   border-style: solid;
   border-width: 0px;
   height: 15em;
   width: 16em;
   margin-left: 2em;
   margin-right: 2em;
   margin-top: 8em;
   margin-bottom: 8em;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   transition: 0.3s ease;
   &:hover {
      transform: scale(1.1);
   }
`
const ImgContainer = styled.div`
  border-radius: 40em;
  border-width: 1em;
  border-style: solid;
  border-color: #e9e9e9;
  box-shadow: -4px 4px 15px rgba(32, 32, 32, 0.5);
  width: 15em;
  height: 15em;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(1);
  }

  &:hover {
    img {
      filter: brightness(0.3);
    }
  }
`
const ImgYNom = styled.div`
   position: relative;
   text-align: center;
   cursor: pointer;

   h2 {
   color: #808080;
   font-size: 2em;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   margin-right: 1em;
   margin-left: 1em;
   margin-top: 10px;
   border-width: 0px;
   background-color: transparent;
   }
   &:hover {
      h2 {
         background-color: #e8ffdf;
         border-radius: 10px;
         color: #90aa86;
      }
      .overlay {
         display: block;
      }
      ${ImgContainer} img {
         background-color: #808080;
         filter: brightness(0.2);
      }
   }
   // Este overlay tiene los datos de Types del pokemon para que se vean al pasar el mouse por encima del componente
   .overlay {
      display: none;
      position: absolute;
      top: 40%;
      left: 55%;
      transform: translate(-50%, -50%);  
      width: 10em;
      color: #ffffff;
      font-size: 2em;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      text-align: center;
   }
`

function Card({name, id, image, types}) {

   // Asignamos una imagen por si no tiene imagen y determinamos que si el nombre tiene mas de 30 caracteres muestre los primeros 30 caracteres y le añada puntos suspensivos 
   const defaultImg = "../images/default.jpg"
   const maxCaracteres = 30;
   const textoTruncado = name.length > maxCaracteres ? name.slice(0, maxCaracteres) + '...' : name;

   return (
      <div className={styled.container}> 
      <Link to={`/Detail/${id}`} style={{ textDecoration: 'none' }}>
      <Carta>
         <ImgYNom>
            <ImgContainer>
              <img src={image || defaultImg} alt=""/>
            </ImgContainer>
            <h2>{textoTruncado}</h2>
            <div className="overlay">
              <p>{types}</p>
            </div>
         </ImgYNom>        
      </Carta>
      </Link>  
      </div>

   );
}

export default Card;