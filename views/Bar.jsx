const React = require("react");
const Layout = require("./Layout");
const moment = require("moment");
moment().format();

class Bar extends React.Component {
  render() {
    let commentForm;
    let commentElement;
    let bookmark;
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
    let editButton;
    let isOwner = this.props.isOwner;
    const bar = this.props.bar;
    const loggedIn = this.props.loggedIn;
    const commentPath = "/bars/" + bar.id + "/comment";
    const googleMapPath =
      "https://www.google.com/maps/search/?api=1&query=" + bar.location;
    if (isOwner) {
      const editPath = "/bars/" + bar.id + "/edit";
      const deletePath = "/bars/" + bar.id + "?_method=delete";
      editButton = (
        <form className="mt-3 mb-3 mr-2 d-inline" action={editPath} method="GET">
          <input
            className="btn btn-warning text-light"
            type="submit"
            value="Edit"
          ></input>
        </form>
      );
      deleteButton = (
        <form className="mt-3 mb-3 d-inline" action={deletePath} method="POST">
          <input
            className="btn btn-danger"
            type="submit"
            value="Delete"
          ></input>
        </form>
      );
    }
    if (loggedIn) {
      bookmark = <i className="fas fa-bookmark bookmark fa-2x"></i>;
      commentForm = (
        <div className="mb-2">
          <p>
            <strong>Post a comment:</strong>
          </p>
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
        </div>
      );
    }
    return (
      <Layout loggedIn={loggedIn}>
        <div className="container">
          <h1 className="bar-title d-inline mr-2">{bar.name}</h1>
          {bookmark}
          <div>
            {editButton}
            {deleteButton}
          </div>

          <p>
            Tags: <em>{bar.tags}</em>
          </p>
          <img className="bar-img" src={bar.url}></img>
          <div className="mt-2">
            <p>
              <strong>Location:</strong> {bar.location}{" "}
              <a className="map-link ml-2" href={googleMapPath} target="_blank">
                Open in Maps
              </a>
            </p>
            <p>
              <strong>Happy hours:</strong> {bar.from_time} - {bar.to_time}{" "}
              {bar.days}
            </p>
            <p>
              <strong>Details:</strong>
              <br />
              {bar.details}
            </p>
            {commentForm}
            <p>
              <strong>Comments:</strong>
            </p>
            {commentElement}
          </div>
        </div>
        <script src="/bookmarkBar.js"></script>
        <script src="/checkFavorite.js"></script>
      </Layout>
    );
  }
}

module.exports = Bar;
