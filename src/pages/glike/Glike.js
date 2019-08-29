import React from 'react';
import './Glike.css';
import ReactDOM from 'react-dom';
import { PullToRefresh} from 'antd-mobile';
class Glike extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            glikes: [],
            isHasMore:false,
            count:1
          };
    }
    componentDidMount(){
        this.getData();
    }
    async getData(){
        fetch('/mock/glike?_limit=10&_page='+this.state.count).then(
          res => res.json()
        ).then(
          data => {
            this.setState({glikes:this.state.glikes.concat(data.data)})
            this.setState({ refreshing: false });
            this.setState({ count: this.state.count + 1});
          }
        )
      }
    clickHandler=(id,dataName,ev)=>{
        this.props.history.push({
            pathname:'/detail/'+id, 
            search:'?dataName='+dataName
        })
    };
    render(){
        let {glikes,count} = this.state;
        // console.log(count);
        return (
            <div className="glike">
                <div className="aui-list-theme-box aui-list-theme-two">
                    <PullToRefresh
                    damping={100}
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    indicator={{ deactivate: '上拉可以刷新' }}
                    direction='up'
                    refreshing={this.state.refreshing}
                    onRefresh={() => {  
                    console.log('此处执行了嘛');                  
                    setTimeout(() => {
                        this.setState({ refreshing: false });
                    }, 1000);
                    this.getData()
                    }}
                >
                    {
                        glikes.map((item,index)=>(
                            <a className="aui-list-item" onClick={this.clickHandler.bind(null,item.id,'glike')} key={index}>
                                <div className="aui-list-theme-img">
                                    <img src={item.banner} alt=""/>
                                </div>
                                <div className="aui-list-theme-message">
                                    <h3 className="aui-list-theme-title">{item.title}400g</h3>
                                    <span><em>￥</em>{item.price}<i>.80</i> <em className="line">￥{item.origin_price}.00</em></span>
                                    <div className="aui-car-icon">
                                        <img src="/asserts/img/car.png" alt=""/>
                                    </div>
                                </div>
                            </a>
                        ))
                    }
                </PullToRefresh>        
                </div>
            </div>
        )
    }
}
export default Glike;