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
      else {
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

  return {
    registerUser,
    loginUser,
    submitNewBar,
    showAllBars
  };
};
