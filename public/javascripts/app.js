require.config({
    paths: {
    	"jquery": "//s0.cdn.jituanyun.com/ajax/libs/jquery/1.8.3/jquery.min",
    	"json": "//s0.cdn.jituanyun.com/ajax/libs/json3/3.2.5/json3.min",
    	"underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore",
    	"util": 'util'
    }
});

require(["jquery", "./socialshare"], function ($, socialshare) {
	$(document).ready(function() {
		socialshare.initialize('#container');
	});
});