import React from 'react';
import {Icon, List, NavBar, PullToRefresh} from "antd-mobile";
import './Eat.css';
export default class Eat extends React.Component{
    state={
        list:[],
        refreshing:false
    }
    render(){
        let list=this.state.list;
        let {history,match}=this.props;
        return (
            <div className="eat">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                    style={{position:'fixed',left:0,right:0,top:0,zIndex:999}}
                >附近美食</NavBar>
                {/*PullToRefresh 拉动刷新*/}
                <PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.setState({ refreshing: true });
                        this.getData()
                    }}
                >
                    {/*List 列表*/}
                    <List className="my-list">
                        {
                            list.map(item=>(
                                <List.Item
                                    key={item.id}
                                    arrow={'horizontal'}
                                    activeStyle={{background:"#ccc"}}
                                    onClick={()=>history.push({
                                        pathname:'/detail/'+item.id,
                                        search:'?dataName=follow'
                                    })}
                                >
                                    {item.title}
                                    <List.Item.Brief>{item.des}</List.Item.Brief>
                                </List.Item>
                            ))
                        }
                    
                    </List>
                </PullToRefresh>
            </div>
        )
    }
    componentDidMount(){
        this.getData()
    }
    async getData(){
        let res = await Eat.axios({url:'/mock/follow?_limit=10'});
        this.setState({list:res.data.data})
        this.setState({ refreshing: false });
    }
}