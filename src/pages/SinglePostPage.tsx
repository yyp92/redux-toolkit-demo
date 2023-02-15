import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import PostAuthor from './PostAuthor'

const SinglePostPage = () => {
    const { postId } = useParams()

    const post = useSelector((state: any) =>
        state.posts.find((post: any) => post.id === postId)
    )

    if (!post) {
        return (
            <section>
                <h2>页面未找到！</h2>
            </section>
        )
    }

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>

                <PostAuthor userId={post.user} />
                <p className="post-content">{post.content}</p>

                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
            </article>
        </section>
    )
}

export default SinglePostPage