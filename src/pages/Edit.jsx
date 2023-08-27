import React from "react";
import { Link } from "react-router-dom";
function Edit() {
  return (
    <>
      제목 : <input />
      내용 : <input />
      <Link to="/main">
        <button>Edit</button>
      </Link>
    </>
  );
}

export default Edit;
