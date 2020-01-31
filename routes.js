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
  const hhh = require("./controllers/hhh")(allModels);
  app.get("/", hhh.showHomepage);
  app.get("/register", hhh.showRegisterPage);
  app.post("/register", hhh.registerUser);
  app.get("/login", hhh.showLoginPage);
  app.post("/login", hhh.loginUser);
  app.get("/bars/new", hhh.showNewBarForm);
  app.post("/bars", upload.single("barImage"), hhh.submitNewBar);
  app.get("/bars", hhh.showAllBars);
  app.get("/bars/:id", hhh.showBar);
};
