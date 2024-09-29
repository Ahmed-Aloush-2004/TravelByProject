import {combineReducers, configureStore} from '@reduxjs/toolkit'
import blogPosts from './slices/blogPost'
import user from './slices/user'



const reducer=combineReducers({user,blogPosts})

export default configureStore({
    reducer
})


