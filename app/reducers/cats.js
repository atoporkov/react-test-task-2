import {
    FETCH_CATS_FULFILLED_GET,
    FETCH_CAT_FULFILLED_DELETE,
    FETCH_CATS_REJECTED,
    FETCH_CATS_SORTING,
    FETCH_CATS_BY_QUERY
} from '../actions/cats';

export default function cats (state = {
   data: [],
   query: "",
   sorting: 'AGE_ASC',
   error: null
}, action) {
   switch(action.type){
       case FETCH_CATS_FULFILLED_GET: {
           return {...state, data: action.payload};
       }
       case FETCH_CAT_FULFILLED_DELETE: {
           return {...state, data: state.data.filter(item => item.id != action.payload)};
       }
       case FETCH_CATS_REJECTED: {
           return {...state, error: action.payload}
       }
       case FETCH_CATS_BY_QUERY: {
           return {...state, query: action.payload ? action.payload : ""}
       }
       case FETCH_CATS_SORTING: {
           return {...state, sorting: action.payload ? action.payload : 'AGE_ASC'}
       }
       default: {
           return state;
       }
   }
}
