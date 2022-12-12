import http from "./httpService";

const apiEndpoint = "http://127.0.0.1:4000/api/cows";

function cowUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCows() {
  return http.get(apiEndpoint);
}

export function getCow(id) {
  return http.get(cowUrl(id));
}

export function saveCow(cow) {
  if (cow._id) {
    const body = { ...cow };
    delete body._id;
    return http.put(cowUrl(cow._id), body);
  }
  return http.post(apiEndpoint, cow);
}

export function deleteCow(id) {
  return http.delete(cowUrl(id));
}
