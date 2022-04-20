// debounce예제
import React from "react";
import _ from "lodash";

const Search = () => {
  const debounce = _.debounce((e) => {
    console.log(e.target.value);
  }, 1000);

  const onChange = (e) => {
    console.log(e.target.value);
  };

  const thorttle = _.throttle((e) => {
    console.log(e.target.value);
  }, 1000);
  return (
    <div>
      <input type="text" onChange={thorttle} />
    </div>
  );
};

export default Search;
