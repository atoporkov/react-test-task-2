import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { withRouter }  from 'react-router';

import style from './style.scss';

import CatsList from '../../components/CatsList';
import AddButton from '../../components/AddButton';

@CSSModules(style)
class List extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div className={`container ${style['list-scene']}`} >
          <CatsList />
          <div className={style['add-button']}>
            <AddButton path="/cats/new"/>
          </div>
        </div>
    );
  }
}

export default withRouter(List);
