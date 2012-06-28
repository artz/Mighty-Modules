Mighty.define({
    id: "mighty.mostpopular",
    name: "Most Popular Stories",
    description: "This module displays the most viral content across the AOL family of brands.",
    href: "http://mightymodules.com/mighty-mostpopular/",
    options: [
        {
            option: "heading",
            name: "Main Heading",
            description: "Customize the title of the widget",
            type: "text",
            value: "Most Popular Stories"
        },
        {
            option: "sub_heading",
            name: "Secondary Heading",
            description: "Add a secondary heading (optional)",
            type: "text",
            value: ""
        },
        {
            option: "sort",
            name: "Sort Stories",
            description: "The method of popularity to sort by.",
            type: "select",
            value: {
                "viral": "Viral Traffic",
                "total": "Total Traffic"
            }
        },
        {
            option: "source",
            name: "Show Source",
            description: "Show the source website of the story.",
            type: "checkbox",
            value: "on"
        },
        {
            option: "count",
            name: "Stories Count",
            description: "Enter the number of stories to show.",
            type: "integer",
            value: 8,
            minimum: 4,
            maximum: 25
        },
        {
            option: "more_count",
            name: "More Stories Count",
            description: "Number of stories to display when &lsquo;More Stories&rsquo; is clicked.",
            type: "integer",
            value: 8,
            minimum: 4,
            maximum: 50
        }]
});
