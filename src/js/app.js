import "../css/base.scss";

jQuery(document).ready(function ($) {
    $("#btn2").click(function () {
        import( /* webpackChunkName:"subB" */ "./subB.js").then(({
            default: _
        }) => {
            return _
        }).catch(function () {})
    });
});

jQuery(document).ready(function ($) {
    $("#btn2").click(function () {
        import( /* webpackChunkName:"lodash-es-difference" */ "lodash-es/difference").then(({
            default: difference
        }) => {
            const array3 = difference([3, 2, 1], [4, 2, 1]);
            // => [3]
            return "diff=" + array3
        }).catch(function () {})
    });
});