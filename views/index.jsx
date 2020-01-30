const React = require("react");
const Layout = require("./Layout");

class Home extends React.Component {
    render() {
        return (
            <Layout>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 px-0">
                            <img className="main-img" src="https://media.timeout.com/images/103490251/image.jpg" />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

module.exports = Home;
