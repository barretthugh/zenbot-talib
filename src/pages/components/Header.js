import React, { Component } from 'react';
import '../../assets/css/header.css';

class Header extends Component {

    render() {
        return (
            <div className="container">
                <h3 className="header-title">{this.props.title}</h3>
                <hr/>
            </div>
        )

    }
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default Header;