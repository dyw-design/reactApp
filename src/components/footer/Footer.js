import React from 'react';
import './Footer.css';
import {NavLink,Route} from 'react-router-dom';
import {TabBar} from "antd-mobile";
class Footer extends React.Component{
    state = {
        selectedTab: 'home',
        tabs: [
            {
                id: 1,
                title: '首页',
                key: 'home',
                path: '/home',
                icon: '/asserts/img/home.png',
                selectedIcon: '/asserts/img/home_active.png'
            },
            {
                id: 2,
                title: '分类',
                key: 'category',
                path: '/classify',
                icon: '/asserts/img/category.png',
                selectedIcon: '/asserts/img/category_active.png'
            },
            {
                id: 3,
                title: '吃啥',
                key: 'eat',
                path: '/eat',
                icon: '/asserts/img/category.png',
                selectedIcon: '/asserts/img/category_active.png'
            },
            {
                id: 4,
                title: '购物车',
                key: 'shopcart',
                path: '/cart',
                icon: '/asserts/img/shop-cart-1.png',
                selectedIcon: '/asserts/img/shop-cart-1_active.png'
            },
            {
                id: 5,
                title: '我的',
                key: 'user',
                path: '/user',
                icon: '/asserts/img/user.png',
                selectedIcon: '/asserts/img/user__active.png'
            },
        ]
    };
    componentWillReceiveProps(nextProps) {
        this.routerWatch(nextProps.location.pathname)
    }
    
    componentDidMount() {
        this.routerWatch(this.props.location.pathname)
    }
    
    routerWatch(path) {//footer内部对props观测，取出变化的path对比tabs数据后修改selectedTab
        this.state.tabs.map(item=>{
            if (path.indexOf(item.path)!==-1){
                this.setState({selectedTab:item.key})
            }
        })
        
    }
    
    checkPath(index, key) {
        // console.log(index)
        this.setState({
            selectedTab: key,
        });
        
        //编程式跳转
        // console.log(this)
        this.props.history.push(this.state.tabs[index].path)
        
    }
    render() {
        let tabs = this.state.tabs;
        return (
            <div className="footer">
            <TabBar
                unselectedTintColor="#888"
                tintColor="#399"
                barTintColor="white"
            >
                {
                    tabs.map((item, index) => (
                        <TabBar.Item
                            title={item.title}
                            key={item.key}
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + item.icon + ') center center /  21px 21px no-repeat'
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + item.selectedIcon + ') center center /  21px 21px no-repeat'
                            }}
                            />
                            }
                            selected={this.state.selectedTab === item.key}
                            onPress={() => this.checkPath(index, item.key)}
                            data-seed="logId"
                        >
                        </TabBar.Item>
                    ))
                }
    
            </TabBar>
        </div>
        )
    }
}
export default Footer;