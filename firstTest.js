import { check } from "k6";
import http from "k6/http";
import { Counter } from "k6/metrics";

export let options = {
    vus: 2,
    duration: '5s'
};

var counter = new Counter("counter")

export default function () {

    let response = http.get("https://reqres.in/api/users?page=2");
    check(response, {

        "is status 200": (r) => r.status === 200
    });
    counter.add(1)
    counter.add(2)

    // console.log(`response body lenght ${response.body.length} for VU= ${__VU}`)
    // console.log(`iteration: ${__ITER}`)
    // console.log(JSON.stringify(response.body))

    let responseBody = JSON.parse(response.body)
    let repsonseArray = responseBody.data
    // console.log(`${JSON.stringify(repsonseArray)}`)

    repsonseArray.forEach(element => {

        console.log(`${element.first_name}`)
    })
}