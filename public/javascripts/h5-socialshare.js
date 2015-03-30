define(function() {
	/**
	 *
	 * @param  share button config
	 *  config = {
	 *     hostImg : '',  shareBtns: [{ title: "", img: "", href: ""}]
	 *  }
	 *
	 * @date     2015-03-18
	 * @author   <guol.zealot@gmail.com>
	 * @there can be  deffirent from browsers Compatibility
	 */
	 var stringFormat = function() {
        var args = arguments;
        if (!args.length) return "";
        if (typeof args[0] != "string") return "";
        return args[0].replace(/{\d+}/g, function (match, number) {
            var mi = parseInt(match.substr(1, match.length - 2));
            return typeof args[mi + 1] != 'undefined'
                ? args[mi + 1]
                : match;
        });
	}

	var SocialShare = function(el, config) {
		var me = this;
		this.config = config || {},
		this.el = el;

		if(this.el.clientWidth === 0) return;
		var dataset = el.dataset;
		//console.log(dataset);
		this.config.renderType = dataset.hasOwnProperty('render') ? dataset['render'] : "line";
		this.config.hostImgSrc = dataset['src'];
		this.config.arcStart = dataset.hasOwnProperty('arcstart')? parseInt(dataset['arcstart']): 180;
		this.config.arcLength = dataset.hasOwnProperty('arclength') ? parseInt(dataset['arclength']) : 180;
		this.config.gap = dataset.hasOwnProperty('gap') ? parseInt(dataset['gap'] ): 50;
		this.config.radius = dataset.hasOwnProperty('radius') ? parseInt(dataset['radius'] ): 80;
		this.config.delayTime = dataset.hasOwnProperty('delaytime') ? parseInt(dataset['delaytime']) : 500;
		this.config.delayGap = dataset.hasOwnProperty['delaygap'] ? parseInt(dataset['delaygap']) : 250;
		console.log(this.config);

		var shareMainBtn = [
				'<a class="smain disabled" title="click to show share panel" alt="click to show share panel">',
				stringFormat('<img src="{0}" alt="show share panel"/>', this.config.hostImgSrc),
				'</a>'
			].join(''),
			shareBtnTpl = stringFormat('<a class="sbutton {0}"> </a>', ""),
			dpReg = /^share/,
			dataConfig = this.el.dataset;
			shareBtnData = [];

		//roll the dataset format like: data-share-fb & data-fb-url as pairs to an object
		for (var key in dataConfig) {
			if (dpReg.test(key)) {
				var surl = key.substring('share'.length, key.length).toLowerCase();
				shareBtnData.push({
					name: surl,
					src: dataConfig[key],
					url: dataConfig[surl + 'Url']
				});
			}
		}	
		//console.log(shareBtnData);

		//build the social share tree declarative
		var shareBtnDom = '';
		shareBtnData.forEach(function(item) {
			// console.log(JSON.stringify(item));
			shareBtnDom += stringFormat('<a class="sbutton {0}" href="{1}" data-src="{2}">{2}</a>', item.name, item.url, item.src, item.name);
		});
		var sBtnContainerDom = [
			'<div class="scontainer default">',
			shareBtnDom,
			'</div>'
		].join('');	
		el.innerHTML = shareMainBtn + sBtnContainerDom;
		var sContainer = el.querySelector('.scontainer'),
		shareMainBtn = el.querySelector('.smain'),
		sButtons = el.querySelectorAll('.sbutton');

		[].forEach.call(sButtons, function(elSbtn) {
			// console.log(elSbtn);
			elSbtn.style.backgroundImage = stringFormat('url({0})', elSbtn.dataset.hasOwnProperty('src') ? elSbtn.dataset['src'] : '' );
		});

		//render the share buttons with circle
		//el.find('.smain').click(renderType === 'line' ? this.lineRender : this.circleRender);
		shareMainBtn.onclick = function() {
			switch (me.config.renderType) {
				case "line":
					me.lineRender();
					break;
				case "lineRight":
					me.lineRightRender();
					break;
				case "circle":
					me.circleRender();
					break;
			}			
		}	

	};

	SocialShare.prototype.circleRender = function() {
		// console.log(this);
		var el = this.el,
			gap = this.config.gap,
			delayTime = this.config.delayTime,
			delayGap = this.config.delayGap,
			arcStart = this.config.arcStart;
		var t = delayGap,
			r = el.querySelectorAll('.sbutton').length,
			i = gap,
			s = delayTime + (r - 1) * t,
			o = 1;
		var triggleWidth = el.clientWidth,
			triggleHeight = el.clientHeight;
		var btnWidth = el.querySelectorAll('.sbutton:eq(0)').clientWidth(),
			btnHeight = el.querySelectorAll('.sbutton:eq(0)').clientHeight;
		var p = (triggleWidth - btnWidth) / 2,
			d = (triggleHeight - btnHeight) / 2,
			v = arcStart / 180 * Math.PI;	
					
	};
	//render the share buttons with line
	SocialShare.prototype.lineRender = function() {

	};
	//render the share buttons line right
	SocialShare.prototype.lineRightRender = function() {

	}

	var initialize = function(elSelector, config) {
		var els = document.querySelectorAll(elSelector);
		[].forEach.call(els, function(el) {
			new SocialShare(el);
		}) ;
	};
	return {
		initialize: initialize
	};	
});