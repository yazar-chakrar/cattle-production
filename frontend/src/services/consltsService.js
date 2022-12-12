import http from "./httpService";

const apiEndpoint = "http://127.0.0.1:4000/api/conslts";

function consltUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getConslts() {
  return http.get(apiEndpoint);
}

export function getConslt(id) {
  return http.get(consltUrl(id));
}

export function saveConslts(conslt) {
  if (conslt._id) {
    const body = { ...conslt };
    delete body._id;
    return http.put(consltUrl(conslt._id), body);
  }
  return http.post(apiEndpoint, conslt);
}

export function deleteConslt(id) {
  return http.delete(consltUrl(id));
}
