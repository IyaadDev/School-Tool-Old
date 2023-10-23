import 'bootstrap.min.css';
import 'global.css';
import Nav from './Nav';
import Widgets from "./Widgets";

function App() {
  return (
    <div>
      <Nav />
      <div className="container">
        <div className='row'>
          <Widgets className="panel" />
        </div>
      </div>
    </div>
  );
}

export default App;
