import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
// import { postAdded, postUpdated, selectPostById } from '../store/features/postsSlice'
import { postUpdated, selectPostById } from '../store/features/postsSlice'
import { useNavigate, useParams } from 'react-router-dom'

const EditPostForm  = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const post = useSelector((state: any) => selectPostById(state, postId))

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const onTitleChanged = (e: any) => setTitle(e.target.value)
    const onContentChanged = (e: any) => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
        dispatch(postUpdated({ id: postId, title, content }))
        navigate(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>添加新文章</h2>

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

                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                
                <button type="button" onClick={onSavePostClicked}>
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default EditPostForm