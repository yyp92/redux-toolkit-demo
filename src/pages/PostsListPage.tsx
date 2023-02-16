import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from '../store/features/postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import Spinner from './Spinner'
import ReactionButtons from './ReactionButtons'


const PostExcerpt = ({post}: any) => {
    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>

            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    )
}


const PostsListPage = () => {
    // const posts = useSelector((state: any) => state.posts)
    const posts = useSelector(selectAllPosts)
    const dispatch = useDispatch()
    const postStatus = useSelector((state: any) => state.posts.status)
    const error = useSelector((state: any) => state.posts.error)
    let content: any = null

    // 根据日期时间对文章进行倒序排序
    // const orderedPosts = posts.slice().sort((a: any, b: any) => b.date.localeCompare(a.date))

    React.useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts() as any)
        }
    }, [postStatus, dispatch])


    if (postStatus === 'loading') {
        content = <Spinner text="Loading..." />
    }
    else if (postStatus === 'succeeded') {
        const orderedPosts = posts
            .slice()
            .sort((a: any, b: any) => b.date.localeCompare(a.date))


        content = orderedPosts.map((post: any) => (
            <PostExcerpt key={post.id} post={post} />
        ))
    }
    else if (postStatus === 'failed') {
        content = <div>{error}</div>
    }

    // const renderedPosts = orderedPosts.map((post: any) => (
    //     <article className="post-excerpt" key={post.id}>
    //         <h3>{post.title}</h3>

    //         <div>
    //             <PostAuthor userId={post.user} />
    //             <TimeAgo timestamp={post.date} />
    //         </div>
            
    //         <p className="post-content">{post.content.substring(0, 100)}</p>

    //         <ReactionButtons post={post} />
    //         <Link to={`/posts/${post.id}`}>
    //             View post
    //         </Link>
    //     </article>
    // ))

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsListPage