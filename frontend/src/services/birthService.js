import http from "./httpService";

const apiEndpoint = "http://127.0.0.1:4000/api/births";

function birthUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getBirths() {
  return http.get(apiEndpoint);
}

export function getBirth(id) {
  return http.get(birthUrl(id));
}

export function saveBirth(cow) {
  if (cow._id) {
    const body = { ...cow };
    delete body._id;
    return http.put(birthUrl(cow._id), body);
  }
  return http.post(apiEndpoint, cow);
}

export function deleteBirth(id) {
  return http.delete(birthUrl(id));
}
