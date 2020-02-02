const sha256 = require("js-sha256");
const rand = require("csprng");
const moment = require("moment");
moment().format();

module.exports = dbPoolInstance => {
  const registerUser = (username, password, callback) => {
    const SALT = rand(160, 36);
    password = sha256(SALT + password);
    const values = [username, password, SALT];
    const query =
      "INSERT INTO users (username, password, salt) VALUES ($1, $2, $3) RETURNING *";
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) callback(err, null);
      else {
        callback(err, result);
      }
    });
  };

  const loginUser = (username, password, callback) => {
    const values = [username];
    const saltQuery = "SELECT * from users where username = $1";
    dbPoolInstance.query(saltQuery, values, (err, result) => {
      if (err) console.log(err);
      else if (result.rows[0] === undefined) {
        callback(err, null);
      } else {
        const SALT = result.rows[0].salt;
        const dbPassword = result.rows[0].password;
        if (sha256(SALT + password) === dbPassword) {
          const userID = result.rows[0].id;
          const hashedID = sha256(SALT + userID);
          result.rows[0].hashedID = hashedID;
          callback(err, result);
        } else {
          callback(err, null);
        }
      }
    });
  };

  const submitNewBar = (data, callback) => {
    const values = [
      data.barName,
      data.barLocation,
      data.happyHourFrom,
      data.happyHourTo,
      data.happyHourDays,
      data.happyHourTags,
      data.barDetails,
      data.url,
      data.userID
    ];

    const query = `INSERT INTO bars (name, location, from_time, to_time, days, tags, details, url, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) callback(err, null);
      else {
        callback(err, result);
      }
    });
  };

  const showAllBars = callback => {
    const query = "SELECT * from bars;";
    dbPoolInstance.query(query, (err, result) => {
      if (err) callback(err, null);
      else {
        callback(err, result.rows);
      }
    });
  };

  const showNewBarForm = (userID, loginCookies, callback) => {
    checkIfLoggedIn(userID, loginCookies, callback);
  };

  const checkIfLoggedIn = (userID, loginCookies, callback) => {
    let verified;
    const values = [userID];
    const query = "SELECT * from users where ID = $1";
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) callback(err, null);
      else if (result.rows[0] === undefined) {
        callback(err, null);
      } else {
        const SALT = result.rows[0].salt;
        const dbID = result.rows[0].id;
        const hashedID = sha256(SALT + dbID);
        if (hashedID === loginCookies) {
          verified = true;
          callback(err, verified);
        } else {
          verified = false;
          callback(err, verified);
        }
      }
    });
  };

  const showBar = (barID, callback) => {
    const values = [barID];
    const query = "SELECT * from bars where id = $1";
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) callback(err, null);
      else if (result.rows[0] === undefined) {
        callback(err, result.rows[0]); // no such bar in database
      } else {
        callback(err, result.rows[0]);
      }
    });
  };

  const checkIfOwner = (userID, barID, callback) => {
    const values = [barID, userID];
    const query = "SELECT * from bars where id = $1 AND user_id = $2";
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) callback(err, null);
      else if (result.rows[0] === undefined) {
        callback(err, result.rows[0]);
      } else {
        callback(err, result.rows[0]);
      }
    });
  };

  const editBar = (data, barID, callback) => {
    const values = [
      data.barName,
      data.barLocation,
      data.happyHourFrom,
      data.happyHourTo,
      data.happyHourDays,
      data.happyHourTags,
      data.barDetails,
      data.url,
      barID
    ];
    const query = `UPDATE bars
    SET name = $1, location = $2, from_time = $3, to_time = $4, days = $5, tags = $6, details = $7, url = $8
    WHERE id = $9 RETURNING *;`;
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) console.log(err);
      else if (result.rows[0] === undefined) {
        callback(err, result.rows[0]);
      } else {
        callback(err, result.rows[0]);
      }
    });
  };

  const deleteBar = (barID, callback) => {
    const values = [barID];
    const query = "DELETE from bars where id = $1 returning *";
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) callback(err, null);
      else {
        callback(err, result);
      }
    });
  };

  const searchDB = (searchQuery, callback) => {
    const matches = [];
    let matchFound;
    const query = "SELECT * from bars";
    dbPoolInstance.query(query, (err, result) => {
      for (let i = 0; i < result.rows.length; i++) {
        if (
          result.rows[i].name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          result.rows[i].tags.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          matchFound = true;
          matches.push(result.rows[i]);
        }
      }
      if (matchFound) {
        callback(err, matches);
      } else {
        callback(err, null);
      }
    });
  };

  const postComment = (comment, userID, barID, callback) => {
    const values = [
      comment,
      moment().format("YYYY-MM-DD HH:mm:ss"),
      userID,
      barID
    ];
    const commentQuery = `INSERT INTO users_comments (comment, date, user_id, bar_id) VALUES ($1, $2, $3, $4) returning *`;
    dbPoolInstance.query(commentQuery, values, (err, postResult) => {
      if (err) console.log(err);
      else console.log(postResult);
      const value = [barID];
      const getAllComments = `SELECT * from users
      INNER JOIN users_comments
      ON (users_comments.user_id = users.id)
      WHERE users_comments.bar_id = $1`;
      dbPoolInstance.query(getAllComments, value, (err, result) => {
        if (err) console.log(err);
        callback(err, result.rows);
      });
    });
  };

  const getAllComments = (barID, callback) => {
    const values = [barID];
    const query = `SELECT * FROM users
      INNER JOIN users_comments
      ON (users_comments.user_id = users.id)
      WHERE users_comments.bar_id = $1`;
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) console.log(err);
      else {
        callback(err, result.rows);
      }
    });
  };

  const checkFavorite = (userID, barID, callback) => {
    const values = [userID, barID];
    const query = "SELECT * from favorites where user_id = $1 AND bar_id = $2";
    dbPoolInstance.query(query, values, (err, result) => {
      if (err) console.log(err);
      else if (result.rows[0] === undefined) {
        callback(err, null);
      } else {
        callback(err, result.rows[0]);
      }
    });
  };

  const addFavorite = (userID, barID, callback) => {
    const values = [userID, barID];
    const insertQuery =
      "INSERT into favorites (user_id, bar_id) VALUES ($1, $2) returning *";
    dbPoolInstance.query(insertQuery, values, (err, result) => {
      if (err) {
        const deleteQuery =
          "DELETE from favorites where user_id = $1 AND bar_id = $2";
        dbPoolInstance.query(deleteQuery, values, (err, result) => {
          if (err) callback("ERROR DELETEING", null);
          else {
            callback("delete", result);
          }
        });
      } else {
        callback("insert", result);
      }
    });
  };

  const getFavorites = (userID, callback) => {
    const values = [userID];
    const favoritesQuery = `SELECT bars.id as id, bars.url as url, bars.name as name
    FROM bars
    INNER JOIN favorites
    on (favorites.bar_id = bars.id)
    WHERE favorites.user_id = $1`;
    dbPoolInstance.query(favoritesQuery, values, (err, result) => {
      if (err) console.log(err);
      else if (result.rows[0] === undefined) {
        callback(err, result.rows);
      } else {
        callback(err, result.rows);
      }
    });
  };

  return {
    registerUser,
    loginUser,
    submitNewBar,
    showAllBars,
    showNewBarForm,
    showBar,
    checkIfLoggedIn,
    checkIfOwner,
    editBar,
    deleteBar,
    searchDB,
    postComment,
    getAllComments,
    checkFavorite,
    addFavorite,
    getFavorites
  };
};
