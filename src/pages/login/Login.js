import React from 'react';
import './Login.css';
import {UPDATE_USER, VIEW_FOOT, VIEW_HEAD} from "../../store/types";
import {connect} from "react-redux";
import asyncAction from "../../store/asyncAction";
class Login extends React.Component{
    state = {
        username:'',
        password:''
    }
    // login = ()=>{
    //    Login.axios({
    //        url:'/mock/login',
    //        params:{username:this.state.username,password:this.state.password}
    //    }).then(
    //        res => {
    //            console.log(this.props)
    //            console.log(res)
    //        }
    //    )
    // }
    goReg = ()=>{
        this.props.history.push('/reg')
    }
    getUser = (ev)=>{
        this.setState(
            {
                username:ev.target.value
            }
        )
    }
    getPass = (ev)=>{
        this.setState(
            {
                password:ev.target.value
            }
        )
    }
    render() {
        return (
            <div className="login">
                <div onClick={()=>this.props.history.push('/home')} style={{font:"16px/2 ''",color:'green'}}><span style={{lineHeight:'32px',display:'block'}}>&lt;返回首页</span></div>
                <div className="welcome"><img src="/asserts/img/welcome.png"/></div>
                <div className="login-form">
                    <div className="login-inp"><label>用户名</label><input type="text" placeholder="请输入用户名" onChange={this.getUser}/></div>
                    <div className="login-inp"><label>密码</label><input type="password" placeholder="请输入密码" onChange={this.getPass}/></div>
                    <div className="login-inp"><a onClick={this.login}>登录</a></div>
            </div>
        <div className="login-txt"><a onClick={this.goReg}>立即注册</a>|<a href="#">忘记密码？</a>
    </div>
        <div style={{textAlign:'center'}}>
        </div>
    </div>
    )
    }
}

const initMapDispatchToProps=(dispatch,ownProps)=>({
    login:({username,password,history,_this})=>dispatch(asyncAction({
        apiname:'login',
        params:{username,password},
        typeName:UPDATE_USER
    })).then(
        res=>{
            if (res.err===0){
                ownProps.history.push('/user')
            } else {
                _this.setState({mess:res.msg})
            }
            //同步localstorage
        }
    )
});

export default connect(null,initMapDispatchToProps)(Login);