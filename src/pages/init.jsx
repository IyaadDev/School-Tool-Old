import "../css/init.css"

function AppsList() {
  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <a className="appLink" href="chingching.schooltool.io">
            <div className="col-md-5 appCard">
              <img
                className="appImg"
                src="example.com"
                width="auto!important"
                height="2vw!important"
                alt="Sct"
              />
              <h1 className="appName">ChingChing</h1>
            </div>
          </a>
        </div>
        <a className="appLink" href="liam.schooltool.io">
          <div className="appCard col-md-5">
            <img
              className="appImg"
              src="example.com"
              width="auto!important"
              height="2vw!important"
              alt="Sct"
            />
            <h1 className="appName">Liam</h1>
          </div>
        </a>
      </div>
    </div>
  );
}

export default AppsList;