import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from '../../../axios/axios'
import { ButtonRed } from '../../../StyleComponent'
import classes from './AdminClass.module.css'

class AdminClass extends Component {
    state = {
        allClass: []
    }

    componentDidMount() {
        document.title = 'Классы'
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
    }

    render() {

        const deleteClass = (_id) => {
            axios.get(`/class/remClass?classId=${_id}`, {headers: {token: this.props.token}})
            .then((res)=>{
                this.setState({
                    allClass: res.data.data.allClass
                })
                console.log(this.state.allClass);
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
            <div>
                <div className={classes.contentAllClass}>
                    <p style={{fontSize: "25px", fontWeight: 700, textAlign: "center"}}>Все классы</p>
                    <div className={classes.allClass}>
                        <div className={classes.allClassBlock}>
                            {this.state.allClass.map((item) =>
                                <Link
                                    to={{
                                        pathname: "/admin/class-info",
                                        state: {class_id: item._id, className: item.act + item.char}
                                    }}
                                    key={nanoid()}
                                >
                                    <div className={classes.class}>
                                        <p>Класс: <span>{item.char} {item.act}</span></p>
                                        <p>Ученики <span>{item.countUsers}</span> чел.</p>
                                        <ButtonRed onClick={() => deleteClass(item._id)}>Удалить класс</ButtonRed>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
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

export default connect(mapDispatchToProps)(AdminClass)