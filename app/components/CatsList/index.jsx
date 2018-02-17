import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import autobind from 'react-autobind';

import { withRouter } from 'react-router';
import { browserHistory  } from 'react-router';
import { connect } from 'react-redux';

import { getCats, findCat, sortCats, deleteCat } from '../../actions/cats';

import Cat from '../Cat';

import style from './style.scss';

@CSSModules(style)
class CatsList extends Component {
  constructor() {
    super();
    autobind(this);

    this.state = {
      userQuery: ""
    }
  }

  componentWillMount() {
    this.props.onGetCats();
  }

  _onFindCatReset() {
    this.setState({
        userQuery: ""
      }
    );
    this.props.onFindCat(null);
  }

  _onChangeSorting() {
    this.props.onSortCats(this.refs.sorting.value);
  }

  _onFindCat(e) {
    this.setState({
        userQuery: e.target.value
      }
    );
    this.props.onFindCat(e.target.value);
  }

  _onDeleteCat(id) {
    this.props.onDeleteCat(id);
  }

  _onEditCat(id) {
    browserHistory.push(`/cats/edit/${id}`);
  }

  render() {
    return (
      <div className={style['cats-list-component']}>
          <h2 className="header">Cats List</h2>
          <div className="row">
            <div className="column column-10"></div>
            <div className="column column-80">
              <div className="row">
                <div className="column-offset-20 column column-40 find-input-container">
                  <input value={this.state.userQuery} type="text" onChange={e => this._onFindCat(e)} placeholder="Cat name..." />
                  {this.state.userQuery ? <i title="reset" className="fa fa-remove reset-query" onClick={this._onFindCatReset}></i> : null}
                </div>
                <div className="column column-20">
                  <select ref="sorting" onChange={this._onChangeSorting} defaultValue="AGE_ASC">
                    <option value="AGE_ASC">Age asc</option>
                    <option value="AGE_DESC">Age desc</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="column column-10"></div>
          </div>
          <div className={style['list-wrapper']}>
            <ul className={style['list']}>
              {
                this.props.cats.data.map(cat =>
                  <li key={cat.id}><Cat {...cat} onEditCat={(id) => this._onEditCat(id)} onDeleteCat={(id) => this._onDeleteCat(id)} /></li>
                )
              }
            </ul>
          </div>
      </div>
    );
  }
}

let sortFunc = (type) => {
  switch(type) {
    case 'AGE_ASC':
      return (a, b) => a.age - b.age;
    break;
    case 'AGE_DESC':
      return (a, b) => b.age - a.age;
    break;
  }
}

let mapStateToProps = ({cats}) => {
  let filterCats = (cats, query) => cats.filter(cat => cat.name.toLowerCase().includes(query.toLowerCase()));

  let _cats = cats.query == "" ? cats : {...cats, data: filterCats(cats.data,cats.query)};

  return {
      cats: {...cats, data: _cats.data.sort(sortFunc(cats.sorting))}
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
      onGetCats: () => {
          dispatch(getCats());
      },
      onFindCat: (title) => {
          dispatch(findCat(title));
      },
      onDeleteCat: (id) => {
          dispatch(deleteCat(id));
      },
      onSortCats: (type) => {
          dispatch(sortCats(type));
      }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatsList));
