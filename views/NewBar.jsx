const React = require("react");
const Layout = require("./Layout");

class NewBar extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <form action="/bars" method="POST" encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="bar-name">Bar name</label>
              <input
                type="text"
                className="form-control"
                name="bar-name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bar-location">Bar location</label>
              <input type="text" className="form-control" name="bar-location" />
            </div>
            <div className="form-group">
              <label htmlFor="bar-image">Upload image</label>
              <input type="file" className="form-control" name="bar-image" />
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="bar-time-from">Happy hour from:</label>
                <input
                  type="time"
                  className="form-control"
                  name="bar-time-from"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="bar-time-to">Happy hour to:</label>
                <input
                  type="time"
                  className="form-control"
                  name="bar-time-to"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bar-details">More details</label>
              <textarea
                className="form-control"
                rows="3"
                name="bar-details"
              ></textarea>
            </div>
            <input type="submit" className="btn btn-primary" />
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = NewBar;
