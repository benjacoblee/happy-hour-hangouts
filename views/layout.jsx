const React = require("react");

class Layout extends React.Component {
  render() {
    const loggedIn = this.props.loggedIn;
    let addBar;
    let favorites;
    let loginButton;
    let logoutButton;
    let registerButton;
    let placesSrc =
      "https://maps.googleapis.com/maps/api/js?key=" +
      process.env.places_api_key +
      "&libraries=places";
    if (loggedIn) {
      addBar = (
        <li className="nav-item">
          <a className="nav-link" href="/bars/new">
            Add bar
          </a>
        </li>
      );
      favorites = (
        <li className="nav-item">
          <a className="nav-link" href="/bars/favorites">
            Favorites
          </a>
        </li>
      );
      logoutButton = (
        <a href="/logout">
          <button className="btn btn-login">
            Log out <i className="fas fa-sign-out-alt"></i>
          </button>
        </a>
      );
    } else {
      loginButton = (
        <a href="/login">
          <button className="btn btn-login mr-2">
            Log in <i className="fas fa-sign-in-alt"></i>
          </button>
        </a>
      );
      registerButton = (
        <a href="/register">
          <button className="btn btn-login">
            Register <i className="fas fa-user-plus"></i>
          </button>
        </a>
      );
    }
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>Happy Hour Hangouts</title>
          <script
            src="https://kit.fontawesome.com/b6c2f93973.js"
            crossOrigin="anonymous"
          ></script>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/style.css" />
          <script type="text/javascript" src={placesSrc}></script>
        </head>
        <body>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a id="navbar-brand" className="navbar-brand" href="/">
              H/H Hangouts <i className="fas fa-beer"></i>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                {addBar}
                <li className="nav-item">
                  <a className="nav-link" href="/bars">
                    Bars
                  </a>
                </li>
                {favorites}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sort
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="/bars/sort/created">
                      Newly created
                    </a>
                    <a className="dropdown-item" href="/bars/sort/modified">
                      Newly modified
                    </a>
                  </div>
                </li>
              </ul>
              <form
                action="/search"
                method="GET"
                className="form-inline my-2 my-lg-0"
              >
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  name="search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-search my-2 my-sm-0 mr-2"
                  type="submit"
                >
                  Search
                </button>
              </form>
              {loginButton}
              {registerButton}
              {logoutButton}
            </div>
          </nav>
          {this.props.children}
          <script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossOrigin="anonymous"
          ></script>
          <script async defer src=""></script>
        </body>
      </html>
    );
  }
}

module.exports = Layout;
