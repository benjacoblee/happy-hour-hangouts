const React = require("react");
const Layout = require("./layout");

class Register extends React.Component {
    render() {
        return (
            <Layout>
                <div className="container">
                    <h1 className="text-center display-1">Register</h1>
                    <form action="/register" method="POST">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </Layout>
        );
    }
}

module.exports = Register;
