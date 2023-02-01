import { useContext } from "react";
import OrderContext from "../context/OrdersContext";

const useOrder = () => {
  return useContext(OrderContext);
};

export default useOrder;
