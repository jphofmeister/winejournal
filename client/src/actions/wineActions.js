import axios from 'axios';

import {
  //ADD_WINE,
  EDIT_WINE,
  GET_WINE,
  GET_WINES,
  //DELETE_WINE,
  WINE_LOADING,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

//add wine
export const addWine = (wineData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/wine', wineData)
    .then(res =>
      history.push('/dashboard')
      // dispatch({
      //   type: ADD_WINE,
      //   payload: res.data
      // })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//edit wine
export const editWine = (id, updatedWine, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .put(`/api/wine/${id}`, updatedWine)
    .then(res =>
      // history.push(`/wine/${id}`)
      dispatch({
        type: EDIT_WINE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//get wines
export const getWines = () => dispatch => {
  dispatch(setWineLoading());
  axios
    .get('/api/wine')
    .then(res =>
      dispatch({
        type: GET_WINES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WINES,
        payload: null //check why GET_POSTS again
      })
    );
}

//get wine
export const getWine = id => dispatch => {
  dispatch(setWineLoading());
  axios
    .get(`/api/wine/${id}`)
    .then(res =>
      dispatch({
        type: GET_WINE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WINE,
        payload: null
      })
    );
}

//delete wine
export const deleteWine = (id, history) => dispatch => {
  axios
    .delete(`/api/wine/${id}`)
    .then(res =>
      history.push('/dashboard')
      // dispatch({
      //   type: DELETE_WINE,
      //   payload: id
      // })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//set loading state
export const setWineLoading = () => {
  return {
    type: WINE_LOADING
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};