$(document).ready(function() {
  //loads orignal buttons for the array
  $(function() {
    makeButtons(topicArr, "searchButton", "#buttons");
  });
  //array of movies
  const topicArr = [
    "Spirited Away",
    "Princess Mononoke",
    "Nausicaa",
    "the Cat Returns"
  ];
  //function making buttons from the array
  function makeButtons(topicArr, classToAdd, areaToAddTo) {
    //prvents copies of the buttons from being made
    $(areaToAddTo).empty();
    //looping through the array
    for (let index = 0; index < topicArr.length; index++) {
      //making a button
      const title = $("<button>");
      //adding a class
      title.addClass(classToAdd);
      //adding the indexed string as the data-type
      title.attr("data-type", topicArr[index]);
      //display indexed string on button
      title.text(topicArr[index]);
      //adds button to areaToAddTo
      $(areaToAddTo).append(title);
    }
  }
  //what happens when the button is clicked
  $(document).on("click", ".searchButton", function() {
    //gives this the data("type")
    const type = $(this).data("type");
    //query using type in for the search, limit 10 gifs
    const queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      type +
      "&api_key=4xTnjBJYg6aueD0kdEHtsoUcQ450SVGu&limit=10";
    //ajax request
    $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
      //looping through 10 responses
      for (let i2 = 0; i2 < response.data.length; i2++) {
        //creating a class "search-item"
        const gifWrap = $("<div class='search-item'>");
        //rating on gif
        const rating = response.data[i2].rating;
        //display rating in a <p>
        const p = $("<p>").text("Rating: " + rating);
        //animated gif url
        const animated = response.data[i2].images.fixed_height.url;
        //still gif url
        const still = response.data[i2].images.fixed_height_still.url;
        //created <img>
        const image = $("<img>");
        //adding attributes for still gifs
        image.attr("src", still);
        image.attr("data-still", still);
        //adding attributes for animated gifs
        image.attr("data-animated", animated);
        //setting data-state to still
        image.attr("data-state", "still");
        //adding .searchImage to each image
        image.addClass("searchImage");
        //put image in gifwrap
        gifWrap.append(image);
        //put p in gifwrap
        gifWrap.append(p);
        //displaying image and rating
        $("#images").append(gifWrap);
      }
    });
  });
  //function to switch state of displayed gifs
  $(document).on("click", ".searchImage", function() {
    //defines state of image
    let state = $(this).attr("data-state");
    //if state is still on click
    if (state == "still") {
      //switch to animated state
      $(this).attr("src", $(this).data("animated"));
      $(this).attr("data-state", "animated");
    } else {
      //switch to still state
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    }
  });
  //when a user clicks add button
  $("#add-user").on("click", function() {
    //read input
    let userAnime = $("input")
      .eq(0)
      .val()
      .trim();
    //push to array
    topicArr.push(userAnime);
    //make a button
    makeButtons(topicArr, "searchButton", "#buttons");
    //?? not actually sure why this is needed, but doens't work when true
    return false;
  });
});
