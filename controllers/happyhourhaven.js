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
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;

    db.happyhourhaven.checkIfLoggedIn(userID, loginCookies, (err, loggedIn) => {
      let data = {};
      if (loggedIn) {
        data.loggedIn = true;
        response.render("Index", data);
      } else {
        data.loggedIn = false;
        response.render("Index", data);
      }
    });
  };

  const showRegisterPage = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;

    db.happyhourhaven.checkIfLoggedIn(userID, loginCookies, (err, loggedIn) => {
      if (loggedIn) {
        response.redirect("/");
      } else {
        response.render("Register");
      }
    });
  };

  const registerUser = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    db.happyhourhaven.registerUser(username, password, (err, result) => {
      if (err) console.log(err);
      else {
        response.redirect("/");
      }
    });
  };

  const showLoginPage = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;

    db.happyhourhaven.checkIfLoggedIn(userID, loginCookies, (err, loggedIn) => {
      if (loggedIn) {
        response.redirect("/");
      } else {
        response.render("Login");
      }
    });
  };

  const loginUser = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    db.happyhourhaven.loginUser(username, password, (err, result) => {
      // console.log(result);
      if (err) console.log(err);
      else {
        if (result !== null) {
          // console.log(result.rows);
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
    let data = {};
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;
    db.happyhourhaven.checkIfLoggedIn(userID, loginCookies, (err, loggedIn) => {
      if (loggedIn) {
        data.loggedIn = true;
        response.render("NewBar", data);
      } else {
        response.send("must be logged in to make bar!!");
      }
    });
  };

  const submitNewBar = (request, response) => {
    const data = {
      barName: request.body.barName,
      barLocation: request.body.barLocation,
      happyHourFrom: request.body.happyHourFrom,
      happyHourTo: request.body.happyHourTo,
      barDetails: request.body.barDetails
    };

    Cloudinary.uploader.upload(request.file.path, result => {
      console.log(result);
      if (result.error) {
        response.send("GOT ERROR"); // wrong filetype, too large
      } else {
        console.log(result);
        data.url = result.url;
        data.userID = request.cookies.user_ID;
        db.happyhourhaven.submitNewBar(data, (err, result) => {
          if (err) response.send(err);
          else response.redirect("/");
        });
      }
    });
  };

  const showAllBars = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;

    db.happyhourhaven.showAllBars((err, result) => {
      if (err) response.send(err);
      else {
        db.happyhourhaven.checkIfLoggedIn(
          userID,
          loginCookies,
          (err, loggedIn) => {
            if (loggedIn) {
              const data = {
                bars: result,
                loggedIn: loggedIn
              };
              response.render("AllBars", data);
            } else {
              const data = {
                bars: result
              };
              response.render("AllBars", data);
            }
          }
        );
      }
    });
  };

  const showBar = (request, response) => {
    const barID = request.params.id;
    db.happyhourhaven.showBar(barID, (err, result) => {
      if (result === undefined) {
        response.send("NO BAR");
      } else {
        response.render("Bar", result);
      }
    });
  };

  const logoutUser = (request, response) => {
    response.clearCookie("user_ID");
    response.clearCookie("logged_in");
    response.redirect("/");
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
    submitNewBar,
    showAllBars,
    showBar,
    logoutUser
  };
};
