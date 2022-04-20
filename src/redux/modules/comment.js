import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";

// 액션타입
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const LOADING = "LOADING";

// 액셩생성자
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const getCommentFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    // post_id가 없으면 애초에 쿼리 검색을 x => if문써서 확인먼저
    if (!post_id) {
      return;
    }

    // firestore에서(collection) 가져오기
    const commentDB = firestore.collection("comment");

    // 쿼리문법
    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let list = [];

        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setComment(post_id, list));
      })
      .catch((err) => {
        console.log("댓글 정보를 가져올 수 없네요", err);
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {}),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
};

export { actionCreators };
