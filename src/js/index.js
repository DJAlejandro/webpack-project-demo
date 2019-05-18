import "../css/index.scss"
import Vue from "vue"

const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
console.log(s);

const app = new Vue({
    el: "#app",
    data: {
        message: "Hello Vue!"
    }
});
console.log(app);

jQuery(document).ready(function($) {
    $("#btn1").click(function() {
        import(/* webpackChunkName:"subA" */ "./subA.js").then(subA => {
            return subA.default
        }).catch(function() {})
    });
});

jQuery(document).ready(function($) {
    $("#btn1").click(function() {
        import(/* webpackChunkName:"lodash-es-difference" */ "lodash-es/difference").then(difference => {
            const array3 = difference.default([3, 2, 1], [4, 2])
            // => [3, 1]
            return "diff=" + array3;
        }).catch(function() {})
    });
});

if (process.env.NODE_ENV === "development") {
    console.log("development")
} else if (process.env.NODE_ENV === "production") {
    console.log("production")
}
