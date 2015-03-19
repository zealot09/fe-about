define(["./util"], function (util) {
/**
 *
 * @param  share button config
 *  config = {
 *     hostImg : '',  shareBtns: [{ title: "", img: "", href: ""}]	
 *  }
 *
 * @date     2015-03-18
 * @author   <guol.zealot@gmail.com>
 */
var SocialShare = function(config) {
   this.config = config || {};

}
//render the share buttons with circle
SocialShare.prototype.circleRender = function() {
		
};
//render the share buttons with line
SocialShare.prototype.lineRender = function () {
		
}

var initialize = function(config) {
       var host = config.host || 'body', config = {};
       host = $(host);
       config.element = host;
       config.renderType = host.data('render') ? host.data('render'): "line";
       config.hostImgSrc = host.data('src');

       var shareMainBtn = [
       		'<a class="smain disabled" title="click to show share panel" alt="click to show share panel">',
       		util.stringFormat('<img src="{0}" alt="show share panel"/>', config.hostImgSrc),
       		'</a>'
       ].join(''), 
       shareBtnTpl = util.stringFormat('<a class="sbutton {0}"> </a>', ""),
       dpReg = /^share/, dataConfig = host.data(), shareBtnData = [];

       //roll the dataset format like: data-share-fb & data-fb-url as pairs to an object
       for(var key in dataConfig) {
       	if(dpReg.test(key)) {
       		var surl = key.substring('share'.length, key.length).toLowerCase();
       		shareBtnData.push({
       			name: surl,
       			src: dataConfig[key],
       			url: dataConfig[surl + 'Url']
       		});
       	}	
       }
       console.log(JSON.stringify(shareBtnData));
       //build the social share tree declarative
       var shareBtnDom = '';
       _.each(shareBtnData, function(item) {
       		shareBtnDom += util.stringFormat('<a class="sbutton {0}" href="{1}" data-src="{2}">{2}</a>', item.name, item.url, item.src, item.name);
       		//add the css rule dynamically
       });
       
       var sBtnContainerDom = [
       			'<div class="scontainer default">',
       			shareBtnDom,
       			'</div>'	
       		].join('');
       //console.log(sBtnContainerDom);
       host.append($(shareMainBtn)).append($(sBtnContainerDom));
       var sContainer = $('.scontainer', host), shareMainBtn = $('smain', host);;
       //calculate the render absolute pixs & set the background
       $('a.sbutton', sContainer).each(function(index) {
       		var el = $(this);
       		el.css({
       			'background-image': util.stringFormat('url({0})', el.data('src')),
       			left: (index + 1)* 20	
       		});
       });

       //attach the active & disable event using css3 transform

}
return {
    initialize:  initialize
}
});