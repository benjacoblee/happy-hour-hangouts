const React = require("react");
const Layout = require("./Layout");

class Bar extends React.Component {
  render() {
    const bar = this.props.bar;
    const loggedIn = this.props.loggedIn;
    const googleMapPath =
      "https://www.google.com/maps/search/?api=1&query=" + bar.location;
    return (
      <Layout loggedIn={loggedIn}>
        <div className="container">
          <h1>{bar.name}</h1>
          <img className="bar-img" src={bar.url}></img>
          <p>
            <strong>Location:</strong> {bar.location}{" "}
            <a href={googleMapPath} target="_blank">
              See in Maps
            </a>
          </p>
          <p>
            <strong>Happy hour from:</strong> {bar.from_time} - {bar.to_time}
          </p>
          <p>
            <strong>Details:</strong>
            <br />
            {bar.details}
          </p>
        </div>
      </Layout>
    );
  }
}

module.exports = Bar;
