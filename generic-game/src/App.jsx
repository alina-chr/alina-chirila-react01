import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { initializeGoogleAuth } from './api';
import { Footer, Header } from './components/common';

import {
  GamePage,
  HomePage,
  NotFoundPage,
  ProfilePage,
  RankPage,
  RanksPage,
} from './pages';

// import { STH, STH } from './actions/types/ui';
// import {dispatchState} from './actions/creators/ui';

// async
initializeGoogleAuth();

export const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <main className="flex-grow">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/play" component={GamePage}></Route>
          <Route path="/profile" component={ProfilePage}></Route>
          <Route path="/ranks" exact component={RanksPage}></Route>
          <Route path="/ranks/:id" component={RankPage}></Route>
          <Route component={NotFoundPage}></Route>
        </Switch>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;

// actions -> {type: '', payload: {}}  /types /creators
// reducers
