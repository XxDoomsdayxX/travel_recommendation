const btn = document.querySelector("#search-btn");
btn.disabled = true;

async function loadData() {
    try {
        const response = await fetch("travel_recommendation_api.json");
         const travelData = await response.json();

        btn.disabled = false;
        setupSearch(travelData);
    } catch (error) {
        console.log('Error:', error);
    }
}

function setupSearch(destinations) {
    document.querySelector("#search-btn").addEventListener("click", () => {
        const resultContainer = document.querySelector("#results");
        const input = document.querySelector("input").value;
        const keyword = input.toLowerCase();
    
        if (!destinations) {
            console.log("Data not loaded yet");
            return;
        }

        if (keyword.includes("country")){
            const allCities = destinations.countries.flatMap(country => country.cities);
            displayResults(allCities);
        }else if (keyword.includes("beach")){
            displayResults(destinations.beaches);
        }else if (keyword.includes("temple")){
            displayResults(destinations.temples);
        }else{
            console.log("no results");
        }
     });
  }

  function displayResults(results) {
    if (!results || results.length === 0) {
        return;
    }

    const mainContent = document.querySelector("#main-content");
    const resultContainer = document.querySelector("#results");
    resultContainer.innerHTML = "";
    mainContent.classList.add("hidden");

    results.forEach(result => {
        const card = document.createElement("div");
        card.classList.add("result-card");

        card.innerHTML = `
            <img src="${result.imageUrl}" alt="${result.name}">
            <h3>${result.name}</h3>
            <p>${result.description}</p>
        `;

        resultContainer.appendChild(card);
    });
}

//clear button logic
document.querySelector("#clear-btn").addEventListener("click", () => {
    const mainContent = document.querySelector("#main-content");
    const resultContainer = document.querySelector("#results");
    const input = document.querySelector("input");
    input.value = "";
    resultContainer.innerHTML = "";
    mainContent.classList.remove("hidden");
 });

loadData();

