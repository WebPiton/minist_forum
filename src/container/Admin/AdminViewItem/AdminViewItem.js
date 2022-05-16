import React, { Component } from "react";
import { nanoid } from 'nanoid'
import {Link} from 'react-router-dom'
import axios from "../../../axios/axios";
import { connect } from "react-redux";

class AdminViewModule extends Component{
    constructor(props){
        super(props);
        this.state = {
            modules: [],
        }
    }

    componentDidMount() {
        document.title="Выбор предмета"
        axios.get(`module/getAllCharter`, {headers: {token: this.props.token}})
        .then((res)=>{
            this.setState({
                modules: res.data.data.modules
            })
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="moduleBlock">
                    <div className="module">
                        <h1>Предметы</h1>
                        {this.state.modules.length > 0  ?
                            this.state.modules.map((item) =>
                                item.access === true ?
                                    <Link
                                        to={{
                                        pathname: "/admin/view-module",
                                        state: { parentId: item._id, parentName: item.name },
                                        }}
                                        className="moduleCard"
                                        key={nanoid()}
                                    >
                                        <h1 key={nanoid()}>{item.name}</h1>
                                    </Link> : null) :
                            <h1>Предметов нет</h1>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(state) {
    return {
      token: state.auth.token
    };
}

export default connect(mapDispatchToProps)(AdminViewModule)