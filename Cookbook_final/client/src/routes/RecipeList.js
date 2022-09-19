import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import ListItem from "../bricks/ListItem";
import styles from "../css/App.module.css";




function RecipeList() {
  const [recipesLoadCall, setRecipesLoadCall] = useState({ state: "pending" });
  const [ingredientsLoadCall, setIngredientsLoadCall] = useState("");
  let [searchParams] = useSearchParams();

  const recipeId = searchParams.get("id");
  const ingredientId = searchParams.get("id");

  const addRecipe = (recipe) => { 
    if (recipesLoadCall.state === "success") {
      
      setRecipesLoadCall({
        state: "success",
        data: [...recipesLoadCall.data, recipe] 
      });
    }
  }
  useEffect(() => {
    fetch("http://localhost:8000/recipe/list", { method: "GET" }).then(
        async (response) => {
          const responseJSON = await response.json();
          if (response.status >= 400) {
            setRecipesLoadCall({ state: "error", error: responseJSON });
          } else {
            setRecipesLoadCall({ state: "success", data: responseJSON });
          }
        }
    );
  }, [[recipeId]]);

  useEffect(() => {
    fetch("http://localhost:8000/ingredient/list", { method: "GET" }).then(
        async (response) => {
          const responseJson = await response.json();
          if (response.status <= 400) {
            setIngredientsLoadCall(responseJson);
          }
        }
    );
  }, [ingredientId]);

  function getChild() {
    switch (recipesLoadCall.state) {
      case "pending":
        return (
            <div>
              <Icon size={2} path={mdiLoading} spin={true} />
              <p>Načítá se</p>
            </div>
        );
      case "success":
        return (
            <div className={styles.app}>

              <ListItem
                  recipes={recipesLoadCall.data}
                  ingredients={ingredientsLoadCall}
                  onComplete={(recipe) => addRecipe(recipe)}
              />
            </div>
        );
      case "error":
        return (
            <div>
              <div>Chyba</div>
              <br />
              <pre>{JSON.stringify(recipesLoadCall.error, null, 2)}</pre>
            </div>
        );
      default:
        return null;
    }
  }

  return getChild();
}

export default RecipeList;

