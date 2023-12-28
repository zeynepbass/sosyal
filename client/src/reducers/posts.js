export default(posts=[],action)=>{
    switch(action.type){
        case 'FETCH_ALL':
        return action.payload;
        case 'CREATE':
       return [action.payload, ...posts];
       case "UPDATE":
        return posts.map(post=>post._id===action.payload._id ? action.payload : post)
        case "DELETE":
         return posts.filter(p=>p._id!==action.payload)
       default: 
        return posts;
    }
}