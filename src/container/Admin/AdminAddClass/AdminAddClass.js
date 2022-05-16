import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from '../../../axios/axios';
import classes from "./AdminAddClass.module.css"
import { ButtonGreen } from "../../../StyleComponent"
import swal from 'sweetalert';

class AdminAddClass extends Component {
    componentDidMount() {
        document.title = "Добавление класса"
    }
    render() {
        const addClass = (e) => {
            e.preventDefault();
            var char = document.getElementById("char").value
            var act = document.getElementById("act").value
            axios.get(`/class/setClass?char=${char}&act=${act}`, {headers: {token: this.props.token}})
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        swal({
                            title: "Хорошая работа!",
                            text: "Класс успешно добавлен",
                            icon: "success",
                            button: "Продолжить",
                           })
                            .then(() => {
                                window.location.reload()
                            });
                    }
                })
                .catch((e)=>{
                    console.log(e);
                })
        }
        return (
            <div className={classes.addClass}>
                <form>
                    <input type="text" id="char" placeholder="Буква класса"/>
                    <input type="text" id="act" placeholder="Год обучения"/>
                    <ButtonGreen onClick={addClass}>Добавить</ButtonGreen>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      token: state.auth.token
    };
}

export default connect(mapStateToProps)(AdminAddClass)