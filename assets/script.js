$(document).ready(function() {



    //apiKey 1 = 4fcf78db28eb4c6cbaaced6e99ff8ab6
    //apiKey 2 = c9db4df7f4d4478c9b712d2b7950c4bc
    //apiKey 3 = c0abc7498fa042c0b538fd2e57aecd2c
    //apiKey 4 = 99acb6358dc34668b97f970d4ff5ce65
    //apiKey 5 = b15d9beffca2415da65565e8dbd5ac4d
    //apiKey 6 = 21198f5239fa4edf8b12865546490f26
    //apiKey 7 = 43402bf0e56e46ee954bc7eb44a2de93
    
    const apiKey = '43402bf0e56e46ee954bc7eb44a2de93'
    
    const ingredientsList = JSON.parse(localStorage.getItem("Ingredients")) || [];
    const excludeIngredients = JSON.parse(localStorage.getItem("Excluded Ingredients")) || [];
    let allRecipesArray = []
    let recipeIdsArray = []
    
    
    // Click events for search inputs and clear
    
    for (let i=0; i < ingredientsList.length; i++) {
       var storedIngredient =  $('<p>').text(ingredientsList[i])
       var storedIngredients = $('#ingredient-select').append(storedIngredient);
    }
    
    // Toggle arrow when sections are selected
    
    $('#toggle-arrow').on('click', function() {
        const arrow = this.querySelector('.arrow');
        arrow.classList.toggle('down');
    });
    
    $('#toggle-intol').on('click', function() {
        const arrow = this.querySelector('.arrow');
        arrow.classList.toggle('down');
    });
    
    $('#toggle-diet').on('click', function() {
        const arrow = this.querySelector('.arrow');
        arrow.classList.toggle('down');
    });
    
    // function to empty data from various locations once submitted or reset
    
    function emptyData () {
        $('#ingredient-exclude').empty()
        $('#ingredient-select').empty()
        ingredientsList.length = 0;
        excludeIngredients.length = 0;
        localStorage.clear()
        $('#recipe-container').empty()
    
    }
    
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
    emptyData()
    })
    
    $('input[name="vbtn-radio"]').click(function() {
       
        if ($(this).next().text() === "Any") {
            let cuisineStored = ""
            localStorage.setItem("Cuisine", cuisineStored)
            console.log(cuisineStored)
        } else {
        let cuisineStored = $(this).next().text();
        console.log(cuisineStored)
    localStorage.setItem("Cuisine", cuisineStored) }
    }
    )
    
    $('input[name="vbtn-intol"]').click(function() {
       
        if ($(this).next().text() === "None") {
            let intolerancesStored = ""
            localStorage.setItem("Intolerances", intolerancesStored) 
            console.log(intolerancesStored)
        } else {
        let intolerancesStored = $(this).next().text();
        console.log(intolerancesStored)
    localStorage.setItem("Intolerances", intolerancesStored) }
    }
    )
    
    $('input[name="vbtn-diet"]').click(function() {
       
        if ($(this).next().text() === "None") {
            let dietStored = ""
            localStorage.setItem("Dietary", dietStored) 
            console.log(dietStored)
        } else {
        let dietStored = $(this).next().text();
        console.log(dietStored)
    localStorage.setItem("Dietary", dietStored) }
    }
    )
    
    $('#submit-button').on("click", function (event) {
        event.preventDefault();
        console.log("on click test")
        complexSearch(ingredientsList, excludeIngredients)
        emptyData()
        
    
    })
    
    
    
    // Complex Search function. This returns Recipe IDs and then passes them to the Recipe ID API
    
    function complexSearch (ingredientA, ingredientB, cuisine, diet, intolerances) {
    
    const userQuery = ''
    cuisine = localStorage.getItem("Cuisine") || '';
    diet = localStorage.getItem("Dietary") || '';
    intolerances = localStorage.getItem("Intolerances") || '';
    
    const complexSearch = `https://api.spoonacular.com/recipes/complexSearch?query=${userQuery}&cuisine=${cuisine}&diet=${diet}&includeIngredients=${ingredientsList}&excludeIngredients=${excludeIngredients}&intolerances=${intolerances}&apiKey=${apiKey}`
    
    
    fetch(complexSearch)
    .then((response) => {
        return response.json();
    })
    
    .then((data) => {
        console.log("hello this is a complex test")
        console.log(data);
        console.log(complexSearch)
    
      // Create an Array from the Recipe IDs
    
    
    
        for (let i=0; i < Math.min(data.results.length, 10) ; i++) {
        const complexRecipeId = data.results[i].id
        recipeIdsArray.push(complexRecipeId)
       
        }
        console.log("This is the recipes ID array:" , recipeIdsArray);
    
    // Returned Recipe IDs are pushed into the Recipe by ID endpoint
    
    // recipesList contains every recipe which is returned, all in one array. This can then be used to populate the content.
    
    
    let recipesList = []
    
        for (let i=0; i<recipeIdsArray.length; i++) {
    
            const recipeById = `https://api.spoonacular.com/recipes/${recipeIdsArray[i]}/information?includeNutrition=true&apiKey=${apiKey}`
            
          
    
            fetch(recipeById)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("RecipebyId:" , data);
                let singleRecipe = data
                recipesList.push(singleRecipe)
                console.log("This is the Recipes List:", recipesList)
           
    
    
    //Required ingredients list is created, by looping through each result and grabbing the ingredient.
    
                const requiredIngredients = []
    
                for (let i=0; i < data.extendedIngredients.length; i++) {
                    const ingredientName = data.extendedIngredients[i].originalName
                    requiredIngredients.push(ingredientName)
                   
                } console.log("These are the required ingredients" , requiredIngredients)
            
           // Carousel jQuery content
    
    
let recipeContainer = $('#recipe-container')
    
let cardBody = $('<div>').addClass("card-body")
    
for (let i=0; i < recipesList.length; i++) {
        let recipeTitle = recipesList[i].title
        let recipeImage = recipesList[i].image
        let recipeDescription = `<h4>Description</h4>${recipesList[i].summary}`
        let recipeSourceUrl = recipesList[i].sourceUrl
        let recipePrepTime = recipesList[i].readyInMinutes
        let recipeSourceHtml = `<h5><a href=${recipeSourceUrl}>Click here to view the full recipe.`

            cardBody.html(`<h2>${recipeTitle}</h2><h4>Recipe ready in: ${recipePrepTime} minutes!</h4><img src="${recipeImage}" class="card-img-top c-img" alt="Recipe Image"><p>${recipeDescription}</p>${recipeSourceHtml}<hr>`);
        
            recipeContainer.append(cardBody)
    }
    
    
    // console.log(recipeTitle)
    // $('#recipeTitle').text(recipeTitle)
    // let recipeImage = data.image
    // let recipeImageSrc = `<img src=${recipeImage} class="card-img-top" alt="Recipe Image" id="RecipeImage">`
    // console.log(recipeImage)
    // $('#recipe-image').html(recipeImageSrc)
    
    let ingredientsListHTML = $('<ul>')
    
    
    for (let j=0; j < requiredIngredients.length; j++) {
       let ingredientContent =  requiredIngredients[j]
       let ingredientContentHtml = $('<li>').text(requiredIngredients[j]);
       ingredientsListHTML.append(ingredientContentHtml)
    }
         cardBody.append($('<h4>').text("Required Ingredients:")); 
         cardBody.append(ingredientsListHTML)
    })
            }
    
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
    }
    
    // Quotes Section
    
    let options = {
        method: 'GET',
        headers: {'x-api-key': 'JZC2eZ5nabKsgwRtWJ7g2Q==4IHvpQpIsbsw6hYp'}
      }
    
    const foodQuotationsFetch = 'https://api.api-ninjas.com/v1/quotes?category=food'
    
    fetch(foodQuotationsFetch, options)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Food Quotes" , data)
    
                // Content for the quotation
    let foodQuotation = data[0].quote
    let foodQuotationAuthor = data[0].author
    
    $('#quotation').text(foodQuotation)
    $('#author').text(foodQuotationAuthor)
    
    
    
    console.log(foodQuotation)
           
    })
    
    
    }
    )