import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import axios from '../../../axios/axios'
import { ButtonBlue, ButtonGreen, Select } from '../../../StyleComponent'

class AdminOpenModule extends Component {
    state= {
        choice: "default",
        allClass: [],
        charter: []
    }

    componentDidMount() {
        document.title = "Доступ к модулю"
        axios.get(`/class/getAllClass`, {headers: {token: this.props.token}})
        .then((res)=>{
            var sort = res.data.data.resultAllClass.sort()
            this.setState({
                allClass: sort.reverse()
            })
        })
        .catch((e)=>{
            console.log(e);
        })
        axios.get(`module/getAllCharter`, {headers: {token: this.props.token}})
        .then((res)=>{
            this.setState({
                charter: res.data.data.modules
            })
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    render() {

        const remWNA = (e) => {
            e.preventDefault();
            const arr = []
            arr.push(document.getElementById("module").value)
            axios.get(`/class/remWNA?classId=${document.getElementById("class").value}&moduleIds=${JSON.stringify(arr)}`, {headers: {token: this.props.token}})
            .then((res)=>{
                swal({
                    title: "Хорошая работа!",
                    text: "Доступ открыт",
                    icon: "success",
                    button: "Продолжить",
                   })
                    .then(() => {
                        window.location.reload()
                    });
            })
            .catch((e)=>{
                console.log(e);
            })
        }

        const setWNA = (e) => {
            e.preventDefault();
            const arr = []
            arr.push(document.getElementById("module").value)
            axios.get(`/class/setWNA?classId=${document.getElementById("class").value}&moduleIds=${JSON.stringify(arr)}`, {headers: {token: this.props.token}})
            .then((res)=>{
                swal({
                    title: "Хорошая работа!",
                    text: "Доступ закрты",
                    icon: "success",
                    button: "Продолжить",
                   })
                    .then(() => {
                        window.location.reload()
                    });
            })
            .catch((e)=>{
                console.log(e);
            })
        }

        return (
            <div>
                <div className='Form'>
                {this.state.choice === "default" ?
                    <React.Fragment>
                        <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Что сделать?</p>
                        <div>
                            <ButtonBlue onClick={() => this.setState({choice: "open"})} style={{margin: 7}}>Открыть модуль</ButtonBlue>
                            <ButtonBlue onClick={() => this.setState({choice: "close"})} style={{margin: 7}}>Закрыть модуль</ButtonBlue>
                        </div>
                    </React.Fragment> : this.state.choice === "open" ?
                    <React.Fragment>
                        <h1>Открыть доступ</h1>
                        <form>
                            <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Класс</p>
                            <Select defaultValue="default" id='class'>
                                <option value="default"  disabled="disabled">Выберите класс</option>
                                {this.state.allClass.map((item) => <option value={item._id} key={nanoid()}>{item.char} {item.act}</option>)}
                            </Select>
                            <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Модуль</p>
                            <Select defaultValue="default" id='module'>
                                <option value="default"  disabled="disabled">Выберите модуль</option>
                                {this.state.charter.map((item) => <option value={item._id} key={nanoid()}>{item.name}</option>)}
                            </Select>
                            <ButtonGreen onClick={remWNA}>Открыть доступ</ButtonGreen>
                        </form>
                    </React.Fragment> : this.state.choice === "close" ?
                        <React.Fragment>
                            <h1>Закрыть доступ</h1>
                            <form>
                                <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Класс</p>
                                <Select defaultValue="default" id='class'>
                                    <option value="default"  disabled="disabled">Выберите класс</option>
                                    {this.state.allClass.map((item) => <option value={item._id} key={nanoid()}>{item.char} {item.act}</option>)}
                                </Select>
                                <p style={{fontSize: "22px", fontWeight: 700, marginBottom: "7px"}}>Модуль</p>
                                <Select defaultValue="default" id='module'>
                                    <option value="default"  disabled="disabled">Выберите модуль</option>
                                    {this.state.charter.map((item) => <option value={item._id} key={nanoid()}>{item.name}</option>)}
                                </Select>
                                <ButtonGreen onClick={setWNA}>Закрыть доступ</ButtonGreen>
                            </form>
                        </React.Fragment> : null
                }
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(state) {
    return {
      token: state.auth.token
    };
}

export default connect(mapDispatchToProps)(AdminOpenModule)