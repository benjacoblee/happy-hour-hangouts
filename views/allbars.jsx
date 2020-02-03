const React = require("react");
const Layout = require("./layout");

class AllBars extends React.Component {
  render() {
    const loggedIn = this.props.loggedIn;
    const bars = this.props.bars;
    let searchMessage = this.props.searchMessage;
    let barElement;

    if (bars !== undefined) {
      barElement = bars.map(bar => {
        const barPath = "/bars/" + bar.id;
        return (
          <div className="col-lg-6 mb-4">
            <div className="bar-div">
              <a href={barPath}>
                <img className="bar-img bar-img-sm rounded" src={bar.url} />
              </a>
              <a href={barPath}>
                <p
                  className="card-title text-center bar-card-title"
                  style={{ color: "#CBCECF" }}
                >
                  {bar.name}
                </p>
              </a>
            </div>
          </div>
        );
      });
    }

    return (
      <Layout loggedIn={loggedIn}>
        <div className="container">
          <h4 className="text-center"> {searchMessage}</h4>
          <div className="row">{barElement}</div>
        </div>
      </Layout>
    );
  }
}

module.exports = AllBars;
