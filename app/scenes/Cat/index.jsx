import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import CatForm from '../../components/CatForm';

import style from './style.scss';

@CSSModules(style)
class Cat extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="column column-50 column-offset-25">
            <CatForm {...this.props.routeParams}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Cat;
