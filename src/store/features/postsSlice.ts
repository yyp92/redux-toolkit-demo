import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initReactions = {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
}

const initialState = [
    {
        id: '1',
        title: 'First Post!',
        content: 'Hello!',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: initReactions,
    },
    { 
        id: '2',
        title: 'Second Post',
        content: '更多',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: initReactions,
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // postAdded(state, action) {
        //     state.push(action.payload)
        // },
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId): any {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: initReactions
                    }
                }
            }
        },

        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost: any = state.find(post => post.id === postId)
            
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        
        },

        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(post => post.id === id)
            
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer