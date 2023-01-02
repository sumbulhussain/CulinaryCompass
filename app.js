const appId = "17dbda2c";
const appKey = "6c8d9d5c281f4a351b2219cf11a6d755";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#txtSearch");
const btnFind = document.querySelector(".btn");
const loadingEle = document.querySelector("#loading");


btnFind.addEventListener("click", () => loadRecipies(txtSearch.value));

txtSearch.addEventListener("keyup", (e) => {
    const inputVal = txtSearch.value;
    if(e.keyCode === 13) {
    loadRecipies(inputVal);
}
});
const toggleLoad = (element, isShow) =>{
element.classList.toggle("hide", isShow);
}


// const setScrollPosition = () => {
//     recipe.Container.scrollTo({ top: 0, behavior: "smooth" });
// };

function loadRecipies(type = "cake") {
    toggleLoad(loadingEle, false);
    const url = baseUrl + `&q=${type}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
     renderRecipies(data.hits);
      toggleLoad(loadingEle, true);
    })
    .catch((_error) => toggleLoad(loadingEle, true))
}

loadRecipies();

const getRecipeStepsStr = (ingredientLines = []) => {
   let str = " ";
   for (var step of ingredientLines){
    str=str+`<li>${step}</li>`
   } 
   return str;
};

const renderRecipies = (recipeList=[]) => {
    recipeContainer.innerHTML=" "; 
recipeList.forEach((recipeObj) => {
const { 
    label:recipeTitle, 
    ingredientLines, 
    image:recipeImage,
} = recipeObj.recipe;

const recipeStepStr = getRecipeStepsStr(ingredientLines);

const htmlStr = ` <div class="recipe">
        <div class="recipe-title">${recipeTitle}</div>
        <div class="recipe-image"> 
            <img src="${recipeImage}" >
         </div>
        
        <div class="recipe-text">
            <ul>
           ${recipeStepStr}
            </ul>
        </div>

        </div>`;

        //DOM Manipulation
        recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
});
};
