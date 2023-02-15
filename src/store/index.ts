// ! index.ts 文件

import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import postsSlice from "./features/postsSlice";
import usersReducer from './features/usersSlice'

// configureStore创建一个redux数据
const store = configureStore({
    // 合并多个Slice
    reducer: {
        counter: counterSlice,
        posts: postsSlice,
        users: usersReducer
    },
});

export default store;

