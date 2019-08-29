import {VIEW_LOADING} from './types';

export default ({apiname,params,typeName})=>(dispatch,getState)=>{
  // dispatch({type:VIEW_LOADING,payload:true});
  // console.log('asyncactions','/mock/'+apiname);
  return axios({
    url:'/mock/'+apiname,
    params:params||null
  }).then(
    res=>{
      dispatch({type:typeName,payload:res.data});
      // dispatch({type:VIEW_LOADING,payload:false});
      return {err:res.data.err,msg:res.data.msg};
    }
  );
}