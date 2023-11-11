import React, { Fragment } from 'react'

import Main from './Routing/Main/Main';
import Header from './Header/Header/Header';
import Footer from './Footer/Footer';

import data from './ConfigFiles/footer.json';

function App() {
  return (
    <Fragment>
      <Header />
      <Main 
        contentClasses={`container`} />
      <Footer
        fontColor={data.fontColor!} />
    </Fragment>
  );
}

export default App;
