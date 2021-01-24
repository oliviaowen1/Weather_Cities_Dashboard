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


            // We need to print the above information on the page within the main container
            // the below is asking the city name to display in text, in a h3 tag. It will display the city name as the API responds it as well as displaying the main date from the variable.
            var cityNameDisplay = $("<h3>").text(response.name);
            var displayMainDate = cityNameDisplay.append(" - " + mainDate);
            // The below all display the API response after the text we ask it to. It will display this within a paragraph as we have asked it to.
            var tempDisplay = $("<p>").text("Temperature: " + response.main.temp);
            var humidDisplay = $("<p>").text("Humidity: " + response.main.humidity);
            var windDisplay = $("<p>").text("Wind Speed: " + response.wind.speed);
            var currentWeather = response.weather[0].main;

            // The below is for the UV index - we have to call this again using a different API link
            var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=43833fd258805487a99a9cb6665dbbce" + lat  + "&lon=" + lon;
            // the below variables are taken from the location API response
            var lat = response.coord.lat;
            var lon = response.coord.lon;


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
            //create HTML div to append new elements to render on page....
            var newDiv = $('<div>');

            newDiv.append(displayMainDate, currentIcon, tempDisplay, humidDisplay, windDisplay);

            $("#weatherToday").html(newDiv);

            //--------------------------------------------- UV call ---------------------------------------//



        });
