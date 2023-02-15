import { useState } from 'react'

// 引入相关的hooks
import {useSelector, useDispatch} from 'react-redux';
// 引入对应的方法
import {increment, decrement, incrementAsync} from '../store/features/counterSlice';

import reactLogo from './assets/react.svg'

function CounterPage() {
  // 通过useSelector直接拿到store中定义的value
  const {value} = useSelector((store: any) => store.counter)
  // 通过useSelector直接拿到store中定义的list
  const {list} = useSelector((store: any) => store.movie)
  // 通过useDispatch 派发事件
  const dispatch = useDispatch()
  // 变量
  const [amount, setAmount] = useState<number>(1);

  return (
    <div>
        {/* 页面中应用的代码 */}
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <p>{value}</p>

            <input value={amount} onChange={(e) => setAmount(+e.target.value)}/>

            <button 
                style={{marginTop: '10px'}}
                onClick={() => {
                    dispatch(increment({value: amount}))
                }}
            >加</button>

            <button
                style={{marginTop: '10px'}}
                onClick={() => {
                    dispatch(decrement())
                }}
            >减</button>

            <button
                style={{marginTop: '10px'}}
                onClick={() => {
                    dispatch(incrementAsync(Number(amount)) as any)
                }}
            >异步加</button>
        </div>
    </div>
  )
}

export default CounterPage
