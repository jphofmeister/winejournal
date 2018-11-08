import {
  ADD_WINE,
  EDIT_WINE,
  GET_WINES,
  GET_WINE,
  DELETE_WINE,
  WINE_LOADING
} from '../actions/types';

const initialState = {
  wines: [],
  wine: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case WINE_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_WINE:
      return {
        ...state,
        wines: [action.payload, ...state.wines]
      };
    case EDIT_WINE:
      return {
        ...state,
        wine: action.payload
        //wines: [action.payload, ...state.wines] 
      };
    case GET_WINES:
      return {
        ...state,
        wines: action.payload,
        loading: false
      };
    case GET_WINE:
      return {
        ...state,
        wine: action.payload,
        loading: false
      };
    case DELETE_WINE:
      return {
        ...state,
        wines: state.wines.filter(wine => wine._id !== action.payload)
      }
    default:
      return state;
  }
}