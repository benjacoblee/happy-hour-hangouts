const React = require("react");
const Layout = require("./Layout");

class AllBars extends React.Component {
  render() {
    const bars = this.props.bars;
    const barElement = bars.map(bar => {
      return (
        <div className="col-6">
          <img className="bar-img" src={bar.url} />
        </div>
      );
    });
    console.log(bars);
    return (
      <Layout>
        <div className="container">
          <div className="row">{barElement}</div>
        </div>
      </Layout>
    );
  }
}

module.exports = AllBars;
