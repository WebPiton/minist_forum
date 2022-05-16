import React, { Component } from 'react'
import classes from "./AdminRegistModule.module.css"
import { connect } from 'react-redux'
import axios from '../../../axios/axios'
import { ButtonBlue, ButtonGreen } from '../../../StyleComponent'
import swal from 'sweetalert'

class RegModule extends Component{
    state = {
        choice: "default",
        file: null
    }

    render(){
        const regModule = (e) => {
            e.preventDefault();
            let file = document.getElementById('file').files[0]
            const formData = new FormData();
            formData.append('xlsx', file)
                axios.post(`/xlsx/setModules`, formData, {headers: {token: this.props.token}})
                  .then((res) => {
                    if (res.status === 200) {
                        swal({
                            title: "Хорошая работа!",
                            text: "Тест добавлен",
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

        const moduleFile = (e) => {
            e.preventDefault();
            let file = document.getElementById('file').files[0]
            this.setState({
                file: file.name
            })
        }

        const regTest = (e) => {
            e.preventDefault();
            let file = document.getElementById('file').files[0]
            const formData = new FormData();
            formData.append('xlsx', file)
                axios.post(`/xlsx/setQuestions`, formData, {headers: {token: this.props.token}})
                  .then((res) => {
                    if (res.status === 200) {
                        swal({
                            title: "Хорошая работа!",
                            text: "Тест добавлен",
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

        const testFile = (e) => {
            e.preventDefault();
            let file = document.getElementById('file').files[0]
            this.setState({
                file: file.name
            })
        }

        return(
            <div className={classes.Form}>
                {this.state.choice === "default" ?
                    <React.Fragment>
                        <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Что добавить?</p>
                        <div>
                            <ButtonBlue onClick={() => this.setState({choice: "module"})} style={{margin: 7}}>Модуль</ButtonBlue>
                            <ButtonBlue onClick={() => this.setState({choice: "test"})} style={{margin: 7}}>Тест</ButtonBlue>
                        </div>
                    </React.Fragment> : this.state.choice === "module" ?
                    <form>
                        <p>Добавление модуля</p>
                        <label htmlFor="file" className={classes.label}>Выберите файлы</label>
                        <input type="file" className={classes.my} name="myfile" id='file' accept='.xlsx, .xls' onChange={moduleFile}/>
                        {this.state.file !== null ? (
                                <React.Fragment>
                                    <p>Выбранный файл</p>
                                    <p style={{marginBottom: "10px"}}>{this.state.file}</p>
                                </React.Fragment>
                            ) :
                            null
                        }
                        <ButtonGreen onClick={regModule}>Добавить</ButtonGreen>
                    </form> : this.state.choice === "test" ?
                    <form>
                        <p>Добавление теста</p>
                        <label htmlFor="file" className={classes.label}>Выберите файлы</label>
                        <input type="file" className={classes.my} name="myfile" id='file' accept='.xlsx, .xls' onChange={testFile}/>
                        {this.state.file !== null ? (
                                <React.Fragment>
                                    <p>Выбранный файл</p>
                                    <p style={{marginBottom: "10px"}}>{this.state.file}</p>
                                </React.Fragment>
                            ) :
                            null
                        }
                        <ButtonGreen onClick={regTest}>Добавить</ButtonGreen>
                    </form> : null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      token: state.auth.token
    };
}

export default connect(mapStateToProps)(RegModule)