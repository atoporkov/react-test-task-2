import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import { browserHistory, withRouter, Link }  from 'react-router';

import { getCatById, updateCat, addCat } from '../../actions/cats';

import style from './style.scss';

@CSSModules(style)
class CatForm extends Component {
  constructor() {
    super();
    autobind(this);

    this.form = {
        formMessages: [],
        fields: {
            name: {
                isRequired: true,
                condition: (value) => value.match(/^[-\sa-zA-Z]+$/)
            },
            age: {
                isRequired: true,
                condition: (value) => value < 25
            }
        }
    }

    this.state = {
        formMessages: []
    }
  }

  componentWillMount() {
    if(typeof this.props.id != 'undefined')
        this.props.onGetCatById(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.submitted && this.props.cat.submitted)
        browserHistory.push('/cats');
  }

  _onFormSubmit(e) {
    e.preventDefault();

    let data = {};

    Object.keys(this.refs).map(ref => {
        data[ref] = this.refs[ref]['value'];
    });

    if(this._validateForm(data)) {
        if(typeof this.props.id == 'undefined') {
            this.props.onAddCat(data);
        } else {
            this.props.onUpdateCat(this.props.id, data);
        }
    }

    this.setState({
        formMessages: this.form.formMessages
    });
  }

  _onFormCancel() {
    browserHistory.push('/cats');
  }

  _validateForm(data) {
    let verified = false;

    verified = Object.keys(data).map(field => {
        let a = this.form.fields[field].condition(data[field]);
        let b = this.form.fields[field].isRequired ? data[field] != '' : true;

        if(a && b) {
            this.form.formMessages = [];
            return true;
        } else {
            if(!a) this.form.formMessages = [...this.form.formMessages, `Field '${field}' has invalid value`];
            if(!b) this.form.formMessages = [...this.form.formMessages, `Field '${field}' is required`];

            return false;
        }

    }).every(x => x);

    return verified;
  }

  render() {
    return (
      <div className={style['cat-form-component']}>
        <h2 className="header">{this.props.cat.data.name}</h2>
        <form onSubmit={this._onFormSubmit}>
            <fieldset>

                <label htmlFor="nameInput">Name</label>
                {
                    typeof this.props.cat.data.name == 'undefined'
                    ? <input type="text" ref="name" id="nameInput" defaultValue="" />
                    : <input type="text" ref="name" id="nameInput" value={this.props.cat.data.name} />
                }

                <label htmlFor="ageInput">Age</label>
                {
                    typeof this.props.cat.data.age == 'undefined'
                    ? <input type="text" ref="age" id="ageInput" defaultValue="" />
                    : <input type="text" ref="age" id="ageInput" value={this.props.cat.data.age} />
                }

                <input type="submit" value="Save" />
                <input type="button" style={{marginLeft: "10px"}} className="button-outline" onClick={this._onFormCancel} value="Cancel" />
            </fieldset>
        </form>
        <ul className={style['cat-form-errors']}>
            {this.state.formMessages.map((message, idx, arr) => <li key={idx}>{message}</li>)}
        </ul>
      </div>
    );
  }
}

let mapStateToProps = ({cat}) => {
    return {
        cat: {...cat, data: cat.data}
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onGetCatById: (id) => {
            dispatch(getCatById(id));
        },
        onAddCat: (data) => {
            dispatch(addCat(data));
        },
        onUpdateCat: (id, data) => {
            dispatch(updateCat(id, data));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatForm));
