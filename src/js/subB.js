import _ from "lodash-es"
import {minus} from "./caculate.js"

console.log(minus(1,2))

_.includes([1, 2, 3], 1, 2)

_.remove([1, 2, 3, 4], function(n) {
    return n % 2 === 0
});

let users = [
    { "user": "fred2", "age": 38 },
    { "user": "barney2", "age": 43 },
    { "user": "fred2", "age": 43 },
    { "user": "barney2", "age": 34 }
]

let newUsers = _.tail(users)

let output = _.last(newUsers)

export default output
