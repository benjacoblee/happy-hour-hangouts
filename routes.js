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
};
