import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkBlue } from '../../StyleComponent'
import classes from "./Header.module.css"

class Header extends Component {
    render() {
        return (
            <div className={classes.header}>
                <LinkBlue to="/item">Предметы</LinkBlue>
                <div className={classes.headerPers}>
                    <p><span>{this.props.money}</span>x <img src="/img/coin.png" alt="Монетки"/></p>
                    <p><span>{this.props.like_money}</span>x <img src="/img/coinSocial.png" alt="Соц. монетки"/></p>
                    <LinkBlue to="/personal-area">Личный кабинет</LinkBlue>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(state) {
    return {
        money: state.auth.money,
        like_money: state.auth.like_money
    };
}

export default connect(mapDispatchToProps)(Header)