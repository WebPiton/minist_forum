import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkBlue } from '../../../StyleComponent'
import classes from "./Admin.module.css"

class Admin extends Component {
    componentDidMount() {
        document.title = "Админ панель"
    }
    render() {
        const linkRout = (role) => {
            switch (role) {
                case "Admin":
                    return (
                        <React.Fragment>
                            <LinkBlue to="/admin/item">Предметы</LinkBlue>
                            <LinkBlue to="/admin/class">Просмотр классов</LinkBlue>
                            <LinkBlue to="/admin/add-class">Добавление класса</LinkBlue>
                            <LinkBlue to="/admin/add-user">Добавление пользователя</LinkBlue>
                            <LinkBlue to="/admin/role">Роли</LinkBlue>
                            <LinkBlue to="/admin/regist-module">Регистрация модуля</LinkBlue>
                            <LinkBlue to="/admin/access-to-module">Доступ к модулю</LinkBlue>
                            <LinkBlue to="/admin/view-item">Просмотр модулей</LinkBlue>
                            <LinkBlue to="/admin/add-achivments">Добавление достижения</LinkBlue>
                            <LinkBlue to="/admin/get-achivments">Просмотр достижений</LinkBlue>
                        </React.Fragment>
                    )
                case "teacher":
                    return (
                        <React.Fragment>
                            <LinkBlue to="/admin/item">Предметы</LinkBlue>
                            <LinkBlue to="/admin/class">Просмотр классов</LinkBlue>
                        </React.Fragment>
                    )
                default:
                    break;
            }
        }
        return (
            <div className={classes.admin}>
                <div className={classes.info}>
                    <h1>Логин: {this.props.nickname}</h1>
                </div>
                <div className={classes.links}>
                    {linkRout(this.props.role)}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      role: state.auth.role,
      nickname: state.auth.nickname
    };
}

export default connect(mapStateToProps)(Admin)