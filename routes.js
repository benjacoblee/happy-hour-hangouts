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
  const hh = require("./controllers/hh")(allModels);
  app.get("/", hh.showHomepage);
  app.get("/register", hh.showRegisterPage);
  app.post("/register", hh.registerUser);
  app.get("/login", hh.showLoginPage);
  app.post("/login", hh.loginUser);
  app.get("/bars/new", hh.showNewBarForm);
  app.post("/bars", upload.single("barImage"), hh.submitNewBar);
  app.get("/bars", hh.showAllBars);
};
