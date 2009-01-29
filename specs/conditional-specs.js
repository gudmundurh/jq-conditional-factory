
describe('The plugin function', {
	'should call the right callback': function() {
		var result;
		var true_func  = function(){ result = true };
		var false_func = function(){ result = false };
		$.conditionalFactory('simpleConditional', true_func, false_func);
		$('p').simpleConditional(true);
		value_of(result).should_be(true);
		$('p').simpleConditional(false);
		value_of(result).should_be(false);
	}
});

describe('Callbacks', {
	'should get default arguments': function() {
		var received_args;
		var callback = function(){ received_args = Array.prototype.slice.call(arguments) };
		$.conditionalFactory('condDefArgumentTest', callback, callback, 5, 7, 3);
		$('p').condDefArgumentTest(true);	
		value_of(received_args).should_be([5, 7, 3]);
	},
	
	'should get arguments to the plugin function': function() {
		var received_args;
		var callback = function(){ received_args = Array.prototype.slice.call(arguments) };
		$.conditionalFactory('condArgumentTest', callback, callback);
		$('p').condArgumentTest(false, "mamma", {"a": 10});	
		value_of(received_args).should_be(["mamma", {"a": 10}]);
	}
});

describe('conditionalFactory', {
	'should accept callbacks as names of jQuery functions': function() {
		var result;
		$.fn.true_func = function(){ console.log('tf'); result = true };
		$.fn.false_func = function(){ result = false };
		$.conditionalFactory('condNamedCallbacks', 'true_func', 'false_func');
		$('p').condNamedCallbacks(true);
		value_of(result).should_be(true);
		$('p').condNamedCallbacks(false);
		value_of(result).should_be(false);
	}
});