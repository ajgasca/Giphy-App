
var topics = ["Pan's Labyrinth", "The Dark Knight", "Man of Steel", "Inception", "The Social Network", "Moonrise Kingdom", "Inglorious Basterds", "La La Land", "Guardians of the Galaxy", "Silver Linings Playbook", "Call Me By Your Name", "Looper", "Harry Potter", "Avengers", "Lady Bird", "Stranger Things", "The Good Place", "Friday Night Lights", "This is Us", "The Handmaid's Tale", "The Chilling Adventures of Sabrina", "Brooklyn Nine-Nine"];

function firstButtons() {
$("#buttons").empty();
for (var i = 0; i < topics.length; i++) {
    var gifButton = $("<button>");
    gifButton.html(topics[i]);
    gifButton.addClass("gif-buttons");
    gifButton.attr("value", topics[i]);
    $("#buttons").append(gifButton); 
}
}

firstButtons();

$("#submitButton").on("click", function (event) {
    event.preventDefault();
    if ($("#add-gif").val() === "") {
        return false;
    } else {
    var newButton = $("#add-gif").val().trim();
    topics.push(newButton);
    console.log(topics);
    $("#add-gif").val('');
    firstButtons();
}
})

console.log(topics);

$(document).on("click", ".gif-buttons", function() {

    var gifTopic = $(this).attr("value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifTopic + "&api_key=o68BshT2HQykZ0YREjVBlrG23CAvjH4z&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.addClass("gif");
            gifImage.attr('data-still', results[i].images.fixed_height_still.url);
            gifImage.attr('data-animate', results[i].images.fixed_height.url);
            gifImage.attr('data-state', 'still');

            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            $("#gifs-appear-here").prepend(gifDiv);

            console.log(response);
          }
        });
})

$(document).on("click", ".gif", function() {


    var state = $(this).attr("data-state");

    console.log(this);

    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    }

    if (state === 'animate') {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }

});




