import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 1000 },
    { duration: '28s', target: 1000 },
    { duration: '1s', target: 0 },
  ]
};

// export default function () {
//   const res = http.get('http://localhost:3001/products');
//   check(res, { 'status was 200': (r) => r.status == 200 });
//   sleep(1);
// }
export default function () {
  let testId = Math.floor(Math.random() * (2219279 - 1997351) + 1997351)
  const res = http.get(`http://localhost:3001/products/${testId}`, { tags: { name: 'productId' }});
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
// export default function () {
//   let testId = Math.floor(Math.random() * (1958102 - 1762291) + 1762291)
//   const res = http.get(`http://localhost:3001/products/${testId}/styles`, { tags: { name: 'productId' }});
//   check(res, { 'status was 200': (r) => r.status == 200 });
//   sleep(1);
// }
// export default function () {
//   let testId = Math.floor(Math.random() * (4508263 - 4057436) + 4057436)
//   const res = http.get(`http://localhost:3001/products/${testId}/related`, { tags: { name: 'productId' }});
//   check(res, { 'status was 200': (r) => r.status == 200 });
//   sleep(1);
// }