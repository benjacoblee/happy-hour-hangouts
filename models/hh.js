module.exports = dbPoolInstance => {
    let registerUser = (username, password, SALT, callback) => {
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

    return {
        registerUser
    };
};
