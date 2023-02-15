// ! counterSlice.ts 文件

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0,
};

// 创建一个 Slice 
export const counterSlice = createSlice({
    name: 'counter',
    initialState,

    // 定义 reducers 并生成关联的操作
    reducers: {
        // 定义一个加的方法
        increment: (state, {payload}) => {
            state.value += 1;
        },
        
        // 定义一个减的方法
        decrement: (state) => {
            state.value -= 1;
        },

        incrementByAmount: (state, action) => {
            // action 里面有 type 和 payload 两个属性，所有的传参都在payload里面
            state.value += action.payload
        }
    },
});

// 导出加减的方法
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 默认导出
export default counterSlice.reducer;

// ? 异步
// 下面这个函数就是一个 thunk ，它使我们可以执行异步逻辑
// 你可以 dispatched 异步 action `dispatch(incrementAsync(10))` 就像一个常规的 action
export const incrementAsync = (amount: number) => (dispatch: any) => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount))
    }, 1000)
  }

