import React, {useState, useEffect} from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {

    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        const res = await axios.get('http://posts.com/posts');
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    console.log(posts);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div key={post.id} className="m-auto card col-3" >
            <div className="card-body">
            <h4 className="card-title">{post.title}</h4>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <hr/>
            <h5>Comments:</h5>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
            </div>
            )

    });

    return  <div>
                <h3>Post list</h3>
                <div className="row">{renderedPosts}</div>
                
            </div>

}

export default PostList;