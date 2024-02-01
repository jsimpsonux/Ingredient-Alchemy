console.log("hello world!")

const apiKey = '4fcf78db28eb4c6cbaaced6e99ff8ab6'
const recipeUrl = 'https://www.bbcgoodfood.com/recipes/poached-eggs-broccoli-tomatoes-wholemeal-flatbread'
const ingredientsList = ['bacon', 'egg']
const ingredientsToReplace = 'sugar'


// Function to search with a recipe and it will tell you if it good for you, with exclusions etc.
const recipeSearch = `https://api.spoonacular.com/recipes/extract?url=${recipeUrl}&apiKey=${apiKey}`

fetch(recipeSearch)
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
})
.catch((error) => {
    console.error('Error:', error);
});

// search an ingredients list and it will return recipes which contain them. ALSO RETURNS MISSING INGREDIENTS FOR A SHOPPING LIST.

const recipeFetch = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&apiKey=${apiKey}`

fetch(recipeFetch)
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
   
})
.catch((error) => {
    console.error('Error:', error);
});

// This one takes an ingredient and offers replacements

const replacementsFetch = `https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${ingredientsToReplace}&apiKey=${apiKey}`

fetch(replacementsFetch)
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
   
})
.catch((error) => {
    console.error('Error:', error);
});


// Example of a very complex search query to see what it can handle.

const userQuery = 'recipes with blueberries'
const cuisine = 'British'
const diet = 'vegetarian'
const includeIngredients = ['sugar','cream']
const excludeIngredients = ['nuts']
const intolerances = 'gluten'

const complexSearch = `https://api.spoonacular.com/recipes/complexSearch?query=${userQuery}&cuisine=${cuisine}&diet=${diet}&includeIngredients=${includeIngredients}&excludeIngredients=${excludeIngredients}&intolerances=${intolerances}&apiKey=${apiKey}`

fetch(complexSearch)
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);
   
})
.catch((error) => {
    console.error('Error:', error);
});
