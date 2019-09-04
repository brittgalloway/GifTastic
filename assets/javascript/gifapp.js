$(function() {
  makeButtons(topicArr, "searchButton", "#buttons");
});

const topicArr = [
  "Spirited Away",
  "Princess Mononoke",
  "Nausicaa",
  "the Cat Returns"
];
function makeButtons(topicArr, classToAdd, areaToAddTo) {
  $(areaToAddTo).empty();
  for (let index = 0; index < topicArr.length; index++) {
    const title = $("<button>");
    title.addClass(classToAdd);
    title.attr("data-type", topicArr[index]);
    title.text(topicArr[index]);
    $(areaToAddTo).append(title);
  }
}
$(document).on("click", ".searchButton", function() {
  const type = $(this).data("type");
  const queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    type +
    "&api_key=4xTnjBJYg6aueD0kdEHtsoUcQ450SVGu&limit=10";
  $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
    for (let i2 = 0; i2 < response.data.length; i2++) {
      const gifWrap = $("<div class='search-item'>");
      const rating = response.data[i2].rating;
      const p = $("<p>").text("Rating: " + rating);
      const animated = response.data[i2].images.fixed_height.url;
      const still = response.data[i2].images.fixed_height_still.url;
      const image = $("<img>");
      image.attr("src", still);
      image.attr("data-still", still);
      image.attr("data-animated", animated);
      image.attr("data-state", "still");
      image.addClass("searchImage");
      gifWrap.append(image);
      gifWrap.append(p);
      $("#images").append(gifWrap);
    }
  });
});

$(document).on("click", ".searchImage", function() {
  let state = $(this).attr("data-state");
  if (state == "still") {
    $(this).attr("src", $(this).data("animated"));
    $(this).attr("data-state", "animated");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
});

$("input").on("click", function(event) {
  event.preventDefault();
  let userAnime = $("input")
    .eq(0)
    .val();
  topicArr.push(userAnime);
  makeButtons(topicArr, "searchButton", "#buttons");
  return false;
});
