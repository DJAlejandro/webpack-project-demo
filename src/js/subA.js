import _ from "lodash-es"
import {minus} from "./caculate.js"

console.log(minus(4,2))

_.includes([1, 2, 3], 1)
_.reverse([1, 2, 3])

let users = [
    { "user": "fred", "age": 48 },
    { "user": "barney", "age": 34 },
    { "user": "fred", "age": 42 },
    { "user": "barney", "age": 36 }
]

let newUsers = _.tail(users)

let output = _.last(newUsers)

export default output
