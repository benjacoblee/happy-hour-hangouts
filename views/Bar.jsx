const React = require("react");
const Layout = require("./Layout");
const moment = require("moment");
moment().format();

class Bar extends React.Component {
  render() {
    console.log(this.props.comments);
    let commentElement;
    const commentData = this.props.comments;
    if (commentData !== undefined) {
      commentElement = commentData.map(comment => {
        const formattedDate = moment(comment.date).format("h:mm a, MMM Do YY");
        return (
          <div>
            <p>
              <span>{comment.username}</span> {formattedDate}
            </p>
            <p>{comment.comment}</p>
          </div>
        );
      });
    }

    let deleteButton;
    let isOwner = this.props.isOwner;
    const bar = this.props.bar;
    const loggedIn = this.props.loggedIn;
    const commentPath = "/bars/" + bar.id + "/comment";
    const googleMapPath =
      "https://www.google.com/maps/search/?api=1&query=" + bar.location;
    if (isOwner) {
      const deletePath = "/bars/" + bar.id + "?_method=delete";
      deleteButton = (
        <form className="mb-3" action={deletePath} method="POST">
          <input
            className="btn btn-danger"
            type="submit"
            value="Delete"
          ></input>
        </form>
      );
    }
    return (
      <Layout loggedIn={loggedIn}>
        <div className="container">
          <h1 className="bar-title">{bar.name}</h1>
          <img className="bar-img" src={bar.url}></img>
          <div className="mt-2">
            <p>
              <strong>Location:</strong> {bar.location}{" "}
              <a className="map-link ml-2" href={googleMapPath} target="_blank">
                Open in Maps
              </a>
            </p>
            <p>
              <strong>Happy hour from:</strong> {bar.from_time} - {bar.to_time}
            </p>
            <p>
              <strong>Details:</strong>
              <br />
              {bar.details}
            </p>
            {deleteButton}
            <p>
              <strong>Post a comment:</strong>
              <form action={commentPath} method="POST">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="3"
                    name="comment"
                    required
                  ></textarea>
                </div>
                <input className="btn btn-primary" type="submit" />
              </form>
            </p>
            <p>
              <strong>Comments:</strong>
            </p>
            {commentElement}
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Bar;
