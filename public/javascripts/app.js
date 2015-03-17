require.config({
    paths: {
    	"jQuery": "//s0.cdn.jituanyun.com/ajax/libs/jquery/1.8.3/jquery.min",
    	"json": "//s0.cdn.jituanyun.com/ajax/libs/json3/3.2.5/json3.min"
    }
});

require(["socialshare"], function (SocialShare) {
    SocialShare.initialize({
    	host: '#container'
    });
});