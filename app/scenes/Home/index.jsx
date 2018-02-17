import React, { Component } from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

import style from './style.scss';

@CSSModules(style)
class Home extends Component {
  render() {
    return (
        <div className={`container ${style['home-scene']}`} >
          <h2 className="header">
            <Link to="/cats">Cats List</Link>
          </h2>
        </div>
    );
  }
}

export default Home;
