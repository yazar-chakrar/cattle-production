import http from "./httpService";

const apiEndpoint = "http://127.0.0.1:4000/api/milk-prod";

function milkProdUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMilkProds() {
  return http.get(apiEndpoint);
}

export function getMilkProd(id) {
  return http.get(milkProdUrl(id));
}

export function saveMilkProd(cow) {
  if (cow._id) {
    const body = { ...cow };
    delete body._id;
    return http.put(milkProdUrl(cow._id), body);
  }
  return http.post(apiEndpoint, cow);
}

export function deleteMilkProd(id) {
  return http.delete(milkProdUrl(id));
}
