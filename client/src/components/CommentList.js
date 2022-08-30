import React from 'react';

const CommentList = ({comments}) =>{
const renderedComments = comments.map((comment) => {
    let content;
    if(comment.status === 'approved'){
        content = comment.content;
    }
    if(comment.status === 'pending'){
        content = 'This comment is awaiting moderation.';
    }
    if(comment.status === 'rejected'){
        content = 'This comment has been rejected.';
    }
    return (
    <div key={comment.commentId} className="row" >
        <p >&#8226; {content}</p>
    </div>
    );
});

return (
    <div className="container">{renderedComments}</div>
    );

}

export default CommentList;