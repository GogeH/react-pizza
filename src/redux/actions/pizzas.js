import axios from 'axios';

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  dispatch({
    type: 'SET_LOADED_PIZZAS',
    payload: false,
  });
  axios.get(`/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`).then(({ data }) => {
    dispatch(setPizzas(data));
  })
};

export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items,
});

export const setLoaded = (value) => ({
  type: 'SET_LOADED_PIZZAS',
  payload: value,
});
