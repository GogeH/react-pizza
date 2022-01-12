import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';

import { fetchPizzas } from '../../redux/actions/pizzas';
import { addPizzaToCart } from '../../redux/actions/cart';
import { setCategory, setSortBuy } from '../../redux/actions/filters';
import { Categories, SortPopup, PizzaBlock, PizzaBlockLoading } from '../../components';

const PhantomPizzasQuantity = 12;
const categoriesList = ['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sortPopupList = [
  { name: 'популярности', type: 'popular', order: 'desc'},
  { name: 'цене', type: 'price', order: 'desc'},
  { name: 'алфавиту', type: 'name', order: 'asc'},
];

function Home() {
  const dispatch = useDispatch();

  const items = useSelector( ({ pizzas }) => pizzas.items);
  const cartItems = useSelector( ({ cart }) => cart.items);
  const isLoaded = useSelector( ({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector( ({ filters }) => filters);

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [dispatch, sortBy, category]);

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  }, [dispatch]);

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBuy(type));
  }, [dispatch]);

  const handleAddPizzaToCard = (pizza) => {
    dispatch(addPizzaToCart(pizza))
  }

  return (
    <div className="container">
      <div className="content__top">

        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoriesList}
        />

        <SortPopup
          activeSortType={sortBy.type}
          items={sortPopupList}
          onClickSortType={onSelectSortType}
        />

      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">

        {
          isLoaded
          ?
          items.map((pizza) => (
            <PizzaBlock
              onClickAddPizza={handleAddPizzaToCard}
              key={pizza.id} {...pizza}
              addedCount={cartItems[pizza.id] && cartItems[pizza.id].items.length}
              {...pizza}
            />
          ))
          :
          Array(PhantomPizzasQuantity)
            .fill(0)
            .map((_, index) => <PizzaBlockLoading key={index} />)
        }

      </div>
    </div>
  );
}

export default memo(Home);