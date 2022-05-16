import React, { Component } from "react";
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import classes from './AdminTheme.module.css'
import axios from "../../../axios/axios";
import { nanoid } from "nanoid";

class AdminTheme extends Component{
    constructor(props){
        super(props);
        this.state = {
            theme: []
        }
    }

    componentDidMount() {
        document.title=`Выбор темы модуля ${this.props.location.state.moduleName}`
        axios.get(`/theme/getThemesModule?module_id=${this.props.location.state.moduleId}`, {headers: {token: this.props.token}})
        .then((res)=>{
            this.setState({
                theme: res.data.data.themes
            })
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className={classes.themeBlock}>
                    <div className={classes.theme}>
                        <div className={classes.themeInfo}>
                            <p>Предмет: {this.props.location.state.cardName}</p>
                            <p>Модуль: {this.props.location.state.moduleName}</p>
                            <p>Доступные темы</p>
                        </div>
                        {this.state.theme.length > 0 ?
                            <React.Fragment>
                                {this.state.theme.map((item) =>
                                    <Link
                                            to={{
                                                pathname: "/test/",
                                                state: { theme: item, moduleId: item.id, themeName: item.name, cardName: this.props.location.state.cardName, moduleName: this.props.location.state.moduleName },
                                            }}
                                            // onClick={}
                                            className={classes.themeCard}
                                            key={nanoid()}
                                        >
                                            <p key={nanoid()}>{item.name}</p>
                                        </Link>
                                )}
                            </React.Fragment> : <div className={classes.themeCard}><p>Тестов нет</p></div> }
                            <div className={classes.AddContainer}>
                                <h1>Добавления темы</h1>
                                <Link to={{
                                        pathname: "/admin/add-theme",
                                        state: {cardId: this.props.location.state.cardId, cardName: this.props.location.state.cardName, moduleId: this.props.location.state.moduleId}
                                    }}>
                                        <div className={classes.AddBlock}>
                                            <p>+</p>
                                        </div>
                                </Link>
                            </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(state) {
    return {
      token: state.auth.token
    };
}

export default connect(mapDispatchToProps)(AdminTheme)