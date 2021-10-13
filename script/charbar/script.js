var onReady = function () {
	$('.percentage-box').each(function () {
        var self = $(this),
            div = self.find("div");
        div.each(function() {
            $(this).css('width', $(this).attr('data-percentage'));
        })
	});
};

$(document).ready(onReady);
