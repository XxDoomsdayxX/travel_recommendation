async function loadData() {
    try {
        const response = await fetch("travel_recommendation_api.json");
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.log('Error:', error);
    }
}

loadData();