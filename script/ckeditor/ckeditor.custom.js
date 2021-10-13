$(function(){

	var config = {
		// 內文
		toolbar: [
			[ 'Font' ,'FontSize'],
			[ 'TextColor', 'BGColor' ],
			[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ],
			[ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript' ],
			[ 'BulletedList', 'NumberedList', 'Indent', 'Outdent' ],
			[ 'Link', 'Smiley' ],
			[ 'RemoveFormat', 'Sourcedialog', 'Maximize' ]
		],
		height:"400",
		skin:'minimalist'
	};

	var config2 = {
		// 標題
		toolbar: [
			[ 'Font','FontSize' ],
			[ 'TextColor', 'BGColor' ],
			[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ],
			[ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript' ],
			[ 'Link', 'Smiley' ],
			[ 'RemoveFormat', 'Sourcedialog' ]
		],
		height:"80",
		skin: "minimalist"
	};

	$("textarea.editor-txt").each(function(){
    	CKEDITOR.replace(this,config);
	});

	$("textarea.editor-subTitle").each(function(){
    	CKEDITOR.replace(this,config2);
	});
});