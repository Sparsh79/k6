import http from "k6/http";
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import { check } from "k6";


const URL = "https://reqres.in/api/users/2";

export let options = {
    vus: 10,
    duration: '2s'
};


export default function deleteOperation(){

    describe("dummy delete request",()=>{

        var response = http.del(URL,null)
        console.log(JSON.stringify(response.body))

        check(response, {
            "status is 204": statusCode => statusCode.status === 204
        });
    });
}