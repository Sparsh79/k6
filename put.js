import http from "k6/http";
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import { check } from "k6";

const URL = "https://reqres.in/api/users/2";

export const options = {
    stages: [
      { duration: '2m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 2 minutes.
      { duration: '1m', target: 100 }, // stay at 100 users for 1 minutes
      { duration: '5s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
      'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
      'all put request': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
  };

export default function PUTRequestTest(){

    describe("Dummy PUT request",()=>{

        var payload = JSON.stringify({
            "name": "Batman",
            "job": "Dark Knight Rises"
        })

        var response = http.put(URL, payload)
        check(response,{
            "status is 200": statusCode => statusCode.status === 200,
            "isUpdated key present": jsonField => jsonField.json().hasOwnProperty("updatedAt")
        });

        console.log(JSON.stringify(response.body));
    })
}