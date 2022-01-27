import { check } from "k6";
import http from "k6/http";

export let options = {
    vus: 10,
    duration: '3s'
};

export default function(){

    let response = http.get("https://reqres.in/api/users?page=2");
    check (response, {

    "is status 200":(r) => r.status === 200 
    });
}