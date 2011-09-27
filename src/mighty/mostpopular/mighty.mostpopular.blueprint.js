<<<<<<< HEAD
Mighty.define({
	
});
=======
Mighty.define(function(){ 
	return [
	{
		option: "perpane",
		name: "Items per pane",
		description: "Maximum number of items to display on each pane",
		type: "integer",
		value: 7,
		minimum: 1,
		maximum: null
	},

	{
		option: "initial",
		name: "Initial pane",
		description: "What pane should be visible initially",
		type: "integer",
		value: 1,
		minimum: 1,
		maximum: null
	},

	{
		option: "foo",
		name: "Foo",
		description: "Please input value of foo",
		type: "text",
		value: "bar",
		minlength: null,
		maxlength: null 
	}
]});
>>>>>>> c71e6302fe9b28aaadcf03e5782f42f05645d840
