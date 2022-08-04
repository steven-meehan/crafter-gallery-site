import React, { Fragment } from 'react'

import Content from './Components/Layout/Content/Content';
import Header from './Components/Layout/Header/Header';
import Footer from './Components/Layout/Footer/Footer';

function App() {
  return (
    <Fragment>
      <Header />
      <Content 
        contentClasses={`container`} />
      <Footer />
    </Fragment>
  );
}

export default App;
