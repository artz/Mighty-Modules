/*
    Mighty Breaking News Blueprint
*/
Mighty.define({
    id: "mighty.breakingnews",
    name: "Mighty Breaking News",
    description: "This module allows you to customize the Breaking News Widget",
    href: "http://mightymodules.com/mighty-breakingnews/",
    options: [{
        option: "count",
        name: "Article Count",
        description: "Number of stories to be displayed",
        type: "integer",
        value: 4,
        minimum: 2,
        maximum: 10
    }, {
        option: "ad",
        name: "Display Ad",
        description: "Display ads flag",
        type: "checkbox"
    }]
});
