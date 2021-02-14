

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


            // We need to print the above information on the page within the main container
            // the below is asking the city name to display in text, in a h3 tag. It will display the city name as the API responds it as well as displaying the main date from the variable.
            var cityNameDisplay = $("<h3>").text(response.name);
            var displayMainDate = cityNameDisplay.append(" - " + mainDate);
            // The below all display the API response after the text we ask it to. It will display this within a paragraph as we have asked it to.
            var tempDisplay = $("<p>").text("Temperature: " + response.main.temp + " °C ");
            var humidDisplay = $("<p>").text("Humidity: " + response.main.humidity + " % ");
            var windDisplay = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH ");
            var currentWeather = response.weather[0].main;


            // the below uses if and else statements to determine what the weather is and displays the appropriate symbol
            if (currentWeather === "Rain") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
            }
            else if (currentWeather === "Drizzle") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
            }
            else if (currentWeather === "Clouds") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
            }
            else if (currentWeather === "Clear") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
            }
            else if (currentWeather === "Snow") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/11d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
            }
            else if (currentWeather === "Thunderstorm") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
            }
            else if (currentWeather === "Mist") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/50d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
            }
            //below creates a new div to hold and display all of the above information.
            var newDiv = $('<div>');

            newDiv.append(displayMainDate, currentIcon, tempDisplay, humidDisplay, windDisplay);

            $("#weatherToday").html(newDiv);


            // the below variables are taken from the location API response
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            // The below is for the UV index - we have to call this again using a different API link
            var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=43833fd258805487a99a9cb6665dbbce&lat=" + lat + "&lon=" + lon;



            $.ajax({
                url: queryURLUV,
                method: 'GET'
            }).then(function (response) {
                //    The line below ensures that the field is empty before we enter the requested data
                $('#uvlDisplay').empty();
                var uvResults = response.value;

                var uvDisplay = $("<button class='btn bg-success'>").text("UV Index: " + response.value);

                $('#uvlDisplay').html(uvDisplay);

            });

        });


    // Below is a new function for the the 5 day weather forecast
    // we again need to use AJAX to "GET"(retrieve) data from the queryURL (that we state above) as we will later print this on to the page
    $.ajax({
        url: queryURLforecast,
        method: 'GET'
    }).then(function (response) {
        // We want to store the results in an array so we can retrieve these later on
        var results = response.list;
        //    The line below ensures that the field is empty before we enter the requested data
        $("#fiveDayForecast").empty();
        // We use a loop below to add the results to a list below the search menu.
        // These need to be buttons so we can click on these and retrieve the data
        for (var i = 0; i < results.length; i += 8) {

            var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");

            //Below stores the 
            var date = results[i].dt_txt;
            var setD = date.substr(0, 10)
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;

            //Below will hold the data retrieved from the API
            var h5date = $("<h5 class='card-title'>").text(setD);
            var pTemp = $("<p class='card-text'>").text("Temp: " + temp);;
            var pHum = $("<p class='card-text'>").text("Humidity " + hum);;

            var weather = results[i].weather[0].main

            // Below are our if statements used the show the weather icons
            if (weather === "Rain") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }
            else if (weather === "Clouds") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }
            else if (weather === "Clear") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }
            else if (weather === "Drizzle") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }
            else if (weather === "Snow") {
                var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                icon.attr("style", "height: 40px; width: 40px");
            }

            //we use append to attach the items to the tag in the brackets and display this on the page
            fiveDayDiv.append(h5date);
            fiveDayDiv.append(icon);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            $("#fiveDayForecast").append(fiveDayDiv);
        }

    });

}
pageLoad();

// Below uses the click of the search button to :

$("#searchCity").on("click", function (event) {
    // Preventing the button from submitting the form before we ask it to
    event.preventDefault();
    // storing the city name and removing any additional unused space
    var cityInput = $("#inputCity").val().trim();

    //saving the search item and name to local storage
    var textContent = $(this).siblings("input").val();
    var storearr = [];
    storearr.push(textContent);
    localStorage.setItem('cityName', JSON.stringify(storearr));

    citySearch(cityInput);
    pageLoad();
});

// The function below runs and displays the last location searched for and reloads the search bar and displays it within the previous search div
function pageLoad() {
    var lastSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv)
    $("#prevSearches").prepend(psearch);
}

// The below uses the previous search field to wait for a click on any of the buttons and reloads the data from history
$("#prevSearches").on('click', '.btn', function (event) {
    event.preventDefault();
    console.log($(this).text());
    citySearch($(this).text());

});