import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'

const PostsListPage = () => {
    const posts = useSelector((state: any) => state.posts)

    const renderedPosts = posts.map((post: any) => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.user} />
            <p className="post-content">{post.content.substring(0, 100)}</p>

            <Link to={`/posts/${post.id}`}>
                View post
            </Link>
        </article>
    ))

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsListPage