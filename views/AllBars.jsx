const React = require("react");
const Layout = require("./Layout");

class AllBars extends React.Component {
  render() {
    const bars = this.props.bars;
    const barElement = bars.map(bar => {
      const barPath = "/bars/" + bar.id;
      return (
        <div className="col-6">
          <a href={barPath}>
            <img className="bar-img" src={bar.url} />
          </a>
        </div>
      );
    });
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
