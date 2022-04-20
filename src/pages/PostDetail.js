import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { useDispatch, useSelector } from "react-redux";
import user from "../redux/modules/user";
import { actionCreators as postActions } from "../redux/modules/post";
import { firestore } from "../shared/firebase";
const PostDetail = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();

  console.log(id);
  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((store) => store.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
  },[]);

  return (
    <React.Fragment>
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
      <CommentWrite post_id={id} />
      <CommentList post_id={id}/>
    </React.Fragment>
  );
};

export default PostDetail;
