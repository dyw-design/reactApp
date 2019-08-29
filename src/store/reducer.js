import * as types from './types';

export default (state,{type,payload})=>{
    switch (type) {
        case types.VIEW_HEAD:
            return {...state,bHead:payload};
        case types.VIEW_FOOT:
            return {...state,bFoot:payload};
        case types.VIEW_LOADING:
            return {...state,bLoading:payload};
        case types.ADD:
            return {...state,...{allGoods:payload+1 }};
        case types.RED:
            return {...state,...{allGoods:payload-1}};
        case types.GET_GOODS:
            return {...state,...{goods:payload}};
        case types.GET_COUNT:
            var sum = 0;
            for(var i = 0;i<state.goods.length;i++)
            {
                sum += state.goods[i].num;
            }
            payload = sum;
            return {...state,allGoods:payload};
        case types.UPDATE_USER:
            //同步localstorage
            window.localStorage.setItem('news_user',JSON.stringify(payload))
            return {...state, user:payload};
        case types.GET_SCROLL:
            return {...state,scrollTop:payload}
        default:
            return state;
    }
}