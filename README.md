# Ingredient Alchemy Project

## Description

This application is designed to be used as a Recipe Finder. The user can construct a complex search based on a variety of criteria, including:
* Ingredients to Include
* Ingredients to Exclude
* Dietary Requirements
* Intolerances
* Cuisines

This uses local storage to store the data and then supply it to the API when the fetch occurs. The API then retrieves all of the relevant recipe information and returns it in a recipe format.

There is also a Food Quote at the top of the page, which randomises a quotation relating to food.

**APIs Included:**

* Spoonacular: Complex Search Endpoint
* Spoonacular: Recipe by ID Endpoint
* API Ninja: Quote API

## Installation

To review the quiz, please follow this URL: https://jsimpsonux.github.io/Ingredient-Alchemy/. The code is available to be cloned from the Ingredient-Alchemy repository, using git commands. To access this, please follow this URL: https://github.com/jsimpsonux/Ingredient-Alchemy

## Usage

This application is intuitive to use and functions as follows:

**Recipe Finder**
* Select ingredient & Exclusions with the respective inputs and submit with the + icon
  * You can add more than one of each if desired
* Select Additional criteria by using the radio buttons.
  * You can only select one from each category: Cuisine, Diet, Intolerances
* When you are happy with your criteria, press submit and your recipes will be loaded.
* If you repeat this process, your recipe list will grow, with new recipes appearing at the top of the list.
* You can use the refresh button to empty your selections, and refresh the entire page to delete all stored recipes.

**Quote Randomiser**
This API randomly selects a food based quote every time the page is refreshed. To see a new quote, simply refresh the page.

