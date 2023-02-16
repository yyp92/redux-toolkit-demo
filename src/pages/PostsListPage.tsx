import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostsListPage = () => {
    const posts = useSelector((state: any) => state.posts)

    // 根据日期时间对文章进行倒序排序
    const orderedPosts = posts.slice().sort((a: any, b: any) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map((post: any) => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>

            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            
            <p className="post-content">{post.content.substring(0, 100)}</p>

            <ReactionButtons post={post} />
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