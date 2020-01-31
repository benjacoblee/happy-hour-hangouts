const React = require("react");
const Layout = require("./Layout");

class Bar extends React.Component {
  render() {
    const bar = this.props;
    return (
      <Layout>
        <div className="container">
          <h1>{bar.name}</h1>
          <img className="bar-img" src={bar.url}></img>
          <p>Location: {bar.location}</p>
          <p>Happy hour from: {bar.from_time} - {bar.to_time}</p>
          <p>Details: {bar.details}</p>
        </div>
      </Layout>
    );
  }
}

module.exports = Bar;
