import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import autobind from 'react-autobind';

import style from './style.scss';

@CSSModules(style)
class AddButton extends Component {
    render() {
        return (
            <div className={style['add-button-component']}>
                <Link title="Add" to={this.props.path}>
                    <i className="fa fa-plus"></i>
                </Link>
            </div>
        );
    }
}

export default AddButton;
