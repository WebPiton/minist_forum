import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from '../../../axios/axios';
import classes from "./AdminAddAchivments.module.css"
import { ButtonGreen, Select } from "../../../StyleComponent"
import { nanoid } from 'nanoid';

class AdminAddAchivments extends Component {
    constructor(props){
        super(props);
        this.state = {
            allModule: []
        }
    }

    componentDidMount() {
        document.title = "Регистрация достижений"
        axios.get(`/module/getAllCharter`, {headers: {token: this.props.token}})
        .then((res)=>{
            console.log(res);
            this.setState({
                allModule: res.data.data.modules
            })
            console.log(this.state.allModule);
        })
        .catch((e)=>{
            console.log(e);
        })
        console.log(this.state.allModule);
    }
    render() {

        const AddAchivments = (e) =>{
            e.preventDefault();
            let moduleId = document.getElementById('moduleId').value
            let formData = new FormData()
            formData.append('name', document.getElementById('name').value)
            formData.append('desc', document.getElementById('desc').value)
            formData.append('img', document.getElementById('img').files[0])
            formData.append('moduleIds', JSON.stringify(moduleId.split(",")))
            axios.post(`/achievement/setAchievement`, formData, {headers: {token: this.props.token}})
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            })
        }
        
        return (
            <div className={classes.addClass}>
                <form>
                    <input type="text" id="name" placeholder="Название достижения"/>
                    <input type="text" id="desc" placeholder="Описание достижения"/>
                    <input type="file" id="img" placeholder="Иконка достижения"/>
                    <Select className="selectClassId" defaultValue="default">
                        <option value="default" disabled="disabled"> 
                           Выбирите предмет
                        </option>
                        {this.state.allModule.map(item => <option value={item.childIds} key={nanoid()} id='moduleId'>{item.name}</option>)}
                    </Select>
                    <ButtonGreen onClick={AddAchivments}>Добавить</ButtonGreen>
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

export default connect(mapStateToProps)(AdminAddAchivments)