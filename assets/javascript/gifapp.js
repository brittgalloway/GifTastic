$(document).ready(function() {
  //array of movie names
  const topicArr = [
    "Spirted Away",
    "Princess Mononoke",
    "Nauscaa",
    "the Cat Returns"
  ];
  let title;
  for (let index = 0; index < topicArr.length; index++) {
    title = topicArr[index];
    //creates buttons from items in the array
    $("#buttons").append(
      "<button data-search=" + title + ">" + title + "</button>"
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
    $.ajax({ url: queryURL, method: "GET" }).done(function(gifs) {
      console.log(gifs);
    });
  });
  //
});
