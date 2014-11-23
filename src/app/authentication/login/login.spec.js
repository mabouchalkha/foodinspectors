describe("inspectors.login", function () {
	// beforeEach(function() { 
	// 	//do some stuff
	// 	//Anything in the function body will be executed before each it
	// });

	// afterEach(function() { 
	// 	//do some stuff
	// 	//Anything in the function body will be executed after each it
	// });
	var test;

	beforeEach(module('inspectors.login'));
	beforeEach(inject(function(_test_) {
		test = _test_;
	}));

	it("should equal 2", function () {
   	expect(test).toBe(2);
 	});

	describe("someService", function () { 
		// tests for a service in this module
	});

	describe("someController", function () { 
		// tests for a controller in this module
	});
});