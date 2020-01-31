const React = require("react");
const Layout = require("./Layout");

class Bar extends React.Component {
  render() {
    let deleteButton;
    let isOwner = this.props.isOwner;
    const bar = this.props.bar;
    const loggedIn = this.props.loggedIn;
    const googleMapPath =
      "https://www.google.com/maps/search/?api=1&query=" + bar.location;
    if (isOwner) {
      const deletePath = "/bars/" + bar.id + "?_method=delete";
      deleteButton = (
        <form className="mb-3" action={deletePath} method="POST">
          <input
            className="btn btn-danger"
            type="submit"
            value="Delete"
          ></input>
        </form>
      );
    }
    return (
      <Layout loggedIn={loggedIn}>
        <div className="container">
          <h1>{bar.name}</h1>
          <img className="bar-img" src={bar.url}></img>
          <div className="mt-2">
            <p>
              <strong>Location:</strong> {bar.location}{" "}
              <a className="map-link ml-2" href={googleMapPath} target="_blank">
                Open in Maps
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
            {deleteButton}
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Bar;
