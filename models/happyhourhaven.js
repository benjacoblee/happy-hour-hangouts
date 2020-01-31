const sha256 = require("js-sha256");
const rand = require("csprng");

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
        console.log(err, result);
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
      data.barDetails,
      data.url,
      data.userID
    ];

    const query = `INSERT INTO bars (name, location, from_time, to_time, details, url, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
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
        console.log("HIHI");
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
      data.barDetails,
      data.url,
      barID
    ];
    const query = `UPDATE bars
    SET name = $1, location = $2, from_time = $3, to_time = $4, details = $5, url = $6
    WHERE id = $7 RETURNING *;`;
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
          result.rows[i].name.toLowerCase().includes(searchQuery.toLowerCase())
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
    searchDB
  };
};
