import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ItemGridList from "./ItemGridList";
import IngredientMap from "./IngredientMap";

function ItemChange(props) {
  const [viewType, setViewType] = useState("");
  const isChange = viewType === "++";

  function changeView() {
    if (isChange) {
      setViewType("");
    } else {
      setViewType("++");
    }
  }

  return (
    <div>
      <div className="container-fluid">
        <Button variant="outline-primary" onClick={changeView}>
          {isChange ? "Ingredience" : "Bez ingrediencí"}
        </Button>
      </div>

      {isChange ? (
        <ItemGridList recipes={props.recipes} />
      ) : (
        <IngredientMap
          recipes={props.recipes}
          ingredients={props.ingredients}
        />
      )}
    </div>
  );
}

export default ItemChange;
