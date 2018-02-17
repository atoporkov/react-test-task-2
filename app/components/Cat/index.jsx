import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import autobind from 'react-autobind';

import style from './style.scss';

@CSSModules(style)
class Cat extends Component {
  constructor() {
    super();
    autobind(this);
  }

  _onEditCat() {
    this.props.onEditCat(this.props.id);
  }

  _onDeleteCat() {
    this.props.onDeleteCat(this.props.id);
  }

  render() {
    return (
        <div className={style['cat-component']}>
          <div className="row">
            <div className="column column-40">
                <span className={style['cat-name']}>Name: {this.props.name}</span>
            </div>
            <div className="column column-40">Age: {this.props.age}</div>
            <div className={`column column-20 ${style['ctrl-container']}`}>
              <div className="row">
                <i className="fa fa-pencil ctrl-icon" title="edit" onClick={this._onEditCat}></i>
                <i className="fa fa-remove ctrl-icon" title="delete" onClick={this._onDeleteCat}></i>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Cat;
