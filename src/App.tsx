import React, { Fragment } from 'react'

import Main from './Components/Structure/Main/Main';
import Header from './Components/Structure/Header/Header/Header';
import Footer from './Components/Structure/Footer/Footer';

function App() {
  return (
    <Fragment>
      <Header />
      <Main 
        contentClasses={`container`} />
      <Footer />
    </Fragment>
  );
}

export default App;
