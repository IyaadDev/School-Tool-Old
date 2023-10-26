import "../css/init.css"
import "../css/gtext.css"

function AppsList() {
  return (
    <div className="home">
      <div className="container">
        <div className="row cardList">
          <a className="appLink" href="chingching.schooltool.io">
            <div className="col-md-5 appCard justify-content-center text-center">
              <img
                className="appImg"
                src="example.com"
                width="auto!important"
                height="2vw!important"
                alt="Sct"
              />
              <h1 className="appName">ChingChing</h1>
              <p className="version gradient-text-landing"><b>v0.0.1</b></p>
            </div>
          </a>
        </div>
        <a className="appLink" href="liam.schooltool.io">
          <div className="appCard col-md-5 justify-content-center text-center">
            <img
              className="appImg"
              src="example.com"
              width="auto!important"
              height="2vw!important"
              alt="Sct"
            />
            <h1 className="appName">Liam</h1>
            <p className="version gradient-text-landing"><b>v0.0.1</b></p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default AppsList;