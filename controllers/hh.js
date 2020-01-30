const sha256 = require("js-sha256");
const rand = require("csprng");

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
        const SALT = rand(160, 36);
        const password = sha256(SALT + request.body.password);

        db.hh.registerUser(username, password, SALT, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                response.redirect("/");
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
        registerUser
    };
};
