import api from '../api'
import { SEARCH_IMAGES, SEARCH_TEXT } from './types'

export const searchImages = (text, page) => (dispatch) => {
    console.log(text)
    api.get(`&q=${text}&page=${page}`).then(res =>{
        dispatch({
            type: SEARCH_IMAGES,
            payload: res.data
        })
    }).catch(e => console.log(e.response)) 
}

export const searchText = (text) => dispatch => {
    dispatch({
        type: SEARCH_TEXT,
        payload: text
    })
} 