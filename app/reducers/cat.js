import {
    FETCH_CAT_FULFILLED_GET,
    FETCH_CAT_FULFILLED_PUT,
    FETCH_CAT_FULFILLED_POST,
    FETCH_CAT_FULFILLED_DELETE,
    FETCH_CAT_REJECTED
} from '../actions/cats';

export default function cat (state = {
   data: [],
   submitted: false,
   error: null
}, action) {
   switch(action.type){
       case FETCH_CAT_FULFILLED_GET: {
           return {...state, data: action.payload};
       }
       case FETCH_CAT_FULFILLED_POST: {
           return {...state, submitted: true, data: [...state.data, action.payload]};
       }
       case FETCH_CAT_FULFILLED_PUT: {
           return {...state, submitted: true, data: [...state.data.filter(item => item.id != action.payload.id), action.payload]};
       }
       case FETCH_CAT_REJECTED: {
           return {...state, submitted: true, error: action.payload}
       }
       default: {
           return state;
       }
   }
}
