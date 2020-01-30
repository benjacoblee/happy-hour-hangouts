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

  return {
    registerUser,
    loginUser
  };
};
