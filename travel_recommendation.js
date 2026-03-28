const btn = document.querySelector("#search-btn");
btn.disabled = true;

async function loadData() {
    try {
        const response = await fetch("travel_recommendation_api.json");
         const travelData = await response.json();

        btn.disabled = false;
        displayResults(travelData);
    } catch (error) {
        console.log('Error:', error);
    }
}

function displayResults(destinations) {
    document.querySelector("#search-btn").addEventListener("click", () => {
        const input = document.querySelector("input").value;
        const keyword = input.toLowerCase();
    
        if (!destinations) {
            console.log("Data not loaded yet");
            return;
        }
    
        if (keyword.includes("country")){
            console.log(destinations.countries);
        }else if (keyword.includes("beach")){
            console.log(destinations.beaches);
        }else if (keyword.includes("temple")){
            console.log(destinations.temples);
        }else{
            console.log("no results");
        }
     });
    

    console.log("Here is the data:", destinations);
  }  

loadData();

 //clear button logic
 document.querySelector("#clear-btn").addEventListener("click", () => {
    const input = document.querySelector("input");
    input.value = "";
 });

