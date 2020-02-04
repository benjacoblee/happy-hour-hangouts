const React = require("react");
const Layout = require("./layout");

class BarsNearby extends React.Component {
  render() {
    const bars = this.props.bars;
    const loggedIn = this.props.loggedIn;
    console.log(loggedIn);
    const barElements = bars.map(bar => {
      let googleMapPath =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURI(bar.formatted_address);
      console.log(bar.formatted_address);
      return (
        <a href={googleMapPath} target="_blank">
          <p>{bar.name}</p>
        </a>
      );
    });
    return (
      <Layout loggedIn={loggedIn}>
        <div className="container">{barElements}</div>
      </Layout>
    );
  }
}

module.exports = BarsNearby;
