export const postData = async (url, data) => {
  const baseUrl = "http://127.0.0.1:3001";
  const response = await fetch(baseUrl + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: data,
    mode: "no-cors",
  });
  return response;
};

export const getData = async (url) => {
  const baseUrl = "http://127.0.0.1:3001";
  const response = await fetch(baseUrl + url);
  return response;
};
