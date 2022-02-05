export const initialState = {
  basket: [],
};

export const actionTypes = {
  ADD_TO_BASKET: "ADD_TO_BASKET",
  DELETE_TO_ITEM: "DELETE_TO_ITEM",
  EMPTY_BASKET: "EMPTY_BASKET",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "DELETE_TO_ITEM":
      const index = state.basket.filter(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.log("item eliminado");
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: action.basket,
      };
    default:
      return state;
  }
};
export default reducer;
