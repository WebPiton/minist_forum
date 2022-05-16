import React, { Component } from "react";
import classes from './adminItem.module.css'
import axios from "../../../axios/axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { nanoid } from 'nanoid'

class adminItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            card: [],
        }
    }

    componentDidMount() {
        document.title="Выбор предмета"
        axios.get(`/module/getAllCharter`, {headers: {token: this.props.token}})
        .then((res)=>{
            this.setState({
                card: res.data.data.modules
            })
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    render(){
        return(
            <div className={classes.Deks}>
                <h1>Список предметов:</h1>
                <div className={classes.module_info}>
                    {this.state.card.map((item) =>
                            <Link
                            to={{
                            pathname: "/admin/module/",
                            state: { parentId: item._id, parentName: item.name },
                            }}
                            className={classes.link}
                            key={nanoid()}
                        >
                            <div className={classes.card_module} key={nanoid()}>
                                <p>{item.name}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      token: state.auth.token,
      nickname: state.auth.nickname
    };
}

export default connect(mapStateToProps)(adminItem)