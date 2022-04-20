// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";
import { Grid } from "../elements";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  const { history } = props;
  // 이컴포넌트에서 한번만 가지고오면되니깐
  React.useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  console.log(post_list);
  return (
    <React.Fragment>
      <Grid bg={"#EFFF6FF"} padding="2px 0px 0px 0px">
        {/* map을이용하여 개수만큼 포스트불러오기 */}
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => {
            if (user_info && p.user_info.user_id === user_info.uid) {
              return (
                <Grid
                  key={p.id}
                  _onClick={() => {
                    history.push(`/post/${p.id}`);
                  }}
                >
                  <Post {...p} is_me />;
                </Grid>
              );
            } else {
              <Grid
                bg="#ffffff"
                _onClick={() => {
                  history.push(`/post/${p.id}`);
                }}
              >
                return <Post key={p.id} {...p} />;
              </Grid>;
            }
          })}
        </InfinityScroll>
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
