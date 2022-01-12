export const setSortBuy = ({ type, order }) => ({
  type: 'SET_SORT_BUY',
  payload: { type, order },
});

export const setCategory = (category) => ({
  type: 'SET_CATEGORY',
  payload: category,
});
