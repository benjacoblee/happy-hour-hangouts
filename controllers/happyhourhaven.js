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
        } else if (result === null) {
          response.send("WRONG USERNAME / PASSWORD");
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
      happyHourDays: request.body.happyHourDays,
      happyHourTags: request.body.happyHourTags,
      barDetails: request.body.barDetails
    };
    console.log(data);
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
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;
    const barID = request.params.id;
    let data = {};
    db.happyhourhaven.checkIfLoggedIn(userID, loginCookies, (err, loggedIn) => {
      if (loggedIn) {
        data.loggedIn = loggedIn;
      }
    });
    db.happyhourhaven.getAllComments(barID, (err, result) => {
      data.comments = result;
    });
    db.happyhourhaven.showBar(barID, (err, result) => {
      if (result === undefined) {
        response.send("NO BAR");
      } else {
        db.happyhourhaven.checkIfOwner(userID, barID, (err, isOwner) => {
          if (isOwner === undefined) {
            response.cookie("bar_ID", barID);
            data.bar = result;
            response.render("Bar", data);
          } else {
            response.cookie("bar_ID", barID);
            data.bar = result;
            data.isOwner = true;
            response.render("Bar", data);
          }
        });
      }
    });
  };

  const logoutUser = (request, response) => {
    response.clearCookie("user_ID");
    response.clearCookie("logged_in");
    response.redirect("/");
  };

  const showEditPage = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;
    db.happyhourhaven.checkIfLoggedIn(userID, loginCookies, (err, loggedIn) => {
      if (loggedIn) {
        const barID = request.params.id;
        db.happyhourhaven.checkIfOwner(userID, barID, (err, isOwner) => {
          if (isOwner === undefined) {
            response.send("YOU'RE NOT THE OWNER OF THIS POST"); // did not find match, not owner
          } else {
            const data = {
              bar: isOwner,
              loggedIn: loggedIn
            };
            response.render("EditBar", data);
          }
        });
      } else {
        response.send("NEED TO BE LOGGED IN TO EDIT BAR");
      }
    });
  };

  const editBar = (request, response) => {
    const data = {
      barName: request.body.barName,
      barLocation: request.body.barLocation,
      happyHourFrom: request.body.happyHourFrom,
      happyHourTo: request.body.happyHourTo,
      happyHourDays: request.body.happyHourDays,
      happyHourTags: request.body.happyHourTags,
      barDetails: request.body.barDetails
    };

    Cloudinary.uploader.upload(request.file.path, result => {
      if (result.error) {
        response.send("GOT ERROR"); // wrong filetype, too large
      } else {
        const barID = request.params.id;
        data.url = result.url;
        data.userID = request.cookies.user_ID;
        db.happyhourhaven.editBar(data, barID, (err, result) => {
          if (err) console.log(err);
          else if (result === undefined) {
            console.log("result undefined");
          } else {
            response.redirect("/bars");
          }
        });
      }
    });
  };

  const deleteBar = (request, response) => {
    const barID = request.params.id;
    db.happyhourhaven.deleteBar(barID, (err, result) => {
      if (err) response.send(err);
      else {
        response.redirect("/bars");
      }
    });
  };

  const searchDB = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;
    const searchQuery = request.query.search;
    db.happyhourhaven.searchDB(searchQuery, (err, bars) => {
      let data = {};
      if (bars !== null) {
        data.bars = bars;
      }
      db.happyhourhaven.checkIfLoggedIn(
        userID,
        loginCookies,
        (err, loggedIn) => {
          if (loggedIn) {
            data.loggedIn = loggedIn;
            if (bars !== null) {
              data.searchMessage = `You searched for "${searchQuery}"! Results matching search:`;
              response.render("AllBars", data);
            } else {
              data.searchMessage = `You searched for "${searchQuery}"! No matches found!`;
              response.render("AllBars", data);
            }
          } else {
            if (bars !== null) {
              data.searchMessage = `You searched for "${searchQuery}"! Results matching search:`;
              response.render("AllBars", data);
            } else {
              data.searchMessage = `You searched for "${searchQuery}"! No matches found!`;
              response.render("AllBars", data);
            }
          }
        }
      );
    });
  };

  const postComment = (request, response) => {
    const userID = request.cookies.user_ID;
    const barID = request.params.id;
    const loginCookies = request.cookies.logged_in;
    const comment = request.body.comment;

    db.happyhourhaven.checkIfLoggedIn(userID, loginCookies, (err, loggedIn) => {
      if (loggedIn) {
        db.happyhourhaven.postComment(
          comment,
          userID,
          barID,
          (err, comments) => {
            if (err) response.send(err);
            else {
              response.redirect("/bars/" + barID);
            }
          }
        );
      } else {
        response.send("PLEASE LOGING OT COMMENT");
      }
    });
  };

  const checkFavorite = (request, response) => {
    const userID = request.cookies.user_ID;
    const barID = request.cookies.bar_ID;
    const loginCookies = request.cookies.logged_in;
    db.happyhourhaven.checkIfLoggedIn(userID, loginCookies, (err, result) => {
      if (err) console.log(err);
      else {
        db.happyhourhaven.checkFavorite(userID, barID, (err, result) => {
          response.send(result);
        });
      }
    });
    // db.happyhourhaven.checkFavorite;
  };

  const addFavorite = (request, response) => {
    const userID = request.cookies.user_ID;
    const barID = request.cookies.bar_ID;
    const loginCookies = request.cookies.logged_in;
    db.happyhourhaven.checkIfLoggedIn(userID, loginCookies, (err, result) => {
      if (err) console.log(err);
      else {
        db.happyhourhaven.addFavorite(userID, barID, (err, result) => {
          console.log(err, result);
          response.send(result);
          // response.send(result);
        });
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
    loginUser,
    showNewBarForm,
    submitNewBar,
    showAllBars,
    showBar,
    logoutUser,
    showEditPage,
    editBar,
    deleteBar,
    searchDB,
    postComment,
    checkFavorite,
    addFavorite
  };
};
