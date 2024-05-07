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
  allCards: [], 
  allCardsUnfiltered: [],
  currentPage: 1,
  cardsPerPage: 12,
  filters: 'allP',
  isLoading: false,
  errors: {
    create: {},
  },
};

const filter = (state, action) => {
  // Filtra las razas mostradas segun si son de la base de datos (created) o si son de la api, o si muestra todas (allB)
  let filterBreeds = [...state.allCards];
  if (action.payload === "allB" || action.payload === "created" || action.payload === "api") {
    if (action.payload === "created") filterBreeds = filterBreeds.filter((element) => isNaN(element.id));
    if (action.payload === "api") filterBreeds = filterBreeds.filter((element) => !isNaN(element.id));
    return {
      ...state,
      allCards: filterBreeds,
      filters: { ...state.filters, filters: action.payload },
    };
  } else {
    if (state.filters === "created") filterBreeds = filterBreeds.filter((element) => isNaN(element.id));
    if (state.filters === "api") filterBreeds = filterBreeds.filter((element) => !isNaN(element.id));
    return {
      ...state,
      allCards: filterBreeds,
      filters: { ...state.filters },
    };
  }
};

const filterByType = (state, action) => {
  const { allCards } = state;
  const filteredCards = allCards.filter((pokemon) => {
    return action.payload.every((type) => pokemon.types.includes(type));
  });

  return {
    ...state,
    allCards: filteredCards,
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
    case FILTER:
      if (action.payload === "allP") {
        // Restaura los breeds a la copia no filtrada
        return {
          ...state,
          allCards: [...state.allCardsUnfiltered],
        };
      }
      else if (action.payload === "created") {
        return {
          ...state,
          allCards: [...state.DBCards],
        };
      }
      else if (action.payload === "api") {
        return {
          ...state,
          allCards: [...state.APICards],
        };
      }
      return filter(state, action);
    case FILTER_BY_TYPE:
      console.log(action.payload);
      return filterByType(state, action);
    case SET_ALL_CARDS:
        const {created, api} = action.payload
        if (Array.isArray(created) && Array.isArray(api)) {
          return {
            ...state,
            allCardsUnfiltered: [...api, ...created],
            allCards: [...api, ...created],
            DBCards: [...created],
            APICards: [...api],
            };
        }
        else {
          return {
            ...state,
          }
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
