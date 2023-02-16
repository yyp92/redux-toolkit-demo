//! 第一版
// import { createSlice } from '@reduxjs/toolkit'

// const initialState = [
//     { id: '0', name: 'Tianna Jenkins' },
//     { id: '1', name: 'Kevin Grant' },
//     { id: '2', name: 'Madison Price' }
// ]

// const usersSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {}
// })

// export default usersSlice.reducer


//! 第二版
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState: any = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export default usersSlice.reducer