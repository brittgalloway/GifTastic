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
    $("#buttons").append("<button>" + title + "</button>");
  }
  //link to giphy and write query(limit 10)
  const queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    title +
    "&api_key=4xTnjBJYg6aueD0kdEHtsoUcQ450SVGu&limit=10";

  //ajax
  $.ajax({ url: queryURL, method: "GET" }).done(function(gifs) {
    console.log(gifs);
  });
  //make buttons from the array

  //
});
