import { Button, List } from "devextreme-react";
import { useOrderFood } from "@contexts/order-food";

import './FoodOrder.scss';

import {default as FoodOrderInfo} from "./food-order-info/FoodOrderInfo";


function FoodOrder() {
    const [total, setTotal] = useState(0);
    const {orderFoods, setOrderFoods} = useOrderFood();


    useEffect(() => {
        const totalTemp = orderFoods.reduce((a,b) => {
            const price = !b.discount_price ? (b.price.value * b.quantity) ?? 0 : (b.discount_price.value * b.quantity) ?? 0;

            return a + price;
        }, 0);

         setTotal(totalTemp);
    }, [orderFoods]);

    const onClickOrderClear = () => {
        setOrderFoods([]);
    }

    const FoodOrderHeader = () => {
        return <>
            <div className="food-order__header d-flex justify-content-between">
                <h3 className="mt-1">Giỏ hàng</h3>
                <div className="d-flex">
                    <div className="action-btn">
                        {
                            (orderFoods && orderFoods.length > 0) &&
                            <Button className="action-btn__clear" icon="fa-regular fa-trash-undo i-color--accent" onClick={onClickOrderClear}/>
                        }
                    </div>
                    <div className="action-btn ms-1">
                        <Button className="action-btn__order br-color--accent" icon="fa-solid fa-cart-plus i-color--white" />
                    </div>
                </div>
            </div>
        </>
    }

    const FoodOrderFooter = () => {
        return <>
            <div className="food-order__footer d-flex justify-content-between">
                <h4>Tổng:</h4>
                <span className="sum">{(+total).toMoneyString()}đ</span>
            </div>
        </>
    }

    return <>
        <div className="food-order">
            <FoodOrderHeader />
            <List
                className="food-order-list"
                dataSource={orderFoods}
                noDataText={'Hãy chọn món đi!!!'}
                height={250}
                focusStateEnabled={false}
                itemRender={(food) => <FoodOrderInfo food={food} />}>
            </List>
            <FoodOrderFooter />
        </div>
    </>
}

export default memo(FoodOrder);