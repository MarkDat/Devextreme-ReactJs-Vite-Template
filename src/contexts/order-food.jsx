import { createContext, useContext } from 'react';


const OrderFoodContext = createContext({});
const useOrderFood = () => useContext(OrderFoodContext);

export {
    OrderFoodContext,
    useOrderFood,
};
