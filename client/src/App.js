import React from 'react';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

const app = () => { 
    return <div className="container">
        <h1>Blog App !</h1>
        <CreatePost/>
        <hr/>
        <PostList/>
        </div>;
 }; 

export default app;