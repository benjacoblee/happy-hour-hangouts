const Cloudinary = require("cloudinary");
Cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

module.exports = db => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const showHomepage = (request, response) => {
    response.render("Index");
  };

  const showRegisterPage = (request, response) => {
    response.render("Register");
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
    response.render("Login");
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

  const showNewBarForm = (request, response) => {
    response.render("NewBar");
  };

  const submitNewBar = (request, response) => {
    if (request.file !== undefined) {
      Cloudinary.uploader.upload(request.file.path, result => {
        const publicID = result.public_id;
        response.send(result);
      });
    } else {
      console.log(request.body);
    }
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
    loginUser,
    showNewBarForm,
    submitNewBar
  };
};
