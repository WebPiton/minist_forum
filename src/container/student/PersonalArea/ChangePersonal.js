import React, { Component } from 'react'
import { connect } from 'react-redux';
import swal from 'sweetalert';
import axios from '../../../axios/axios'
import { ButtonBlue, ButtonGreen, Input } from '../../../StyleComponent';

class ChangePersonal extends Component {
    state= {
        choice: "default"
    }

    componentDidMount() {
        document.title = "Личный кабинет"
    }

    render() {

        const passwordChange = (e) => {
            e.preventDefault();
            axios.get(`/user/setPassword?oldPassword=${document.querySelectorAll("input")[0].value}&newPassword=${document.querySelectorAll("input")[1].value}`, {headers: {token: this.props.persInfo.token}})
            .then((res)=>{
                console.log(res.data.type);
                if (res.data.type === "success") {
                    swal({
                        title: "Хорошая работа!",
                        text: "Пароль изменен",
                        icon: "success",
                        button: "Продолжить",
                       })
                        .then(() => {
                            document.location.href = '/personal-area'
                        });
                }
            })
            .catch((e)=>{
                console.log(e);
            })
        }

        const paramChange = (e) => {
            e.preventDefault();
            axios.get(`/user/setParamUser?firstName=${document.querySelectorAll("input")[0].value}&middleName=${document.querySelectorAll("input")[1].value}&lastName=${document.querySelectorAll("input")[2].value}&nickname=${document.querySelectorAll("input")[3].value}`, {headers: {token: this.props.persInfo.token}})
            .then((res)=>{
                console.log(res.data.type);
                if (res.data.type === "success") {
                    swal({
                        title: "Хорошая работа!",
                        text: "Данные изменен",
                        icon: "success",
                        button: "Продолжить",
                       })
                        .then(() => {
                            document.location.href = '/personal-area'
                        });
                }
            })
            .catch((e)=>{
                console.log(e);
            })
        }

        return (
            <React.Fragment>
                {this.state.choice === "default" ?
                    <div className='Form'>
                        <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Что изменить?</p>
                        <div>
                            <ButtonBlue onClick={() => this.setState({choice: "data"})} style={{margin: 7}}>Личные данны</ButtonBlue>
                            <ButtonBlue onClick={() => this.setState({choice: "pswd"})} style={{margin: 7}}>Пароль</ButtonBlue>
                        </div>
                    </div> : this.state.choice === "data" ?
                    <div className='Form'>
                        <h1>Изменение данных</h1>
                        <form>
                            <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Имя</p>
                            <Input placeholder="Имя" defaultValue={this.props.persInfo.firstName} />
                            <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Фамилия</p>
                            <Input placeholder="Фамилия" defaultValue={this.props.persInfo.middleName} />
                            <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Отчество</p>
                            <Input placeholder="Отчество" defaultValue={this.props.persInfo.lastName} />
                            <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Никнейм</p>
                            <Input placeholder="Никнейм" defaultValue={this.props.persInfo.nickname} />
                            <ButtonGreen onClick={paramChange}>Изменить данные</ButtonGreen>
                        </form>
                    </div> : this.state.choice === "pswd" ?
                        <div className='Form'>
                            <h1>Изменение пароля</h1>
                            <form>
                                <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Старый пароль</p>
                                <Input placeholder="Старый пароль" />
                                <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Новый пароль</p>
                                <Input placeholder="Новый пароль" />
                                <ButtonGreen onClick={passwordChange}>Изменить пароль</ButtonGreen>
                            </form>
                        </div> : null
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
      persInfo: state.auth
    };
  }

export default connect(mapStateToProps)(ChangePersonal)