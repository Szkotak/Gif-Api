var subjectsArr = ["sea", "pirate", "fruit", "future", "world", "tesla", "fluffy"];
function renderButtons() {
  $("#buttonPanel").empty();
  for (var i = 0; i < subjectsArr.length; i++) {
    var button = $("<button>");
    button.addClass("subjectButton");
    button.attr("data-subject", subjectsArr[i]);
    button.text(subjectsArr[i]);
    $("#buttonPanel").append(button);
  }
}
$("#add-subject").on("click", function(event) {
  event.preventDefault();
  var subject = $("#subject-input").val().trim();
  subjectsArr.push(subject);
  $("#subject-input").val("");
  renderButtons();
});
function fetchsubjectGifs() {
  var subjectName = $(this).attr("data-subject");
  var subjectStr = subjectName.split(" ").join("+");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subjectStr + 
                 "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    var dataArray = result.data;
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("subjectGif");
      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);
      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);
      $("#gifPanel").append(newDiv);
    }
  });
}
function animatesubjectGif() {
  var state = $(this).find("img").attr("data-state");
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}
$(document).ready(function() {
  renderButtons();
});
$(document).on("click", ".subjectButton", fetchsubjectGifs);
$(document).on("click", ".subjectGif", animatesubjectGif);