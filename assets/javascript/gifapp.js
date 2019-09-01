$(document).ready(function() {
  //array of movie names
  const topicArr = [
    "Spirted Away",
    "Princess Mononoke",
    "Nausicaa",
    "the Cat Returns"
  ];

  let title = "";
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
    var person = $(this).attr("data-type");
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
      .then(function(response) {
        const results = response.data;
        for (let ratings = 0; ratings < results.length; ratings++) {
          if (
            results[ratings].rating !== "r" &&
            results[ratings].rating !== "pg-13"
          ) {
            let rating = results[ratings].rating;
            let gifWrap = $("<div>");
            let p = $("<p>").text("Rating: " + rating);
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
