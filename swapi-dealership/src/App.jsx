import { useReducer } from 'react';
import FooterNav from './components/FooterNav';
import { Logo } from './components/Logo';
import Screen from './components/Screen';
import { AppContext, appState, appStateReducer } from './contexts/AppContext';
import Search from './legacy/Search';

const App = () => {
  const [state, dispatch] = useReducer(appStateReducer, appState);
  const contextValue = {
    state: state,
    dispatch: dispatch,
  };

  const { currentScreen } = state;

  return (
    <AppContext.Provider value={contextValue}>
      <header className="navbar-dark fixed-top bg-dark border-bottom border-warning">
        <nav className="container d-flex justify-content-between">
          <h1 className="display-6 text-warning">Swapi Vehicles</h1>

          <Search className="d-inline-flex align-self-center"></Search>
        </nav>
        <div className="container d-flex">
          <Logo></Logo>
        </div>
      </header>

      <main className="container mt-7 mb-4">
        <Screen screen={currentScreen}></Screen>
      </main>

      <footer className="container mb-4">
        <div className="d-flex flex-row-reverse">
          <Logo></Logo>
        </div>

        <FooterNav></FooterNav>
      </footer>
    </AppContext.Provider>
  );
};

export default App;
