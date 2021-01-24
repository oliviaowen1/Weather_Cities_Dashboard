// using moment.js this will allow us to display the current date
// moment().format('LL');

// the below function will let us search for a place and retrieve the info from the website using the api key
function citySearch(cityName) {

    // The below takes the websites API along with the user input for city name to search for an areas data
    // We have included metric units as this is what the UK uses
    // the top link will use todays weather, whereas the second link will use the forecast.
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=43833fd258805487a99a9cb6665dbbce";
    var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=43833fd258805487a99a9cb6665dbbce";

    // below states we want to use AJAX to "GET"(retrieve) data from the queryURL (that we state above) as we will later print this on to the page
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    // The .then function means that the following function will not run until the above has been carried out.
    // In this case meaning it wont carry out the function until the data has loaded from the API requested
    .then(function (response) {
        console.log(response);
        console.log(queryURL);
        //    The line below ensures that the field is empty before we enter the requested data
        $("#weatherToday").empty();
        // using moment.js this will allow us to display the current date
        var mainDate = moment().format('LL');


       