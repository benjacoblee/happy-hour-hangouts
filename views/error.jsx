const React = require("react");
const Layout = require("./Layout");

class Error extends React.Component {
  render() {
    const loggedIn = this.props.loggedIn;
    const errorMessage = (
      <h2 className="error-message">{this.props.errorMessage}</h2>
    );
    return (
      <Layout loggedIn={loggedIn}>
        <div className="container">{errorMessage}</div>
      </Layout>
    );
  }
}

module.exports = Error;
