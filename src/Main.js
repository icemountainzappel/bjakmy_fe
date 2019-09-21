import React from 'react'
import Home from './Home'
import { Switch, Route } from 'react-router-dom'
import Detail from './Detail';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/detail' component={Detail} />
    </Switch>
  </main>
)

export default Main