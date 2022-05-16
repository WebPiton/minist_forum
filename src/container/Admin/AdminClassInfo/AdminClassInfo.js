import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios/axios'
import classes from "./AdminClassInfo.module.css"
import { LinkBlue } from '../../../StyleComponent'

class AdminClassInfo extends Component {
    state = {
        students: []
    }
    componentDidMount() {
        document.title = `Список класса ${this.props.location.state.className}`
        axios.get(`/class/getStudentsByClass?class_id=${this.props.location.state.class_id}`, {headers: {token: this.props.token}})
        .then((res)=>{
            this.setState({
                students: res.data.data.students
            })
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    render() {
        return (
            <div className={classes.students}>
                <p className={classes.className}>Клсаа {this.props.location.state.className}</p>
                <div className={classes.studentsBlock}>
                    {this.state.students.length > 0 ? this.state.students.map(item =>
                            <div className={classes.studentsItem} key={nanoid()}>
                                <p>Имя: <span>{item.name}</span></p>
                                <p>Фамилия: <span>{item.surname}</span></p>
                                <p>Никнейм: <span>{item.nickname}</span></p>
                                <p>Почта: <span>{item.email}</span></p>
                            </div>
                        ) :
                        <div className={classes.studentsItemNo}>
                            <p>Учеников нету</p>
                            <LinkBlue to="/admin/add-student">Добавить ученика</LinkBlue>
                        </div>
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

export default connect(mapDispatchToProps)(AdminClassInfo)