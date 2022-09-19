import React from "react";
import Item from "./Item";

function ItemGridList(props) {
  return props.recipes.map((recipe) => {
    return <div style={{ paddingBottom: "16px" }}>
      <Item key={recipe.id} recipe={recipe} />
    </div>
  });
}


export default ItemGridList;







