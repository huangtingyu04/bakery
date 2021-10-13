var SimpleShare = function (options) {
	options = options || {};
	var url = options.url || window.location.href;
	var title = options.title || document.title;
	var content = options.content || '';
	var pic = options.pic || '';

	url = encodeURIComponent(url);
	title = encodeURIComponent(title);
	content = encodeURIComponent(content);
	pic = encodeURIComponent(pic);

	// share target url
	var targetUrl = [
		{name: 'facebook', url: 'https://www.facebook.com/sharer/sharer.php?u={url}&t={title}&pic={pic}'},
		{name: 'qzone', url: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={pic}&summary={content}'},
		{name: 'weibo', url: 'http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&searchPic=false'},
		{name: 'tqq', url: 'http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&appkey=801cf76d3cfc44ada52ec13114e84a96'},
		{name: 'renren', url: 'http://widget.renren.com/dialog/share?resourceUrl={url}&srcUrl={url}&title={title}&description={content}'},
		{name: 'douban', url: 'http://www.douban.com/share/service?href={url}&name={title}&text={content}&image={pic}'},
		{name: 'twitter', url: 'https://twitter.com/intent/tweet?text={title}&url={url}'},
		{name: 'linkedin', url: 'https://www.linkedin.com/shareArticle?title={title}&summary={content}&mini=true&url={url}&ro=true'},
		{name: 'weixin', url: 'http://qr.liantu.com/api.php?text={url}'},
		{name: 'qq', url: 'http://connect.qq.com/widget/shareqq/index.html?url={url}&desc={title}&pics={pic}'},
		{name: 'pinterest', url: 'http://pinterest.com/pin/create/link/?url={url}&description={content}'},
		{name: 'plurk', url: 'http://www.plurk.com/?qualifier=shares&status={url}({title})'},
		{name: 'line', url: 'https://lineit.line.me/share/ui?url={url}'},
		{name: 'google', url: 'https://www.facebook.com/sharer/sharer.php?u={url}&t={title}&pic={pic}'},
		
	];

	function replaceAPI(api) {
			api = api.replace('{url}', url);
			api = api.replace('{title}', title);
			api = api.replace('{content}', content);
			api = api.replace('{pic}', pic);
		
			return api;
		}

	$(".btn-social").on("click", function(e) {
		e.preventDefault();
		var $this = $(this),
			setTarget = targetUrl[$this.data("target")];
		
		obj = targetUrl.find(o => o.name === $this.data("target"));

		if (obj === undefined) {
			console.error('沒有可分享設定');
			return;
		}
		window.open(replaceAPI(obj.url))

	});
}

// 需使用的頁面引用下面這一段
// var share = new SimpleShare({
// 	url: location.href,
// 	title: document.title,
// 	content: '',
// 	pic: '',
// });

// pug
// a.btn-social(data-target="facebook", href="javascript;;") facebook