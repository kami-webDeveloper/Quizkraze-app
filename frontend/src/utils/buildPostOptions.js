// POST options helper object
const buildPostOptions = (data) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  };
};

export default buildPostOptions;
