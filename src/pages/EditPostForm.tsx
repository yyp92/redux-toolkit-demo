import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { postAdded, postUpdated } from '../store/features/postsSlice'
import { useNavigate, useParams } from 'react-router-dom'

const EditPostForm  = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const post = useSelector((state: any) =>
        state.posts.find((post: any) => post.id === postId)
    )

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
                >保存文章</button>
            </form>
        </section>
    )
}

export default EditPostForm