const Cloudinary = require("cloudinary");
Cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const axios = require("axios");

module.exports = db => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const showHomepage = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;

    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        let data = {};
        if (loggedIn) {
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.setHeader("Access-Control-Allow-Credentials", "true");
          response.setHeader(
            "Access-Control-Allow-Methods",
            "GET,HEAD,OPTIONS,POST,PUT"
          );
          response.setHeader(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
          );
          data.loggedIn = true;
          response.render("index", data);
        } else {
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.setHeader("Access-Control-Allow-Credentials", "true");
          response.setHeader(
            "Access-Control-Allow-Methods",
            "GET,HEAD,OPTIONS,POST,PUT"
          );
          response.setHeader(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
          );
          data.loggedIn = false;
          response.render("index", data);
        }
      }
    );
  };

  const showRegisterPage = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;

    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        if (loggedIn) {
          response.redirect("/");
        } else {
          response.render("register");
        }
      }
    );
  };

  const registerUser = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    db.happyhourhangouts.registerUser(username, password, (err, result) => {
      if (err) {
        const data = {
          errorMessage: `Username may already be taken. Try something more unique, e.g. ${username}${Math.floor(
            Math.random() * 999
          )}`
        };
        response.render("error", data);
      } else {
        response.redirect("/");
      }
    });
  };

  const showLoginPage = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;

    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        if (loggedIn) {
          response.redirect("/");
        } else {
          response.render("login");
        }
      }
    );
  };

  const loginUser = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    db.happyhourhangouts.loginUser(username, password, (err, loginResult) => {
      if (err) console.log(err, "LALALA");
      else {
        if (loginResult !== null) {
          response.cookie("user_ID", loginResult.rows[0].id);
          response.cookie("logged_in", loginResult.rows[0].hashedID);
          response.redirect("/");
        } else if (loginResult === null) {
          const data = {
            errorMessage:
              "Something went wrong! Please check your login details and try again."
          };
          response.render("error", data);
        }
      }
    });
  };

  const showNewBarForm = (request, response) => {
    let data = {};
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;

    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        if (loggedIn) {
          data.loggedIn = true;
          response.render("newbar", data);
        } else {
          data = {
            errorMessage: "Please log in to create a new entry!"
          };
          response.render("error", data);
        }
      }
    );
  };

  const submitNewBar = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;

    const data = {
      barName: request.body.barName,
      barLocation: request.body.barLocation,
      happyHourFrom: request.body.happyHourFrom,
      happyHourTo: request.body.happyHourTo,
      happyHourDays: request.body.happyHourDays,
      happyHourTags: request.body.happyHourTags,
      barDetails: request.body.barDetails
    };

    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        Cloudinary.uploader.upload(request.file.path, uploadResult => {
          if (uploadResult.error) {
            const data = {
              errorMessage:
                "Something went wrong during uploading. Please check your file type or file size.",
              loggedIn: loggedIn
            }; // wrong filetype, too large
            response.render("error", data);
          } else {
            data.url = uploadResult.url;
            data.userID = request.cookies.user_ID;
            db.happyhourhangouts.submitNewBar(data, (err, result) => {
              if (err) response.send(err);
              else response.redirect("/bars");
            });
          }
        });
      }
    );
  };

  const showAllBars = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;

    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        db.happyhourhangouts.showAllBars((err, barsResult) => {
          if (err) {
            const data = {
              errorMessage: "No bars yet!"
            };
            response.render("error", data);
          } else if (err && loggedIn) {
            const data = {
              errorMessage: "No bars yet!",
              loggedIn: loggedIn
            };
            response.render("error", data);
          } else if (loggedIn) {
            const data = {
              bars: barsResult,
              loggedIn: loggedIn
            };
            response.render("allbars", data);
          } else {
            const data = {
              bars: barsResult
            };
            response.render("allbars", data);
          }
        });
      }
    );
  };

  const showBar = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;
    const barID = request.params.id;
    let data = {};
    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        if (loggedIn) {
          data.loggedIn = loggedIn;
        }
      }
    );
    db.happyhourhangouts.getAllComments(barID, (err, commentsResult) => {
      if (err) response.send(err);
      else {
        data.comments = commentsResult;
      }
    });
    db.happyhourhangouts.showBar(barID, (err, result) => {
      if (result === undefined) {
        data.errorMessage = "Couldn't find the bar you were looking for!";
        response.render("error", data);
      } else {
        db.happyhourhangouts.checkIfOwner(userID, barID, (err, isOwner) => {
          if (isOwner === undefined) {
            response.cookie("bar_ID", barID);
            data.bar = result;
            response.render("bar", data);
          } else {
            response.cookie("bar_ID", barID);
            data.bar = result;
            data.isOwner = true;
            response.render("bar", data);
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
    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        if (loggedIn) {
          const barID = request.params.id;
          db.happyhourhangouts.checkIfOwner(userID, barID, (err, isOwner) => {
            if (isOwner === undefined) {
              const data = {
                errorMessage:
                  "You can't edit this post unless you're the owner!",
                loggedIn: loggedIn
              };
              response.render("error", data); // did not find match, not owner
            } else {
              const data = {
                bar: isOwner,
                loggedIn: loggedIn
              };
              response.render("editbar", data);
            }
          });
        } else {
          const data = {
            errorMessage: "Need to be logged in to edit entries!"
          };
          response.render("error", data);
        }
      }
    );
  };

  const editBar = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;
    const data = {
      barName: request.body.barName,
      barLocation: request.body.barLocation,
      happyHourFrom: request.body.happyHourFrom,
      happyHourTo: request.body.happyHourTo,
      happyHourDays: request.body.happyHourDays,
      happyHourTags: request.body.happyHourTags,
      barDetails: request.body.barDetails
    };
    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        Cloudinary.uploader.upload(request.file.path, uploadResult => {
          if (uploadResult.error) {
            const data = {
              errorMessage:
                "Something went wrong during uploading. Please check your file type or file size.",
              loggedIn: loggedIn
            }; // wrong filetype, too large
            response.render("error", data); // wrong filetype, too large
          } else {
            const barID = request.params.id;
            data.url = uploadResult.url;
            data.userID = request.cookies.user_ID;
            db.happyhourhangouts.editBar(data, barID, (err, editResult) => {
              if (err) console.log(err);
              else if (editResult === undefined) {
                console.log("result undefined");
              } else {
                response.redirect("/bars");
              }
            });
          }
        });
      }
    );
  };

  const deleteBar = (request, response) => {
    const barID = request.params.id;
    db.happyhourhangouts.deleteBar(barID, (err, result) => {
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
    db.happyhourhangouts.searchDB(searchQuery, (err, bars) => {
      let data = {};
      if (bars !== null) {
        data.bars = bars;
      }
      db.happyhourhangouts.checkIfLoggedIn(
        userID,
        loginCookies,
        (err, loggedIn) => {
          if (loggedIn) {
            data.loggedIn = loggedIn;
            if (bars !== null) {
              data.searchMessage = `You searched for "${searchQuery}"! Results matching search:`;
              response.render("allbars", data);
            } else {
              data.searchMessage = `You searched for "${searchQuery}"! No matches found!`;
              response.render("allbars", data);
            }
          } else {
            if (bars !== null) {
              data.searchMessage = `You searched for "${searchQuery}"! Results matching search:`;
              response.render("allbars", data);
            } else {
              data.searchMessage = `You searched for "${searchQuery}"! No matches found!`;
              response.render("allbars", data);
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

    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        if (loggedIn) {
          db.happyhourhangouts.postComment(
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
          const data = {
            errorMessage: "Please log in to comment!"
          };
          response.render("error", data);
        }
      }
    );
  };

  const checkFavorite = (request, response) => {
    const userID = request.cookies.user_ID;
    const barID = request.cookies.bar_ID;
    const loginCookies = request.cookies.logged_in;
    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, result) => {
        if (err) console.log(err);
        else {
          db.happyhourhangouts.checkFavorite(userID, barID, (err, result) => {
            response.send(result);
          });
        }
      }
    );
    // db.happyhourhangouts.checkFavorite;
  };

  const addFavorite = (request, response) => {
    const userID = request.cookies.user_ID;
    const barID = request.cookies.bar_ID;
    const loginCookies = request.cookies.logged_in;
    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, result) => {
        if (err) console.log(err);
        else {
          db.happyhourhangouts.addFavorite(userID, barID, (err, result) => {
            response.send(result);
          });
        }
      }
    );
  };

  const showFavorites = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;
    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        if (loggedIn) {
          db.happyhourhangouts.getFavorites(userID, (err, favoritesResult) => {
            const data = {
              bars: favoritesResult,
              loggedIn: loggedIn
            };
            response.render("allbars", data);
          });
        } else {
          const data = {
            errorMessage: "You need to be logged in to view favorites!"
          };
          response.render("error", data);
        }
      }
    );
  };

  const showNoPageError = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;
    const data = {
      errorMessage: "Couldn't find the page you were looking for!"
    };
    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        if (loggedIn) {
          data.loggedIn = loggedIn;
          response.render("error", data);
        } else {
          response.render("error", data);
        }
      }
    );
  };

  const sortBarsByDate = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;
    const type = request.params.type;
    db.happyhourhangouts.sortBarsByDate(type, (err, dateResult) => {
      if (err) response.send(err);
      else {
        db.happyhourhangouts.checkIfLoggedIn(
          userID,
          loginCookies,
          (err, loggedIn) => {
            if (loggedIn) {
              const data = {
                bars: dateResult,
                loggedIn: loggedIn
              };
              response.render("allbars", data);
            } else {
              const data = {
                bars: dateResult
              };
              response.render("allbars", data);
            }
          }
        );
      }
    });
  };

  const getBarsNearby = (request, response) => {
    const userID = request.cookies.user_ID;
    const loginCookies = request.cookies.logged_in;
    let data = {};
    let endpoint =
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+near+me&key=" +
      process.env.places_api_key;

    db.happyhourhangouts.checkIfLoggedIn(
      userID,
      loginCookies,
      (err, loggedIn) => {
        if (loggedIn) {
          data.loggedIn = loggedIn;
        }
      }
    );
    axios
      .get(endpoint)
      .then(barsResponse => {
        console.log(barsResponse.data.results[0].name, "LASLD");
        data.bars = barsResponse.data.results;
        response.render("barsnearby", data);
      })
      .catch(err => {
        console.log(err);
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
    addFavorite,
    showFavorites,
    showNoPageError,
    sortBarsByDate,
    getBarsNearby
  };
};
