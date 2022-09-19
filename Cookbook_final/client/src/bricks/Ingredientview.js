import React, {useState, useContext} from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/Card.css";
import FormRecipe from "./FormRecipe";
import UserContext from "../UserProvider";




function Ingredientview(props) {
  const ingredientNames = addIngredients(
      props.recipe.ingredients,
      props.ingredients
  );

  const { isAuthorized } = useContext(UserContext);
 
  const [recipeData, setRecipeData] = useState(props.recipe);

  const callOnComplete = (recipe) => {
    setRecipeData(recipe);
  };

  function addIngredients(ingr, ingredientList) {
    return ingr.map((element) => {
      return {
        id: element.id,
        amount: element.amount,
        unit: element.unit,
        name: ingredientList.find((element0) => element0.id === element.id).name,
      };
    });
  }

  return (
      <div style={{ float: "left" }}>
        <Card className={styles.card}>
        <Card.Title>
        {isAuthorized? (<FormRecipe
          ingredients={props.ingredients}
          recipes={recipeData}
          onComplete={callOnComplete}
        />): ("")}
          {props.recipe.name}
          <div>
            
          </div>
        </Card.Title>
          <Card.Img src={props.recipe.imgUri} />
          
          <Card.Body>
            <Card.Text style={{ textAlign: "left" }}>
              {props.recipe.description.slice(0, 50) + "..."}
            </Card.Text>
            <div>
              <ul>
                {ingredientNames.map((recipe) => {
                  return <li>{recipe.name}</li>;
                })}
              </ul>
            </div>
          </Card.Body>
        </Card>
      </div>
  );
}

export default Ingredientview;
