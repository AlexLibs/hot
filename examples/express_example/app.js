/**
 * Module dependencies.
 */
console.log(__dirname);
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , cons = require('../modules/consolidate')
  , hot = require("../../hot");

var app = express();
/* hot custom */
var cache = {};
//override dot by hot
cons.hot.render = function(str, it, fn){
    var engine = hot;
    try {
    var settings, def = {};
	if (!cache[str])
	    cache[str] = {tmpl: engine.template(str, settings, def), def: def};
	var c = cache[str];
	it.def = c.def;
	it.helpers = engine.helpers;
	fn(null, c.tmpl(it));
    }
    catch (err){ fn(err); }
};
hot.templateSettings.strip = false;
hot.helpers.sum = function(a){
    a = a||[];
    return a.reduce(function(a, b) { return a + b; }, 0);
};
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('hot', cons.hot);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
