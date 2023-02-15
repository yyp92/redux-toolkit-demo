import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { postAdded } from '../store/features/postsSlice'

const AddPostForm = () => {
    const dispatch = useDispatch()
    const users = useSelector((state: any) => state.users)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const onTitleChanged = (e: any) => setTitle(e.target.value)
    const onContentChanged = (e: any) => setContent(e.target.value)
    const onAuthorChanged = (e: any) => setUserId(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content, userId)
            )
        
            setTitle('')
            setContent('')
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map((user: any) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))

    return (
        <section>
            <h2>添加新文章</h2>

            <form style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                    <label htmlFor="postTitle">文章标题:</label>

                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>

                <div  style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                    <label htmlFor="postAuthor">Author:</label>

                    <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                        <option value=""></option>
                        {usersOptions}
                    </select>
                </div>

                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                    <label  htmlFor="postContent">内容：</label>

                    <textarea
                        id="postContent"
                        name="postContent"
                        value={content}
                        onChange={onContentChanged}
                    />
                </div>
                
                <button
                    style={{margin: '20px auto', width: '120px'}}
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >保存文章</button>
            </form>
        </section>
    )
}

export default AddPostForm