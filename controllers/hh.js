module.exports = db => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const showHomepage = (request, response) => {
    response.render("index");
  };

  const showRegisterPage = (request, response) => {
    response.render("register");
  };

  const registerUser = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    db.hh.registerUser(username, password, (err, result) => {
      if (err) console.log(err);
      else {
        response.redirect("/");
      }
    });
  };

  const showLoginPage = (request, response) => {
    response.render("login");
  };

  const loginUser = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    db.hh.loginUser(username, password, (err, result) => {
      console.log(result);
      if (err) console.log(err);
      else {
        if (result !== null) {
          console.log(result.rows);
          response.cookie("user_ID", result.rows[0].id);
          response.cookie("logged_in", result.rows[0].hashedID);
          response.redirect("/");
        } else {
          response.send("WRONG PASSWROD");
        }
      }
    });
  };

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    showHomepage,
    showRegisterPage,
    registerUser,
    showLoginPage,
    loginUser
  };
};
