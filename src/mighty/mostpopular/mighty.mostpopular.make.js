Mighty.define({
    id: "mighty.mostpopular",
    name: "Mighty Most Popular",
    description: "This module allows you to customize the Most Popular Widget.",
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
            name: "Sub Heading",
            description: "Add a subheading (optional)",
            type: "text",
            value: ""
        },
        {
            option: "source",
            name: "Show Source",
            description: "Show the source website of the story.",
            type: "checkbox",
            value: "on"
        },
//      {
//          option: "sort",
//          name: "Sort",
//          description: "The order to sort the most popular stories.",
//          type: "radio",
//          value: ""
//      }
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
