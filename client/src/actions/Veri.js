import * as api from '../api/index'

export const getPosts = () => async (dispatch) => {
    try {
      const { data } = await api.postlarGetir();
      const action = { type: 'FETCH_ALL', payload: data };
      dispatch(action);
    } catch (error) {
      console.log(error.message);
    }
  };
export const createPost=(post)=>async (dispatch)=>{

    try {
        const {data}=await api.postOlustur(post)
        dispatch({type:'CREATE',payload:data})
    } catch (error) {
        console.log(error.message);
    }
}
export const updatedPost=(id,post)=>async (dispatch)=>{
  try {
    const {data}=await api.postGuncelle(id,post);
    dispatch({type:"UPDATE",payload:data})
  } catch (error) {
    console.log(error.message)
  }
}
export const deletePost=(id)=>async (dispatch)=>{

  try {
      
      await api.postSil(id);

      dispatch({type:'DELETE',payload:id})
  } catch (error) {
      console.log(error.message);
  }
}
export default {}