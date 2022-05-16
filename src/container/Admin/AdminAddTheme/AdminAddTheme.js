import React, { Component } from "react";
import classes from './AdminAddTheme.module.css'
import { connect } from "react-redux";
import axios from "../../../axios/axios";

class AddTheme extends Component{

    componentDidMount(){
        document.title=`Добавление темы модуля ${this.props.location.state.moduleName}`
    }

    render(){
        const addThemeHandler = (e) => {
            e.preventDefault();
            var description = document.getElementById("description").value
            var name = document.getElementById("name").value
            axios.get(`/theme/setTheme?module_id=${this.props.location.state.moduleId}&description=${description}&name=${name}`, {headers: {token: this.props.token}})
                .then((res)=>{
                    this.setState({
                        theme: res.data.data.themes
                    })
                })
                .catch((e)=>{
                    console.log(e);
                })
        }
        return(
            <div className={classes.Form}>
                <form>
                    <input type="text" id="name" placeholder="Название"/>
                    <input type="text" id="description" placeholder="Описани"/>
                    <button onClick={addThemeHandler}>Добавить</button>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(state) {
    return {
      token: state.auth.token
    };
}

export default connect(mapDispatchToProps)(AddTheme)