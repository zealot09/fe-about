define(["./util"], function (util) {
/**
 *
 * @param  share button config
 *  config = {
 *     hostImg : '',  shareBtns: [{ title: "", img: "", href: ""}]	
 *  }
 *
 * @date     2015-03-18
 * @author   QETHAN<qinbinyang@zuijiao.net>
 */
var SocialShare = function(config) {
   this.config = config || {};

}
//render the share buttons with circle
SocialShare.prototype.circleRender = function(first_argument) {
		
};
//render the share buttons with line
SocialShare.prototype.lineRender = function () {
		
}

var initialize = function(config) {
       var host = config.host || 'body';
       host = $(host);

       var shareMainBtn = [
       		'<a class="smain disabled" title="click to show share panel" alt="click to show share panel">',
       		'<img src="" alt="show share panel"/>',
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
       		shareBtnDom += util.stringFormat('<a class="sbutton {0}" href="{1}">{2}</a>', item.name, item.url, item.name);
       		console.log(shareBtnDom);
       });
       //console.log(shareBtnDom);
       var sBtnContainerDom = [
       			'<div class="scontainer default">',
       			shareBtnDom,
       			'</div>'	
       		].join('');
       //console.log(sBtnContainerDom);
       host.append($(shareMainBtn)).append($(sBtnContainerDom));

       //attach the active & disable event using css3 transform
}

return {
    initialize:  initialize
}
});