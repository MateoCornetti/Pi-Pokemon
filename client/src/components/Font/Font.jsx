import { createGlobalStyle } from 'styled-components';
import PokemonSolid from './PokemonSolid.ttf'
const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'PokemonSolid';
    src: url(${PokemonSolid}) format('truetype');
  }
`;
export default GlobalStyles;