//! 第一版
// import { createSlice, nanoid } from '@reduxjs/toolkit'
// import { sub } from 'date-fns'

// const initReactions = {
//     thumbsUp: 0,
//     hooray: 0,
//     heart: 0,
//     rocket: 0,
//     eyes: 0,
// }

// const initialState = [
//     {
//         id: '1',
//         title: 'First Post!',
//         content: 'Hello!',
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: initReactions,
//     },
//     { 
//         id: '2',
//         title: 'Second Post',
//         content: '更多',
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: initReactions,
//     }
// ]

// const postsSlice = createSlice({
//     name: 'posts',
//     initialState,
//     reducers: {
//         // postAdded(state, action) {
//         //     state.push(action.payload)
//         // },
//         postAdded: {
//             reducer(state, action) {
//                 state.push(action.payload)
//             },
//             prepare(title, content, userId): any {
//                 return {
//                     payload: {
//                         id: nanoid(),
//                         date: new Date().toISOString(),
//                         title,
//                         content,
//                         user: userId,
//                         reactions: initReactions
//                     }
//                 }
//             }
//         },

//         reactionAdded(state, action) {
//             const { postId, reaction } = action.payload
//             const existingPost: any = state.find(post => post.id === postId)
            
//             if (existingPost) {
//                 existingPost.reactions[reaction]++
//             }
        
//         },

//         postUpdated(state, action) {
//             const { id, title, content } = action.payload
//             const existingPost = state.find(post => post.id === id)
            
//             if (existingPost) {
//                 existingPost.title = title
//                 existingPost.content = content
//             }
//         }
//     }
// })


//! 第二版
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
// import { sub } from 'date-fns'

const initialState: any = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts: any = createAsyncThunk(
    'posts/fetchPosts',
    async (initialPost: any) => {
        const response = await client.get('/fakeApi/posts', initialPost)
        return response.data
    }
)

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    // payload 创建者接收部分“{title, content, user}”对象
    async (initialPost: any) => {
        // 我们发送初始数据到 API server
        const response = await client.post('/fakeApi/posts', initialPost)
        // 响应包括完整的帖子对象，包括唯一 ID
        return response.data
    }
  )
  
  

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // postAdded: {
        //     reducer(state, action) {
        //         state.posts.push(action.payload)
        //     },
        //     prepare(title, content, userId): any {
        //         // return {
        //         //     payload: {
        //         //         id: nanoid(),
        //         //         date: new Date().toISOString(),
        //         //         title,
        //         //         content,
        //         //         user: userId,
        //         //         reactions: initReactions
        //         //     }
        //         // }
        //     }
        // },

        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost: any = state.posts.find((post: any) => post.id === postId)
            
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        
        },

        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.posts.find((post: any) => post.id === id)
            
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    },

    extraReducers(builder: any) {
        builder
            .addCase(fetchPosts.pending, (state: any, action: any) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state: any, action: any) => {
                state.status = 'succeeded'
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state: any, action: any) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state: any, action: any) => {
                // 我们可以直接将新的帖子对象添加到我们的帖子数组中
                state.posts.push(action.payload)
            })
    }
})



// export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export const { postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer


export const selectAllPosts = (state: any) => state.posts.posts
export const selectPostById = (state: any, postId: any) =>
  state.posts.posts.find((post: any) => post.id === postId)