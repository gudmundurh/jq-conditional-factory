/**
 * Adds a plugin to jQuery that, when called, calls either of two
 * functions based on a boolean value given to it.
 *
 * $.conditionalFactory(<name>, <true_func>, <false_func>) adds a function f
 * to $.fn with name <name>, with the following behaviour:
 *    f(true, a1, a2, ...) calls true_func(a1, a2, ...)
 *    f(false, a1, a2, ...) calls false_func(a1, a2, ...)
 * The functions are called in the context of the jQuery object.
 *
 * Example:
 *    // Define the $.fn.showIf plugin
 *    $.conditionalPlugin('showIf', 
 *         function(){ this.show() }, function(){ this.hide() });
 * 
 *    // Shows the .logged-in element if user is logged in, otherwise hide it:
 *    $('.logged-in').showIf(user.loggedIn);
 *
 * Instead of passing in functions, names of existing jQuery functions can be
 * given. The plugins showIf could thus be defined by
 *    $.conditionalPlugin('showIf', 'show', 'hide');   
 *
 * Ooopss... the comment is more than twice as long as the code...
 */
jQuery.conditionalFactory = function(name, true_func, false_func) {
  if (typeof true_func != 'function') true_func = jQuery.fn[true_func];
  if (typeof false_func != 'function') false_func = jQuery.fn[false_func];
  if (!name || !true_func || !false_func) 
    throw('$.conditionalFactory: Incorrect usage');
  var default_args = Array.prototype.splice.call(arguments, 3);
  $.fn[name] = function(cond) {
    var args = jQuery.merge(default_args, Array.prototype.splice.call(arguments, 1));
    if (cond) true_func.apply(this, args);
    else      false_func.apply(this, args);
    return this;
  };
};