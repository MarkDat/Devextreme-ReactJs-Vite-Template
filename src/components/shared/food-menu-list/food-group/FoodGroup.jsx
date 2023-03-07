import { List } from "devextreme-react";
import { memo } from "react"

import './FoodGroup.scss'

function FoodGroup({ menuGroups, onClickedFoodGroup }) {
    return <>
        <div className="food-group">
            <h3 className="text-center">
                <div className="title-panel title">Nhóm</div>
            </h3>
            <List
                className="group-food-list"
                dataSource={menuGroups}
                height={400}
                focusStateEnabled={true}
                selectionMode={'single'}
                keyExpr={'dish_type_id'}
                displayExpr={'dish_type_name'}
                defaultSelectedItemKeys={[-99]}
                onItemClick={onClickedFoodGroup}>
            </List>
        </div>
    </>
}

export default memo(FoodGroup);
