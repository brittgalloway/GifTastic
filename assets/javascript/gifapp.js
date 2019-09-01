$(document).ready(function() {
  //array of movie names
  const topicArr = [
    "Spirted Away",
    "Princess Mononoke",
    "Nausicaa",
    "the Cat Returns"
  ];

  let title = "";
  //for loop for movie titles I THINK THE ERROR IS HERE
  for (let index = 0; index < topicArr.length; index++) {
    title = topicArr[index];
    //creates buttons from items in the array
    $("#buttons").append(
      "<button data-type=" + title + ">" + title + "</button>"
    );

    console.log($("button"));
  }
  //on click function

  $("#buttons").on("click", function() {
    //link to giphy and write query(limit 10)
    const queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      title +
      "&api_key=4xTnjBJYg6aueD0kdEHtsoUcQ450SVGu&limit=10";
    console.log(title);
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
              "<img src=" + results[ratings].images.fixed_height.url + ">"
            );
            //adds p amd movieGif to the gifWrap div
            gifWrap.append(p);
            gifWrap.append(movieGif);
            //adds gifwrap to the page
            $("#images").append(gifWrap);
          }
        }
      });
  });
});
