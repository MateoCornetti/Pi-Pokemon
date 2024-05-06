import {
  SEARCH_POKEMON,
  SET_ALL_CARDS,
  SET_CURRENT_PAGE,
  CREATE_POKEMON,
  FILTER,
  FILTER_BY_TYPE,
  ORDER,
  SET_ALL_TYPES,
} from "./actions";

const initialState = {
  types: [],
  APICards: [],
  DBCards: [],
  allCards: [], // Mantén todos los pokemones aquí
  filteredCards: [], // Mantén los pokemones filtrados aquí
  currentPage: 1,
  cardsPerPage: 12,
  filters: 'allP',
  isLoading: false,
  errors: {
    create: {},
  },
};

const filter = (state, action) => {
  let filteredCards = [];
  if (action.payload === "allP") {
    filteredCards = [...state.allCardsUnfiltered];
  } else if (action.payload === "created") {
    filteredCards = [...state.createdCards];
  } else if (action.payload === "api") {
    filteredCards = [...state.apiCards];
  } else {
    return state;
  }
  return {
    ...state,
    allCards: filteredCards,
    filters: { ...state.filters, filters: action.payload },
  };
  
};

const filterByType = (state, action) => {
  console.log(action.payload);
  const { allCards } = state; // Usa allCards en lugar de filteredCards
  const typesCards = allCards.filter((pokemon) => {
    return pokemon.types.includes(action.payload);
  });

  return {
    ...state,
    filteredCards: typesCards, // Actualiza filteredCards en lugar de allCards
  };
};

const orderBy = (arr, property, order) => {
  return [
    ...arr.sort((a, b) => {
      const valueA = typeof a[property] === 'string' ? a[property].split(/ - /).pop() : a[property];
      const valueB = typeof b[property] === 'string' ? b[property].split(/ - /).pop() : b[property];
      if (valueA > valueB) return order === "asc" ? 1 : -1;
      if (valueA < valueB) return order === "asc" ? -1 : 1;
      return 0;
    }),
  ];
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_CARDS:
      const { created, api } = action.payload;
      if (Array.isArray(created) && Array.isArray(api)) {
        return {
          ...state,
          allCardsUnfiltered: [...api, ...created],
          createdCards: [...created],
          apiCards: [...api],
        };
      } else {
        return state;
      }
    case SEARCH_POKEMON:
      if (action.payload === "allB") {
        return {
          ...state,
          allCards: [...state.allCardsUnfiltered],
        };
      } else {
        return {
          ...state,
          allCards: [
            ...state.allCards.filter((element) =>
              element.name.toString().toLowerCase().includes(action.payload.toString().toLowerCase())
            ),
          ],
        };
      }
    case CREATE_POKEMON:
      if (action.payload.status === 400) {
        return {
          ...state,
          errors: {
            ...state.errors,
            create: action.payload,
          },
        };
      }
      break;
    case FILTER:
      return filter(state, action);
    case FILTER_BY_TYPE:
      console.log(action.payload);
      return filterByType(state, action);
    case ORDER:
      return {
        ...state,
        allCards: orderBy(state.allCards, action.payload.slice(0, -3), action.payload.slice(-3)),
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
  