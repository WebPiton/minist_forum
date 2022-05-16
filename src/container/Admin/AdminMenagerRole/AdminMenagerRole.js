import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import axios from '../../../axios/axios'
import { ButtonBlue, ButtonGreen, ButtonRed, Input, Select } from '../../../StyleComponent'

class AdminMenagerRole extends Component {
    constructor(props){
        super(props);
        this.state = {
            choice: "default",
            roles: []
        }
    }

    componentDidMount() {
        document.title = `Роли`
        axios.get(`/role/getAllRole`, {headers: {token: this.props.token}})
        .then((res)=>{
            this.setState({
                roles: res.data.data.roles
            })
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    render() {

        const addRole = (e) => {
            e.preventDefault()
            var name = document.getElementById('name').value
            var isAdminFun = document.getElementById('AdminFun').value
            var isClientFun = document.getElementById('ClientFun').value
            if (isAdminFun === "default"){
                return
            }
            if (isClientFun === "default") {
                return
            }
            axios.get(`/role/setRole?name=${name}&isAdminFun=${isAdminFun}&isClientFun=${isClientFun}`, {headers: {token: this.props.token}})
                .then((res)=>{
                    console.log(res);
                    if (res.status === 200) {
                        swal({
                            title: "Хорошая работа!",
                            text: "Роль успешно добавлен",
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

        const deleteRole = (_id) => {
            axios.get(`/role/remRole?roleId=${_id}`, {headers: {token: this.props.token}})
            .then((res)=>{
                this.setState({
                    roles: res.data.data.roles
                })
                console.log(this.state.roles);
            })
            .catch((e)=>{
                console.log(e);
            })
            console.log(_id);
            setTimeout(() => {
                window.location.reload()
            }, 10);
        }

        return (
            <div className='Form'>
                {this.state.choice === "default" ?
                    <React.Fragment>
                        <p>Что сделать?</p>
                        <ButtonBlue onClick={() => this.setState({choice: "lookRole"})} style={{margin: 7, width: "100%"}}>Посмотреть все роли</ButtonBlue>
                        <ButtonBlue onClick={() => this.setState({choice: "addRole"})} style={{margin: 7, width: "100%"}}>Добавить роль</ButtonBlue>
                    </React.Fragment> : this.state.choice === "lookRole" ?
                    <form>
                        <p className="className">Роли</p>
                        <div className="studentsBlock">
                            {this.state.roles.map(item =>
                                <div className="studentsItem" key={nanoid()}>
                                    <p>Роль: <span>{item.name}</span></p>
                                    <ButtonRed onClick={() => deleteRole(item._id)}>Удалить роль</ButtonRed>
                                </div>
                            )}
                        </div>
                    </form> : this.state.choice === "addRole" ?
                    <form>
                        <p>Название роли</p>
                        <Input type="text" id="name" placeholder="Название роли"/>
                        <p>Функции администратора</p>
                        <Select id="AdminFun" defaultValue="default">
                            <option value="default"  disabled="disabled">
                                Выберите роль
                            </option>
                            <option value="true">Есть</option>
                            <option value="false">Нету</option>
                        </Select>
                        <p>Функции клиента</p>
                        <Select id="ClientFun" defaultValue="default">
                            <option value="default"  disabled="disabled">
                                Выберите роль
                            </option>
                            <option value="true">Есть</option>
                            <option value="false">Нету</option>
                        </Select>
                        <ButtonGreen onClick={addRole}>Добавить</ButtonGreen>
                    </form> : null
                }
            </div>
        )
    }
}

function mapDispatchToProps(state) {
    return {
      token: state.auth.token
    };
}


export default connect(mapDispatchToProps)(AdminMenagerRole)
