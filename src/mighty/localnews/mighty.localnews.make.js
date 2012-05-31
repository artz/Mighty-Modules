/*global Mighty*/
/*
    Mighty Local News Make
*/
Mighty.define({
    id: "mighty.localnews",
    name: "Mighty Local News",
    description: "This module allows you to customize the Local News Widget",
    href: "http://mightymodules.com/mighty-localnews/",
    options: [{
        option: "count",
        name: "Article Count",
        description: "Number of stories to be displayed",
        type: "integer",
        value: 4,
        minimum: 2,
        maximum: 7
    }, {
        option: "vertical",
        name: "Change the City",
        description: "Change the City",
        type: "select",
        value: {
            "los-angeles": "Los Angeles",
            "chicago": "Chicago",
            "dc": "DC",
            "san-francisco": "San Francisco",
            "denver": "Denver",
            "new-york": "New York"
        }
    }]
});
