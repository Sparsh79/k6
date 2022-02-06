import http from "k6/http";

export default function(){

    var response = http.get("https://reqres.in/api/users?page=2");

}