import { sleep } from "k6";
import http from "k6/http";
import { Counter } from "k6/metrics";

var retryCounter = new Counter("max retry");

export let options = {
    vus: 30,
    duration: '5s'
};

export default function () {

    // retryCounter.add(1)
    for (var retries = 5; retries > 0; retries--) {
        var response = http.get("https://reqres.in/api/users?page=2");
        if (response.status !== 200) {

            retryCounter.add(1)
            console.log(`response is incorrect, retry number ${retries}, VUS=${__VU}, ITR=${__ITER}, sleeping for a second`)
            // if not correct, we need to retry after 1 sec
            // need to add a retry mechanism, hence the for loop
            sleep(1);
        }
        else {
            //response is correct, no need to call for loop
            retries == 0;
            console.log("Correct response")

        }
    }

}