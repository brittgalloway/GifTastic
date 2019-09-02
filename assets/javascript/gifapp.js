$(document).ready(function() {
  //array of movie names
  let topicArr = [
    "Spirited Away",
    "Princess Mononoke",
    "Nausicaa",
    "the Cat Returns"
  ];

  //for loop for movie titles , scope issue
  function makeButtons() {
    $("#buttons").empty();
    for (let index = 0; index < topicArr.length; index++) {
      //creates buttons from items in the array
      const title = $("<button>");
      title.attr("data-name", topicArr[index]);
      title.text(topicArr[index]);
      $("#buttons").append(title);
    }
  }

  //user input buttons function

  //on click function to add new buttons
  $("#add-anime").on("click", function(event) {
    event.preventDefault();
    let movie = $("#anime-input")
      .val()
      .trim();
    topicArr.push(movie);
    makeButtons();
  });
  makeButtons();

  //on click function for gif buttons
  console.log(topicArr);
  $("button").on("click", function() {
    const topic = $(this).data("name");
    //link to giphy and write query(limit 10)
    const queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      //only uses last title in array
      topic +
      "&api_key=4xTnjBJYg6aueD0kdEHtsoUcQ450SVGu&limit=10";
    console.log(topic);
    //ajax to get gifs from giphy
    $.ajax({ url: queryURL, method: "GET" })
      .done(function(gifs) {
        console.log(gifs);
      })
      //wait for response from ajax method
      .then(function(response) {
        //variable for data of response
        const results = response.data;
        //for loop to go through the gifs and matching ratings
        for (let ratings = 0; ratings < results.length; ratings++) {
          if (
            //conditional to only show sfw gifs based on ratings
            results[ratings].rating !== "r" &&
            results[ratings].rating !== "pg-13"
          ) {
            //variable for the rating of a specific gif
            let rating = results[ratings].rating;
            //created a div
            let gifWrap = $("<div>");
            //created a <p> to display the rating
            let p = $("<p>").text("Rating: " + rating);
            //made a varialbe for the <img> being made per gif
            let movieGif = $(
              "<img src=" +
                results[ratings].images.fixed_height_still.url +
                "data-state='still'" +
                "data-still=" +
                "src=" +
                results[ratings].images.fixed_height_still.url +
                "data-animate=" +
                "src=" +
                results[ratings].images.fixed_height.url +
                ">"
            );
            //adds p amd movieGif to the gifWrap div
            gifWrap.append(movieGif);
            gifWrap.append(p);
            //adds gifwrap to the page
            $("#images").prepend(gifWrap);
          }
        }
      });
  });

  //currently, data state changes, but images do not
  $("#images").on("click", function() {
    const state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});
