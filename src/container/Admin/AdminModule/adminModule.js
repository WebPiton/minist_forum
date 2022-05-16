import React, { Component } from "react";
import axios from "../../../axios/axios";
import {Link} from "react-router-dom"
import { nanoid } from "nanoid";
import {connect} from "react-redux"
import Loader from "../../../component/Loader/Loader";

class adminModule extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            nesting: 1,
            module: []
        }
    }

    componentDidMount() {
        document.title=`Выбор модуля предмета ${this.props.location.state.parentName}`
        axios.get(`/module/getAllChild?parent=${this.props.location.state.parentId}`, {headers: {token: this.props.token}})
        .then((res)=>{
            this.setState({
                module: res.data.data.module,
                isLoading: false
            })
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    render(){
        const further = (parentId) => {
            this.setState({isLoading: true})
            axios.get(`/module/getAllChild?parent=${parentId}`, {headers: {token: this.props.token}})
                .then((res)=>{
                    this.setState({
                        module: res.data.data.module,
                        isLoading: false
                    })
                })
                .catch((e)=>{
                    console.log(e);
                })
        }
        return(
            <React.Fragment>
                {!this.state.isLoading ?
                    <React.Fragment>
                        <div className="moduleBlock">
                            <div className="module">
                                <div className="moduleInfo">
                                    <p>Предмет: {this.props.location.state.parentName}</p>
                                    <p>Доступные модули</p>
                                </div>
                                {this.state.module.childs === [] ?
                                    <div className="moduleCard"><p>Модулей нет</p></div> :
                                    <React.Fragment>
                                        {this.state.module.childs.map((item) =>
                                            <React.Fragment key={nanoid()}>
                                                {item.childIds.length === 0 ?
                                                    <Link
                                                        to={{
                                                            pathname: "/test/",
                                                            state: { moduleId: item._id, name: item.name, parentName: this.props.location.state.parentName },
                                                        }}
                                                        // onClick={}
                                                        className="moduleCard"
                                                        key={nanoid()}
                                                    >
                                                        <p key={nanoid()}>{item.childIds.length === 0 ? "Тема:" : null} {item.name}</p>
                                                    </Link> :
                                                    <div className="moduleCard" onClick={() =>further(item._id)}>
                                                        <p key={nanoid()}>{item.childIds.length >= 0 ? "Модуль:" : null} {item.name}</p>
                                                    </div>}
                                            </React.Fragment>
                                        )}
                                    </React.Fragment> }
                            </div>
                        </div>
                    </React.Fragment> : <Loader /> }
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(state) {
    return {
      token: state.auth.token
    };
}

export default connect(mapDispatchToProps)(adminModule)