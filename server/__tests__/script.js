import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 1000 },
    { duration: '10s', target: 2000 },
    { duration: '15s', target: 4000},
  ]
};

export default function () {
  const res = http.get('http://localhost:3000/products/1');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}