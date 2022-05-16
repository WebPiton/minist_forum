import { nanoid } from 'nanoid';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from '../../axios/axios';
import classes from './Comment.module.css'
import {ButtonRed} from '../../StyleComponent'
import swal from 'sweetalert';

class Comment extends Component {
    state = {
        message: [],
        user: false
    }

    componentDidMount() {
        setInterval(() => {
            axios.get(`/message/getMessagesModule?moduleId=${this.props.moduleId}`, {headers: {token: this.props.token}})
                .then((res)=>{
                    if (JSON.stringify(this.state.message) !== JSON.stringify(res.data.data.messages)) {
                        this.setState({
                            message: res.data.data.messages
                        })
                    }
                })
                .catch((e)=>{
                    console.log(e);
                })
        }, 500);
    }
    render() {
        const likeHandler = (likeId) => {
            axios.get(`/message/toggleLike?messageId=${likeId}`, {headers: {token: this.props.token}})
                .then((res)=>{
                    console.log(this.state.message);
                })
                .catch((e)=>{
                    console.log(e);
                })
        }

        const DeleteMessage = (messageId) => {
            console.log(messageId);
            axios.get(`/message/remMessage?messageId=${messageId}`, {headers: {token: this.props.token}})
                .then(()=>{
                    swal({
                    title: "Успех!",
                    text: "Сообщение удалено",
                    icon: "success",
                    button: "Продолжить",
                    })
                })
                .catch((e) => {
                    console.log(e);
                })
        }

        return (
            <div className={classes.commentBlock}>
                {this.state.message.map((item) =>
                    <div className={classes.commentItem} key={nanoid()}>
                        <div className={classes.commentUser}>
                            <p className={classes.name}>Имя: {item.author.nickname}</p>
                            <p className={classes.text}>Текст: {item.desc}</p>
                        </div>
                        <p className={classes.like}><img src={item.isLiked ? "/img/likeTrue.png": "/img/likeFalse.png"} alt="like" onClick={() => likeHandler(item._id)} /> {item.likeCount}</p>
                        {localStorage.role === 'Admin' ?
                            <React.Fragment>
                               <ButtonRed onClick={() => DeleteMessage(item._id)}>Удалить сообщение</ButtonRed>  
                            </React.Fragment>
                               
                             :
                            null
                        }
                    </div>
                )}
            </div>
        )
    }
}

function mapDispatchToProps(state) {
    return {
      token: state.auth.token
    };
}

export default connect(mapDispatchToProps)(Comment)