const cocktailSearch = () => {
  // Hämta element från DOM
  const searchForm = document.querySelector(".search-form")
  const searchInput = document.querySelector(".search-form__input")
  const resultContainer = document.querySelector(".results")

  const getCocktails = async (searchQuery) => {
    if (!searchQuery) return
    const url = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Response value: ${response.status}`)
      }

      const cocktails = await response.json()

      renderCocktails(cocktails.drinks)
    } catch (error) {
      console.log(error.message)
    }
  }

  const renderCocktails = (cocktails) => {
    if (!cocktails) {
      console.log("No drinks")
      return
    }

    cocktails.forEach((drink) => {
      // Hämtar namn för olika grejer från egenskaperna på objekten i arrayen som skapas
      const drinkName = drink.strDrink
      const drinkThumb = drink.strDrinkThumb
      const drinkInstructions = drink.strInstructions

      const drinkElement = document.createElement("div")
      drinkElement.classList.add("drink")

      const drinkTemplate = `
        <h2>${drinkName}</h2>

        <img src="${drinkThumb}">
        <div>${drinkInstructions}</div>
        
        `

      drinkElement.innerHTML = drinkTemplate

      resultContainer.append(drinkElement)
    })
  }

  const handleSubmit = (event) => {
    // Hindra att sidan laddar om
    event.preventDefault()

    // Hämta värde från inputfältet till ny variabel
    const inputValue = searchInput.value

    // Avbryt funktionen om det inte finns något värde
    if (!inputValue) return

    // Skicka värdet till API-funktionen
    getCocktails(inputValue)

    // Rensa input-fältet
    searchInput.value = ""
  }

  searchForm.addEventListener("submit", handleSubmit)
}

cocktailSearch()
