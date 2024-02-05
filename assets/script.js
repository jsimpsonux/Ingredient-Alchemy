$(document).ready(function() {


//apiKey 1 = 4fcf78db28eb4c6cbaaced6e99ff8ab6
//apiKey 2 = c9db4df7f4d4478c9b712d2b7950c4bc
//apiKey 3 = c0abc7498fa042c0b538fd2e57aecd2c

const apiKey = 'c0abc7498fa042c0b538fd2e57aecd2c'

const ingredientsList = JSON.parse(localStorage.getItem("Ingredients")) || [];
const excludeIngredients = JSON.parse(localStorage.getItem("Excluded Ingredients")) || [];

// Click events for search inputs and clear

$('#select-button').on("click", function(event) {
    event.preventDefault();
    console.log("Hello World!")
    var ingredientText = $('#select-ingredient').val()
    var ingredientList = $('<p>').text(ingredientText);
$('#ingredient-select').append(ingredientList)
ingredientsList.push(ingredientText)
localStorage.setItem("Ingredients", JSON.stringify(ingredientsList))
console.log(ingredientsList)
})

$('#exclude-button').on("click", function(event) {
    event.preventDefault();
    console.log("Hello World!")
    var excludeIngredientText = $('#exclude-ingredients').val()
    var exclusionsList = $('<p>').text(excludeIngredientText);
$('#ingredient-exclude').append(exclusionsList);
excludeIngredients.push(excludeIngredientText);
localStorage.setItem("Excluded Ingredients", JSON.stringify(excludeIngredients))
console.log(excludeIngredients)
})


$('#empty-selections').on("click", function(event) {
event.preventDefault();
console.log("Hello worlds!")
$('#ingredient-exclude').empty()
$('#ingredient-select').empty()
ingredientsList.length = 0;
excludeIngredients.length = 0;
})

$('#submit-button').on("click", function (event) {
    event.preventDefault();
    complexSearch()
})


// search an ingredients list and it will return recipes which contain them. ALSO RETURNS MISSING INGREDIENTS FOR A SHOPPING LIST.



const recipeFetch = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&apiKey=${apiKey}`

fetch(recipeFetch)
.then((response) => {
    return response.json();
})
.then((data) => {
    // console.log(data);

    for (let i=0; i < data.length; i++) {
    
    const recipe = data[i]
    const missingIngredientNames = recipe.missedIngredients.map(ingredient => ingredient.originalName);

    // console.log(missingIngredientNames)
    }
})
.catch((error) => {
    console.error('Error:', error);

  

});




// // Example of a very complex search query to see what it can handle.
function complexSearch (ingredient) {

const userQuery = ''
const cuisine = ''
const diet = ''
const intolerances = ''

const complexSearch = `https://api.spoonacular.com/recipes/complexSearch?query=${userQuery}&cuisine=${cuisine}&diet=${diet}&includeIngredients=${ingredientsList}&excludeIngredients=${excludeIngredients}&intolerances=${intolerances}&apiKey=${apiKey}`

fetch(complexSearch)
.then((response) => {
    return response.json();
})
.then((data) => {
    console.log(data);

const recipeID = data.results[0].id
console.log(recipeID)
const recipeTitle = data.results[0].title
console.log(recipeTitle)
const recipeImage = data.results[0].image
console.log(recipeImage)
   
})
.catch((error) => {
    console.error('Error:', error);
});

}
}
)









// Function to search with a recipe and it will tell you if it good for you, with exclusions etc.
// 
//const recipeUrl = 'https://www.bbcgoodfood.com/recipes/poached-eggs-broccoli-tomatoes-wholemeal-flatbread'
// const recipeSearch = `https://api.spoonacular.com/recipes/extract?url=${recipeUrl}&apiKey=${apiKey}`

// fetch(recipeSearch)
// .then((response) => {
//     return response.json();
// })
// .then((data) => {
//     console.log(data);
// })
// .catch((error) => {
//     console.error('Error:', error);
