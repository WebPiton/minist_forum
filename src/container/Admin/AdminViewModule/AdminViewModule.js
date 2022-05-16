import React, { Component } from "react";
// import './Module.css'
import { nanoid } from 'nanoid'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import axios from "../../../axios/axios";
import Loader from "../../../component/Loader/Loader";

class AdminViewModule extends Component{
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
                console.log(parentId);
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
                                                {console.log(item)}
                                                {item.childIds.length === 0 ?
                                                    item.desc !== "Automatic" ?
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
                                                        null :
                                                    <div className="moduleCard" onClick={() => further(item._id)}>
                                                        <p key={nanoid()}>{item.childIds.length >= 0 ? "Модуль:" : null} {item.name}</p>
                                                    </div>}
                                            </React.Fragment>
                                        )}
                                    </React.Fragment> }
                            {/* <h1>Заблокированные модули</h1>
                                {this.state.module.map((item) =>
                                    item.accessibly === false ?
                                        <div className="Item_card_locked" key={nanoid()}>
                                            <h1 key={nanoid()}>{item.moduleName}</h1>
                                            <h1 key={nanoid()}>Выполнено: {item.done}% из 100%</h1>
                                        </div> : null
                                )} */}
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

export default connect(mapDispatchToProps)(AdminViewModule)