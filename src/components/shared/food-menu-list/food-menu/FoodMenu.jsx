import { List } from "devextreme-react";
import { memo } from "react";
import FoodInfo from "./food-info/FoodInfo";

import './FoodMenu.scss';

function FoodMenu({foods}) {
    return <>
        <List
            className="food-menu-list"
            dataSource={foods}
            height={500}
            focusStateEnabled={false}
            searchEnabled={true}
            searchExpr={"name"}
            itemRender={(food) => <FoodInfo food={food} />}>
        </List>
    </>
}

export default memo(FoodMenu);