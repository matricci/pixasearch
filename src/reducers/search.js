import { SEARCH_IMAGES, SEARCH_TEXT } from '../actions/types'

const initialState = {
    images: [],
    query: ''
}

export default function(state=initialState, action){
    switch(action.type){
        case SEARCH_IMAGES:
            return {
                ...state,
                images: action.payload
            }
        case SEARCH_TEXT:
            return {
                ...state,
                query: action.payload
            }
        default:
            return state;
    }
}