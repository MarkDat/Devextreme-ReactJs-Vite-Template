
import { truncate } from '@utils/common-functions';
import { Button } from 'devextreme-react';
import './FoodInfo.scss';

import {useOrderFood} from '@contexts/order-food';
import { memo } from 'react';

function FoodInfo({food}) {

    const {orderFoods, setOrderFoods} = useOrderFood();

    const OverButton = () => {
        return <div className='btn-over'>Hết hàng</div>;
    };

    const AddButton = () => {
        return <>
            <Button className='btn-add' icon='fa-sharp fa-solid fa-plus i-color--white' onClick={onClickedAddFood}/>
        </>;
    }

    const Price = () => {

        if(!!food.discount_price) {
            return <>
            <div className='price mt-1'>{(+food.discount_price.value).toMoneyString()}<span className='price__unit'>đ</span></div>
            <div className='cost'>{(+food.price.value).toMoneyString()}<span className='cost__unit'>đ</span></div>
        </>
        }

        return <>
            <div className='price mt-1'>{(+food.price.value).toMoneyString()}<span className='price__unit'>đ</span></div>
        </>
    }

    const onClickedAddFood = () => {
        const foodExisted = findFoodInCart();

        if(!foodExisted) {
            food.quantity = 1;
            setOrderFoods(prev => [...prev, food]);

            return;
        }

        setOrderFoods(prev => {
            ++foodExisted.quantity;
            
            return [...prev];
        });
    }

    const findFoodInCart = () => {
        return orderFoods.find((e) => e.id === food.id);
    }

    return <>
        <div className="food-info row">
            <div className="col-md-2">
                <img className="food-info__img" alt={`'${food.name}'`} src={food.photos[0].value} />
            </div>
            <div className="col-md-6">
                <div className='food-info__title text-break'>{truncate(food.name, 30)} </div>
                <div className='food-info__desc text-break'>{truncate(food.description, 50)} </div>
            </div>
            <div className="col-md-4 d-flex justify-content-end">
                <div className='food-info__money me-2'>
                    <Price />
                </div>
                <div className='food-info__add-button'>
                    {food.is_available ? <AddButton /> : <OverButton />}
                </div>
            </div>
        </div>
    </>
}

export default memo(FoodInfo);