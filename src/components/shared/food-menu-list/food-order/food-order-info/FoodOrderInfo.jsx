import { useOrderFood } from "@contexts/order-food";
import { truncate } from "@utils/common-functions";
import { Button } from "devextreme-react";
import './FoodOrderInfo.scss';

function FoodOrderInfo({food}) {

	const {orderFoods, setOrderFoods} = useOrderFood();

	const ActionButton = () => {
		return <>
			<div>
				<Button 
					className="food-order-info__btn food-order-info__btn--add" 
					icon="fa-regular fa-plus i-color--white" 
					onClick={onFoodPlus}/>
			</div>

			<div className="quantity pt-1">{food.quantity}</div>
			<div>
				<Button 
					className="food-order-info__btn food-order-info__btn--minus me-1"
					icon="fa-regular fa-minus i-color--white" 
					onClick={onFoodMinus}/>
			</div>
		</>
	}

	const onFoodMinus = () => {
		const orderFood = findOrderFood();
		if(!orderFood)
			return;
		
		setOrderFoods(prev => {
			if(--orderFood.quantity > 0) {
				return [...prev];
			}

			return prev.filter(_ => _.id !== food.id);
		});
	}

	const onFoodPlus = () => {
		const orderFood = findOrderFood();
		setOrderFoods(prev => {
			++orderFood.quantity;

			return [...prev];
		});
	}

	const findOrderFood = () => {
		return orderFoods.find(_ => _.id === food.id);
	}


	return <>
		<div className="food-order-info row">
			<div className="col-md-2">
				<img className="food-order-info__img" alt={`'${food.name}'`} src={food.photos[0].value} />
			</div>
			<div className="col-md-5 p-0">
				<div className='food-order-info__title text-break'>{truncate(food.name, 30)} </div>
			</div>
			<div className="col-md-5 d-flex p-0 gap-1 justify-content-end">
				<ActionButton />
			</div>
		</div>
	</>
}

export default FoodOrderInfo;