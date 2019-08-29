$(document).ready(function() {
  //array of movie names
  const topicArr = [
    "spirted away",
    "princess mononoke",
    "Nauscaa",
    "the cat returns"
  ];
  const title;
  for (let index = 0; index < topicArr.length; index++) {
     title = topicArr[index];
  }
  //link to giphy and write query(limit 10)
  const queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    title +
    "&api_key=4xTnjBJYg6aueD0kdEHtsoUcQ450SVGu&limit=10";

    //ajax
    
  //make buttons from the array

  //
});
