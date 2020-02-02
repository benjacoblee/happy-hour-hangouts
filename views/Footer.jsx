const React = require("react");

class Footer extends React.Component {
  render() {
    return (
      <div className="mb-2 footer">
        <p className="text-center mb-0">Made with 🖤 by Ben Jacob Lee</p>
        <div className="text-center">
          <a href="https://instagram.com/benjacoblee">
            <i className="fab fa-instagram mx-2 text-light"></i>
          </a>

          <a href="https://github.com/benjacoblee/">
            <i className="fab fa-github text-center mx-2 text-light"></i>
          </a>

          <a href="mailto:benjacoblee@gmail.com">
            <i className="fas fa-envelope mx-2 text-light"></i>
          </a>
        </div>
      </div>
    );
  }
}

module.exports = Footer;
