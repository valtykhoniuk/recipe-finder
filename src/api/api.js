const API = "https://691e7e99bb52a1db22be0ee9.mockapi.io/api/v1";

export async function controller(path, method = "GET", body) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await response.json();

  return data;
}
