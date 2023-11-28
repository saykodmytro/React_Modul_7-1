import React from 'react';
import { useParams } from 'react-router-dom';

const PostsComments = () => {
  const { postId } = useParams();

  return <div>Posts Comments: {postId}</div>;
};

export default PostsComments;
