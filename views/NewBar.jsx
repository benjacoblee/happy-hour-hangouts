const React = require("react");
const Layout = require("./Layout");

class NewBar extends React.Component {
  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <Layout loggedIn={loggedIn}>
        <div className="container">
          <form action="/bars" method="POST" encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="bar-name">Bar name</label>
              <input
                type="text"
                className="form-control"
                name="barName"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bar-location">Bar location</label>
              <input
                id="autocomplete"
                type="text"
                className="form-control"
                name="barLocation"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bar-image">Upload image</label>
              <input
                type="file"
                className="form-control"
                name="barImage"
                required
              />
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="bar-time-from">Happy hour from:</label>
                <input
                  type="time"
                  className="form-control"
                  name="happyHourFrom"
                  required
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="bar-time-to">Happy hour to:</label>
                <input
                  type="time"
                  className="form-control"
                  name="happyHourTo"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="bar-days">Days</label>
              <input
                type="text"
                className="form-control"
                name="happyHourDays"
                placeholder="E.g. on Monday to Friday"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bar-tags">Tags</label>
              <input
                type="text"
                className="form-control"
                name="happyHourTags"
                placeholder="E.g. finger food, Spanish, etc."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bar-details">More details</label>
              <textarea
                className="form-control"
                rows="3"
                name="barDetails"
              ></textarea>
            </div>
            <input type="submit" className="btn btn-primary" />
          </form>
        </div>
        <script src="/places.js"></script>
      </Layout>
    );
  }
}

module.exports = NewBar;
