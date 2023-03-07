import { default as FoodGroup } from "./food-group/FoodGroup";
import { default as FoodMenu } from "./food-menu/FoodMenu";
import { default as FoodOrder } from "./food-order/FoodOrder";

function FoodList({foods, menuGroups, onClickedFoodGroup}) {

	return <>
        <div className="row">
                <div className="col-md-3">
                    <FoodGroup menuGroups={menuGroups} onClickedFoodGroup={onClickedFoodGroup}></FoodGroup>
                </div>
                <div className="col-md-6"><FoodMenu foods={foods}></FoodMenu></div>
                <div className="col-md-3"><FoodOrder /></div>
        </div>
	</>
}

export default memo(FoodList);