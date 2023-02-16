import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
// import { postAdded } from '../store/features/postsSlice'
import { addNewPost } from '../store/features/postsSlice'

import '../app.css'

const AddPostForm = () => {
    const dispatch = useDispatch()
    const users = useSelector((state: any) => state.users)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const onTitleChanged = (e: any) => setTitle(e.target.value)
    const onContentChanged = (e: any) => setContent(e.target.value)
    const onAuthorChanged = (e: any) => setUserId(e.target.value)

    const onSavePostClicked = async () => {
        // if (title && content) {
        //     // dispatch(
        //     //     postAdded(title, content, userId)
        //     // )
        
        //     setTitle('')
        //     setContent('')
        // }

        if (canSave) {
            try {
                setAddRequestStatus('pending')

                await dispatch(
                    addNewPost({
                        title,
                        content,
                        user: userId
                    }) as any
                ).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
            }
            catch (err) {
                console.error('Failed to save the post: ', err)
            }
            finally {
              setAddRequestStatus('idle')
            }
        }
    }

    // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const usersOptions = users.map((user: any) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                <option value=""></option>
                {usersOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
                />
                
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
                Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPostForm