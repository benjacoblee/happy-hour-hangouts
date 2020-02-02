var multer = require("multer");
var upload = multer({ dest: "uploads/" });

module.exports = (app, allModels) => {
  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const happyhourhaven = require("./controllers/happyhourhaven")(allModels);
  app.get("/", happyhourhaven.showHomepage);
  app.get("/register", happyhourhaven.showRegisterPage);
  app.post("/register", happyhourhaven.registerUser);
  app.get("/login", happyhourhaven.showLoginPage);
  app.post("/login", happyhourhaven.loginUser);
  app.get("/bars/new", happyhourhaven.showNewBarForm);
  app.post("/bars", upload.single("barImage"), happyhourhaven.submitNewBar);
  app.get("/bars", happyhourhaven.showAllBars);
  app.get("/bars/favorites", happyhourhaven.showFavorites);
  app.get("/bars/favorite", happyhourhaven.addFavorite);
  app.get("/bars/checkfavorite", happyhourhaven.checkFavorite);
  app.get("/bars/:id", happyhourhaven.showBar);
  app.get("/logout", happyhourhaven.logoutUser);
  app.get("/bars/:id/edit", happyhourhaven.showEditPage);
  app.put("/bars/:id", upload.single("barImage"), happyhourhaven.editBar);
  app.delete("/bars/:id", happyhourhaven.deleteBar);
  app.get("/search", happyhourhaven.searchDB);
  app.post("/bars/:id/comment", happyhourhaven.postComment);
  app.get("*", happyhourhaven.showNoPageError);
};
