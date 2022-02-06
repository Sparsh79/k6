import { check } from "k6";
import http from "k6/http";
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"

export let options = {
    vus: 10,
    duration: '3s'
};

export default function POSTRequestTest() {

    describe("Dummy POST request", (t) => {

        const URL = "https://reqres.in/api/users";
        const payload = JSON.stringify({

            "name": "Batman",
            "job": "Dark Knight"
        });

        let response = http.post(URL, payload);
        console.log(JSON.stringify(response.body));
        // check(response,{
        // "status is 201": statusCode => statusCode.status === 201
        // });

        t.expect(response.status)
            .as("response status")
            .toEqual(201)
    });
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}