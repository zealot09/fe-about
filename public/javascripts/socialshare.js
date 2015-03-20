define(["./util"], function(util) {
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
	var SocialShare = function(el, config) {
		this.config = config || {};
		var el = this.el = $(el);
		if (!this.el) return;
		var renderType = this.config.renderType = this.el.data('render') ? this.el.data('render') : "line";
		this.config.hostImgSrc = this.el.data('src');
		this.config.arcStart = this.el.data('arcStart') ? this.el.data('arcStart'): 180;
		this.config.gap = this.el.data('gap') ? this.el.data('gap'): 50;
		console.log(this.el);
		var shareMainBtn = [
				'<a class="smain disabled" title="click to show share panel" alt="click to show share panel">',
				util.stringFormat('<img src="{0}" alt="show share panel"/>', this.config.hostImgSrc),
				'</a>'
			].join(''),
			shareBtnTpl = util.stringFormat('<a class="sbutton {0}"> </a>', ""),
			dpReg = /^share/,
			dataConfig = this.el.data(),
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
		el.append($(shareMainBtn)).append($(sBtnContainerDom));
		var sContainer = $('.scontainer', el),
			shareMainBtn = $('smain', el);;
		//calculate the render absolute pixs & set the background
		$('a.sbutton', sContainer).each(function(index) {
			var el = $(this);
			el.css({
				'background-image': util.stringFormat('url({0})', el.data('src'))
			});
		});
		//render the share buttons with circle
		el.find('.smain').click(renderType === 'line' ? this.lineRender : this.circleRender);
	}


	SocialShare.prototype.circleRender = function() {
		console.log('circleRender')

	};
	//render the share buttons with line
	SocialShare.prototype.lineRender = function() {
		console.log(this);
		if ($(this.el).hasClass('disabled')) return;
		console.log(this.config);
		var el = $(this.el),
			gap = this.config.gap,
			arcStart = this.config.arcStart;
		console.log(el);
		var delayTime = 250,
			t = 250,
			r = el.find('.sbutton').length,
			s = e + (r - 1) * t,
			i = this.config.gap,
			o = 1;
		var triggleWidth = el.outerWidth(),
			triggleHeight = el.outerHeight();
		var btnWidth = el.find('.sbutton:eq(0)').outerWidth(),
			btnHeight = el.find('.sbutton:eq(0)').outerHeight();
		var p = (triggleWidth - btnWidth) / 2,
			d = (triggleHeight - btnHeight) / 2,
			v = arcStart / 180 * Math.PI;

		if (!el.hasClass('active')) {
			el.addClass('disabled').delay(delayTime).queue(function(e) {
				$(this).removeClass('disabled').addClass('active');
				console.log(e);
				e();
			});
			el.find('.sbutton').each(function() {
				var n = p + (p + i * o) * Math.cos(v),
					r = d + (d + i * o) * Math.sin(v);
				$(this).css({
					display: 'block',
					left: d + 'px',
					top: p + 'px'
				}).stop().delay(t * o).animate({
					left: r + 'px',
					top: n + 'px'
				}, e);
				o++;
			});

		} else {
			o = r;
			$(this).addClass('disabled').delay(s).queue(function(e) {
				$(this).removeClass('disabled').removeClass('active');
				e();
			});
			el.find('.sbutton').each(function() {
				$(this).stop().delay(t * o).animate({
					left: d,
					top: p
				}, e);
				o--;
			});

		}
	}

	var initialize = function(el, config) {
		return new SocialShare($(el), config || {});
	}
	return {
		initialize: initialize
	}
});