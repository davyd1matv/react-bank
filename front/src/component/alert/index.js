export const setAlert = (status, text) => {
  const el = document.querySelector(`.alert`);

  if (status === "progress") {
    el.className = "alert alert--progress";
  } else if (status === "success") {
    el.className = "alert alert--success";
  } else if (status === "error") {
    el.className = "alert alert--error";
  } else {
    el.className = "alert alert--disabled";
  }

  if (text) el.innerText = text;
};
