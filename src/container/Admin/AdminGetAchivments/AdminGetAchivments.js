import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios/axios'
import { ButtonRed } from '../../../StyleComponent'
import classes from './AdminGetAchivments.module.css'

class AdminGetAchivments extends Component {
    state = {
        allAchiv: []
    }

    componentDidMount() {
        document.title = 'Достижения'
        axios.get(`achievement/getAchievements`, {headers: {token: this.props.token}})
        .then((res) => {
            console.log(res);
            this.setState({allAchiv: res.data.data.achievements})
        })
        .catch((e) => {
            console.log(e);
        })
        console.log(this.state.allAchiv);
    }

    render() {

        const DeleteAchiv = (achivId) => {
            axios.get(`/achievement/remAchievement?achievementId=${achivId}`, {headers: {token: this.props.token}})
            .then((res) => {
                console.log(res);
                setTimeout(() => {
                    window.location.reload()
                }, 10);
            })
            .catch((e) => {
                console.log(e);
            })
            
        }
        
        

        return (
            <div>
                <div className={classes.contentAllClass}>
                    <p style={{fontSize: "25px", fontWeight: 700, textAlign: "center"}}>Все достижения</p>
                    <div className={classes.allClass}>
                        <div className={classes.allClassBlock}>
                            {this.state.allAchiv.map((item) =>
                                    <div className={classes.class} key={nanoid()}>
                                        <p>Название: <span>{item.name}</span></p>
                                        <p>Описание: <span>{item.desc}</span></p>
                                        {console.log(item)}
                                        <img src={process.env.REACT_APP_IMG_HOST + item.imgUrl} alt="achivments" />
                                        <ButtonRed onClick={() => DeleteAchiv(item._id)} style={{marginTop: 25}}>Удалить достижение</ButtonRed>
                                    </div>
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

export default connect(mapDispatchToProps)(AdminGetAchivments)