import http from './httpService'

export function getCows() {
    return http.get('http://127.0.0.1:4000/api/cows')
  }