import React from "react";
import _ from "lodash";
import { Spinner } from "../elements";

const InfinityScroll = (props) => {
  // callNext: 받아온 다음 리스트로 보내버려
  const { children, callNext, is_next, loading } = props;
  // 300밀리초에 한번만 실행해라
  const _handleScroll = _.throttle(() => {
    // 로딩중이니? 그러면 끝내라
    if (loading) {
      return;
    }

    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      document.documentElement & document.documentElement.scrollTop ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      callNext();
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (is_next) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
    // 클래스형컴포넌트에서는 이벤트 언마운트==함수형컴포넌트에서는 return넘겨버리면된다.
  }, [is_next, loading]);

  return (
    <>
      {props.children}
      {is_next && <Spinner />}
    </>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};
export default InfinityScroll;
