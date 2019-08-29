import React from 'react';
import './Header.css';
export default class Header extends React.Component{
    render() {
        return (
            <div className="header">
                <header className="aui-navBar aui-navBar-fixed">
                    <div className="aui-center">
                        <div className="aui-search-box">
                            <i className="icon icon-search"/>
                            <input type="text" placeholder="输入商品名称" />
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}