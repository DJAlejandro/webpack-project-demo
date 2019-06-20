// cSpell:ignore prefetch
import Vue from "vue";
import "../css/index.scss";
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

jQuery(document).ready(function ($) {
    $("#btn1").click(function () {
        import(
            /* webpackChunkName:"subA" */
            /* webpackPrefetch: true */
            "./subA.js"
        ).then(({
            default: _
        }) => {
            return _
        }).catch(function () {})
    });
});

jQuery(document).ready(function ($) {
    $("#btn1").click(function () {
        import(
            /* webpackPrefetch: true */
            /* webpackChunkName:"lodash-es-difference" */
            "lodash-es/difference"
        ).then(({
            default: difference
        }) => {
            const array3 = difference([3, 2, 1], [4, 2])
            // => [3, 1]
            return "diff=" + array3;
        }).catch(function () {})
    });
});

if (process.env.NODE_ENV === "development") {
    console.log("development")
} else if (process.env.NODE_ENV === "production") {
    console.log("production")
}