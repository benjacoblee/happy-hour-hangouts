const React = require("react");
const Layout = require("./layout");

class BarsNearby extends React.Component {
  render() {
    const bars = this.props.bars;
    const loggedIn = this.props.loggedIn;
    // console.log(bars);
    const barElements = bars.map(bar => {
      let openNow;
      let priceMessage;
      let priceLevel = bar.price_level;
      if (bar.opening_hours !== undefined) {
        openNow = " open now";
      } else {
        openNow = " closed";
      }
      if (priceLevel === undefined) {
        priceMessage = "";
      } else {
        priceMessage = `Price level: ${priceLevel}`;
      }
      let googleMapPath =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURI(bar.formatted_address);
      // console.log(bar.formatted_address);
      return (
        <div>
          <a className="bars-nearby-link" href={googleMapPath} target="_blank">
            <p className="d-inline">
              <img
                className="mr-2"
                src={bar.icon}
                style={{ maxHeight: "20px" }}
              ></img>
              {bar.name}
            </p>
          </a>
          <span class="bars-nearby-open">{openNow}</span>
          <p>
            Rating: {bar.rating} {priceMessage}
          </p>
        </div>
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
