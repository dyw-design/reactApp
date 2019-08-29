import React from 'react';
export default class Reg extends React.Component{
    goLogin = () => {
        console.log(this.props)
        this.props.history.push('/login');
    }
    state = {
    
    }
    reg = ()=>{
        console.log(111);
        Reg.axios(
            {
                url:'/mock/reg',
                method:'post',
                data:{username:this.refs.username.value,nikename:this.refs.nikename.value,password:this.refs.password.value}
            }
        ).then(res=>{
            if(res.data.err == 0){
                this.props.history.push('/login');
            }else{
                alert(res.data.msg);
            }
        })
    }
    render() {
        return (
            <div className="login">
                <div onClick={()=>this.props.history.push('/home')} style={{font:"16px/2 ''",color:'green'}}><span style={{lineHeight:'32px',display:'block'}}>&lt;返回首页</span></div>
                <div className="welcome"><img src="/asserts/img/welcome.png" /></div>
                <div className="me-img">
                    <img name="adapter" />
            </div>
        <div className="login-form">
            <div className="login-inp"><label>用户名</label><input type="text" placeholder="请输入用户名" ref='username'/></div>
            <div className="login-inp"><label>昵称</label><input type="text" placeholder="请输入昵称" ref='nikename'/></div>
            <div className="login-inp"><label>密码</label><input type="password" placeholder="请输入密码" ref='password'/></div>
            <div className="login-inp"><a onClick={this.reg}>注册</a></div>
    </div>
        <div className="login-txt"><a onClick={this.goLogin}>去登录</a>|<a href="#">忘记密码？</a>
    </div>
        <div style={{textAlign:'center'}}>
        </div>
    </div>
        )
    }
}
