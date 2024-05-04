const queryString = window.location.search;
const urlParams = new urlParams(queryString);
const searchQuery = urlParams.get("search");

document.getElementById("productSearch").innerHTML = "<p>Showing results : ${searchQuery}</p>";