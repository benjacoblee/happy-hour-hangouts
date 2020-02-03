const React = require("react");
const Layout = require("./Layout");

class Home extends React.Component {
  render() {
    const loggedIn = this.props.loggedIn;

    return (
      <Layout loggedIn={loggedIn}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 px-0">
              <img
                className="main-img"
                src="https://media.timeout.com/images/103490251/image.jpg"
              />
            </div>
          </div>
          <div className="container-fluid">
            <div className="row pt-5 d-flex justify-content-around">
              <div className=" col-lg-4 text-center mb-5">
                <i className="fas fa-bookmark fa-5x mb-3"></i>
                <h4 className="feature-title">Never forget.</h4>
                <p className="site-desc">Log in to save a hangout for later.</p>
              </div>
              <div className=" col-lg-4 text-center mb-5">
                <i className="fas fa-pen fa-5x mb-3"></i>
                <h4 className="feature-title">Contribute.</h4>
                <p className="site-desc">
                  Register and become a contributor right away!
                </p>
              </div>
              <div className=" col-lg-4 text-center mb-5">
                <i className="fas fa-search fa-5x mb-3"></i>
                <h4 className="feature-title">Search.</h4>
                <p className="site-desc">
                  Find bars by name or tags!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Home;
