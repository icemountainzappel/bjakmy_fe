import React from 'react';
import Main from './Main'
import './App.scss';
import NavHeader from './NavHeader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavHeader />
        <Main />
      </header>
      <footer>
        <span>Dev by <a href="mailto: irfan.abrazak@.gmail.com">Irfan</a> with <a href="https://reactjs.org/">React</a> and <a href="https://material-ui.com/">Material-UI</a></span>
      </footer>
    </div>
  );
}

export default App;
