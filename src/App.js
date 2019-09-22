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
    </div>
  );
}

export default App;
