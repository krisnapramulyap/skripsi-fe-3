import React from "react";

function ErrorHandling({ msg, isSuccess, top, bottom }) {
  return (
    <div
      className="rubik-600 text-center"
      style={{
        color: isSuccess ? "#1EC15F" : "#FF5B37",
        marginTop: top,
        marginBottom: bottom,
      }}
    >
      {msg}
    </div>
  );
}

export default ErrorHandling;
