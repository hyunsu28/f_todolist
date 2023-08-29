import React from "react";
import { Link } from "react-router-dom";

function Create() {
  return (
    <>
      <div>
        제목 :<input />
      </div>
      <div>
        내용 :<input />
      </div>
      <Link to="/main">
        <button>Write</button>
      </Link>
    </>
  );
}

export default Create;
