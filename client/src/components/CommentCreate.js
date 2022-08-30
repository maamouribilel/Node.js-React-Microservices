import React, {useState} from 'react';
import axios from 'axios';

const CommentCreate = ({postId})=>{

    const [comment, setComment] = useState('');

    const onSubmit = async (event)=>{
    event.preventDefault();
    await axios.post(`http://posts.com/posts/comments/create/${postId}`, {content: comment});
    setComment('');
    };

    return (
    <form onSubmit={onSubmit}>
        <div className="form-group">
            <label>New Comment</label>
            <input value={comment} onChange={(e)=> setComment(e.target.value)} className="form-control" type="text"/>
            {comment}
        </div>
        <button className="btn btn-success">Save</button>
    </form>
        );
}
export default CommentCreate;