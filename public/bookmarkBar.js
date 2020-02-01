const bookmarkButton = document.querySelector(".fa-bookmark");
const bookmarkHandler = function() {
  const command = JSON.parse(this.responseText).command;
  if (command === "INSERT") {
    bookmarkButton.style.color = "#fbf559";
  } else {
    bookmarkButton.style.color = "white";
  }
};

bookmarkButton.addEventListener("click", () => {
  const bookmarkRequest = new XMLHttpRequest();
  bookmarkRequest.addEventListener("load", bookmarkHandler);
  const favoriteURL = "http://localhost:3000/bars/favorite";
  bookmarkRequest.open("GET", favoriteURL);
  bookmarkRequest.send();
});
