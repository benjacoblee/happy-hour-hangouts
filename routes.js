module.exports = (app, allModels, upload) => {
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
  const happyhourhangouts = require("./controllers/happyhourhangouts")(
    allModels
  );
  app.get("/", happyhourhangouts.showHomepage);
  app.get("/register", happyhourhangouts.showRegisterPage);
  app.post("/register", happyhourhangouts.registerUser);
  app.get("/login", happyhourhangouts.showLoginPage);
  app.post("/login", happyhourhangouts.loginUser);
  app.get("/bars/nearby", happyhourhangouts.getBarsNearby);
  app.get("/bars/new", happyhourhangouts.showNewBarForm);
  app.post("/bars", upload.single("barImage"), happyhourhangouts.submitNewBar);
  app.get("/bars", happyhourhangouts.showAllBars);
  app.get("/bars/sort/:type", happyhourhangouts.sortBarsByDate);
  app.get("/bars/favorites", happyhourhangouts.showFavorites);
  app.get("/bars/favorite", happyhourhangouts.addFavorite);
  app.get("/bars/checkfavorite", happyhourhangouts.checkFavorite);
  app.get("/bars/:id", happyhourhangouts.showBar);
  app.get("/logout", happyhourhangouts.logoutUser);
  app.get("/bars/:id/edit", happyhourhangouts.showEditPage);
  app.put("/bars/:id", upload.single("barImage"), happyhourhangouts.editBar);
  app.delete("/bars/:id", happyhourhangouts.deleteBar);
  app.get("/search", happyhourhangouts.searchDB);
  app.post("/bars/:id/comment", happyhourhangouts.postComment);
  app.get("*", happyhourhangouts.showNoPageError);
};
