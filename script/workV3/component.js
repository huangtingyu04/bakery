var Component = {};

// 在主窗口彈出對話框
(function (component) {

    function getMainWin() {
        var mainWin = window;
        if (mainWin.parent != null)
            {
        while (mainWin.parent != mainWin)
            mainWin = mainWin.parent;
            }
        return mainWin;
    }

    function openWinInMain(posElm, url, height, top) {
        var mainWin = getMainWin();
        var formBox = mainWin.$(posElm);
        if (formBox.is(':visible'))
            formBox.hide();

        var iframe = formBox.find('.iframe');
        iframe.prop('src', url);
        iframe.on('load', function () {
            if (height || top) {
                var css = {};
                if (height)
                    css.height = height;
                if (top)
                    css.top = top;
                formBox.css(css);
            } else {
                //carrie 20170717 formBox.css({ height: '100%', top: 0 });
            }

            mainWin.closeLeftWindow = component.closeLeft;
            formBox.fadeIn(300).addClass('active');            
        });

        return mainWin;
    }

    function closeWinInMain(posElm) {
        var mainWin = getMainWin();
        var formBox = mainWin.$(posElm);
        if (formBox.hasClass('active')) {
            formBox.fadeOut(300).removeClass('active');
        };

        return mainWin;
    }

    function toggleWinInMain(posElm, url) {        
        var mainWin = getMainWin();        
        var formBox = mainWin.$(posElm);
        if (formBox.hasClass('active')) {
            formBox.fadeOut(300).removeClass('active');
        } else {
            var iframe = formBox.find('.iframe');
            iframe.prop('src', url);
            iframe.on('load', function () {
                mainWin.closeLeftWindow = component.closeLeft;
                formBox.fadeIn(300).addClass('active');
            });
        }

        return mainWin;
    }

    component.openLeft = function (url, height, top) {
        return openWinInMain('#leftEditBox', url, height, top);
    }

    component.closeLeft = function () {
        return closeWinInMain('#leftEditBox');
    }

    component.toggleLeft = function (url, height, top) {
        return toggleWinInMain('#leftEditBox', url, height, top);
    }

    component.openRight = function (url) {
        var mainWin = getMainWin();
        mainWin.$.colorbox({
            href: url,
            width: "600",
            height: "95%",
            right: "20",
            iframe: true,
            transition: false,
            speed: 0,
            fadeOut: 100,
            onClosed: function () {
                
            }
        });
        return mainWin;
    }

    component.closeRight = function () {
        var mainWin = getMainWin();
        mainWin.$.colorbox.close();
        return mainWin;
    }

    component.openCenter = function (url, height, top) {
        return openWinInMain('#centerEditBox-middle', url, height, top);
    }

    component.closeCenter = function () {
        return closeWinInMain('#centerEditBox-middle');
    }

    component.toggleCenter = function (url, height, top) {
        return toggleWinInMain('#centerEditBox-middle', url, height, top);
    }

    component.alert = function (msg, fn) {
        fn = fn || function () { };

        var mainWin = getMainWin();
        mainWin.swal({
            text: msg,
            customClass: 'animated fadeIn',
            onClose: function () {
                fn();
            }
        }).then(function () {
            fn();
        });

        return mainWin;
    }

    component.autoAlert = function (msg, timer, fn) {
        fn = fn || function () { };
        timer = timer || 3;

        var mainWin = getMainWin();
        mainWin.swal({
            text: msg,
            customClass: 'animated fadeIn',
            showConfirmButton: false,
            timer: timer * 1000
        });

        setTimeout(fn, timer * 1000);

        return mainWin;
    }

    component.confirm = function (msg, fn, type) {
        fn = fn || function () { };
        type = type || 'info'; // type值可為：warning，error，success，info和question

        var mainWin = getMainWin();
        mainWin.swal({
            text: msg,
            type: type,
            showCancelButton: true,
            confirmButtonText: '確定',
            cancelButtonText: '取消',
            animation: false,
            customClass: 'animated fadeIn'
        }).then(function (isConfirm) {
            fn(isConfirm);
        });

        return mainWin;
    }

    component.iframe = function (url, width, height) {
        if ($.type(url) != 'string' || url.charAt(0) == '#') { // 是 DOM 元素
            var elm = $(url);
            url = elm.attr('href');
            if (!width)
                width = elm.attr('data-width');
            if (!height)
                height = elm.attr('data-height');            
        }
        width = width || '430';
        height = height || '300';

        var mainWin = getMainWin();

        mainWin.$.colorbox({
            iframe: true,
            href: url,
            width: width,
            height: height,
            transition: false,
            maxWidth: "85%",
            maxHeight: "85%",
            opacity: 0,
            fadeOut: 100
        });
        
        return mainWin;
    }
})(Component);

Component.guid = function () {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());    
}

Component.singleImageUpload = function (elms, basePath, uploadUrl, disableAction) {
    var boxHtml =
        '<div class="fileuploader-items singleImg">' +
        '   <ul class="fileuploader-items-list">' +
        '       <li class="fileuploader-thumbnails-input">' +
        '           <div class="fileuploader-thumbnails-input-inner">' +
        '               <i class="cc cc-cloud-upload-o"></i>' +
        '               <h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
        '               <p>or</p>' +
        '               <div class="fileuploader-input-button"><span>Browse Files</span></div>' +
        '           </div>' +
        '       </li>' +
        '   </ul>' +
        '</div>';

    var itemHtml =
        '<li class="fileuploader-item">' +
        '   <div class="fileuploader-item-inner">' +
        '       <div class="thumbnail-holder">${image}</div>' +
        '       <div class="actions-holder">';    
    if (!disableAction) {
        itemHtml += 
        '           <a class="btn-white-o square transparent fileuploader-action-text tooltip openLeftEdit" title="編輯圖說" href="' + basePath + 'Backend/Common/ImgTextEdit"><i class="cc cc-edit-o"></i></a>' +
        '           <a class="btn-white-o square transparent fileuploader-action-show tooltip showStatus" title="顯示" href="javascript:"><i class="cc cc-eye"></i></a>';
    }

    itemHtml += 
        '           <a class="btn-del btn-white-o square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
        '       </div>' +
        '       <div class="progress-holder">${progressBar}</div>' +
        '   </div>' +
        '</li>';
    var item2Html = itemHtml;
        
    $(elms).each(function () {
        var fileElm = $(this);
        var valElm = fileElm.next();

        var file = null;
        var val = valElm.val();        
        if (val) {            
            var img = $.parseJSON(val);
            var m = img.Img.match(/\.([^\.]+)$/);
            file = { name: img.Spec || img.Img, file: uploadUrl + '/' + img.Img, type: 'image/' + m[1], size: 0 };
        }
        
        fileElm.fileuploader({
            limit: 1,
            files: file,
            extensions: ['jpg', 'jpeg', 'png', 'gif'],
            changeInput: ' ',
            theme: 'thumbnails',
            enableApi: true,
            addMore: false,
            thumbnails: {
                box: boxHtml,
                item: itemHtml, // 剛上傳的圖片顯示格式
                item2: item2Html, // 以前上傳的圖片顯示
                startImageRenderer: true,
                canvasImage: false,
                _selectors: {
                    list: '.fileuploader-items-list',
                    item: '.fileuploader-item',
                    start: '.fileuploader-action-start',
                    retry: '.fileuploader-action-retry',
                    remove: '.fileuploader-action-remove'
                },
                onImageLoaded: function (item, listEl, parentEl, newInputEl, inputEl) {

                    if (item != null && item.input != null) {
                        var file = item.input[0].files[0];
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var img = new Image();
                            img.src = e.target.result;
                            var canvas = document.createElement('canvas');
                            var context = canvas.getContext('2d');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            context.drawImage(img, 0, 0, img.width, img.height);
                            var base64input = $(newInputEl).attr("name") + "Base64";
                            $("#"+base64input).val(canvas.toDataURL(file.type, 0.3));

                        }
                        reader.readAsDataURL(file);
                    }
                },
                onItemShow: function (item, listEl, parentEl, newInputEl, inputEl) {
                    var plusInput = listEl.find('.fileuploader-thumbnails-input'),
                        api = $.fileuploader.getInstance(inputEl.get(0));

                    if (api.getFiles().length >= api.getOptions().limit) {
                        plusInput.hide();
                    }

                    plusInput.insertAfter(item.html);

                    if (item.format == 'image') {
                        item.html.find('.fileuploader-item-icon').hide();
                    };
                    
                    listEl.find('.openLeftEdit').on('click', function (e) {
                        e.preventDefault();
                        var mainWin = Component.toggleLeft(this.href);
                        mainWin.getImageItem = function () {
                            return $.parseJSON(valElm.val());
                        };

                        mainWin.setImageItem = function (imgItem) {
                            valElm.val(JSON.stringify(imgItem));
                        };
                    });

                    listEl.find('.showStatus').click(function () {
                        var iconElm = $(this).find('i');
                        var isShow = true;
                        if (iconElm.hasClass('cc-eye')) {
                            iconElm.removeClass('cc-eye').addClass('cc-eye-off');
                            isShow = false;
                        } else {
                            iconElm.removeClass('cc-eye-off').addClass('cc-eye');
                        }

                        var imgItem = $.parseJSON(valElm.val());
                        imgItem.IsShow = isShow;
                        valElm.val(JSON.stringify(imgItem));
                    });

                    if (!valElm.val()) {
                        valElm.val(JSON.stringify({ "ID": "0", "IsShow": true, "IsOriginalSize": true }));

                        listEl.find('.tooltip').tooltipster({
                            maxWidth: 100
                        });
                    } else {
                        var img = $.parseJSON(valElm.val());
                        if (!img.IsShow) {
                            listEl.find('.showStatus').click();
                        }
                    }
                },
                onItemRemove: function (html, listEl, parentEl, newInputEl, inputEl) {
                    valElm.val('');

                    var plusInput = listEl.find('.fileuploader-thumbnails-input'),
                        api = $.fileuploader.getInstance(inputEl.get(0));

                    html.children().animate({ 'opacity': 0 }, 200, function () {
                        setTimeout(function () {
                            html.remove();

                            if (api.getFiles().length - 1 < api.getOptions().limit) {
                                plusInput.show();
                            }
                        }, 100);
                    });
                }
            },
            afterRender: function (listEl, parentEl, newInputEl, inputEl) {
                var plusInput = listEl.find('.fileuploader-thumbnails-input'),
                    api = $.fileuploader.getInstance(inputEl.get(0));

                plusInput.on('click', function () {
                    api.open();
                });
            }
        });
    });
}

Component.multiImageUpload = function (elm, basePath, uploadUrl, browserUrl, imgs) {
    basePath = basePath.replace(/\/+$/, '');
    var changeInputHtml =
        '<div class="fileuploader-input">' +
        '   <div class="fileuploader-input-inner">' +
        '       <i class="cc cc-cloud-upload-o"></i>' +
        '       <h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
        '       <p>or</p>' +
        '       <div class="fileuploader-input-button"><span>Browse Files</span></div>' +
        '   </div>' +
        '</div>';

    var itemHtml =
        '<li class="fileuploader-item">' +
        '   <div class="fileuploader-item-inner">' +
        '       <div class="thumbnail-holder">${image}</div>' +
        '       <div class="actions-holder">' +
        //'         <a class="btn-white-o square transparent fileuploader-action-image tooltip" title="裁切" href="javascript:"><i class="cc cc-camera-o"></i></a>' +
        '           <a class="btn-white-o square transparent fileuploader-action-text tooltip openLeftEdit" title="編輯圖說" href="' + basePath + 'Backend/Common/ImgTextEdit"><i class="cc cc-edit-o"></i></a>' +
        '           <a class="btn-white-o square transparent fileuploader-action-show tooltip showStatus" title="顯示" href="javascript:"><i class="cc cc-eye"></i></a>' +
        '           <a class="btn-del btn-white-o square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
        '       </div>' +
        '       <div class="progress-holder">${progressBar}</div>' +
        '   </div>' +
        '   <input type="hidden" name="MutiPicInfo" />' +
        '</li>';
    var item2Html = itemHtml;

    var fileElm = $(elm);
            
    var files = [];
    if (imgs && imgs.length) {
        for (var i = 0, len = imgs.length; i < len; ++i) {
            var img = imgs[i];
            var m;
            try {
                m = img.Img.match(/\.([^\.]+)$/);
            }
            catch (e) {
                m = img.FileName.match(/\.([^\.]+)$/);
            }
            files.push({ name: img.Spec || img.Img, file: browserUrl + '/' + img.Img, type: 'image/' + m[1], size: 0 }); 
        }
    }

    function initNewItem(item) {
        var valElm = item.html.find('input:hidden');

        item.html.find('.openLeftEdit').on('click', function (e) {
            e.preventDefault();
            CCWork.iframe(this.href);
            window.getImageItem = function () {
                return $.parseJSON(valElm.val());
            };

            window.setImageItem = function (imgItem) {
                valElm.val(JSON.stringify(imgItem));
            };
        });

        item.html.find('.showStatus').click(function () {
            var iconElm = $(this).find('i');
            var isShow = true;
            if (iconElm.hasClass('cc-eye')) {
                iconElm.removeClass('cc-eye').addClass('cc-eye-off');
                isShow = false;
            } else {
                iconElm.removeClass('cc-eye-off').addClass('cc-eye');
            }

            var imgItem = $.parseJSON(valElm.val());
            imgItem.IsShow = isShow;
            valElm.val(JSON.stringify(imgItem));
        });

        item.html.find('div.progress-holder').html('');
        item.html.disableSelection();
    }

    var imgsIndex = 0;
    fileElm.fileuploader({
        files: files,
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
        changeInput: changeInputHtml,
        theme: 'thumbnails',
        enableApi: true,
        addMore: true,
        thumbnails: {
            files: files,
            item: itemHtml,
            item2: item2Html,
            fileMaxSize: 3,
            startImageRenderer: true,
            canvasImage: false,
            _selectors: {
                list: '.fileuploader-items-list',
                item: '.fileuploader-item',
                start: '.fileuploader-action-start',
                retry: '.fileuploader-action-retry',
                remove: '.fileuploader-action-remove'
            },
            onFileRead: function (item, listEl, parentEl, newInputEl, inputEl) {
               
                },
            onItemShow: function (item, listEl, parentEl, newInputEl, inputEl) {
                var plusInput = listEl.find('.fileuploader-thumbnails-input');

                plusInput.insertAfter(item.html);

                if (item.format == 'image') {
                    item.html.find('.fileuploader-item-icon').hide();
                };
                
                if (item.appended) { // 以前上傳的檔案
                    var imgItem = imgs[imgsIndex++];
                    if (!img.IsShow) {
                        item.html.find('.showStatus i').removeClass('cc-eye').addClass('cc-eye-off');
                    }
                    item.html.find('input:hidden').val(JSON.stringify(imgItem));
                } else {                    
                    item.html.find('.tooltip').tooltipster({
                        maxWidth: 100
                    });                    
                }

                initNewItem(item);
            }/*,
    onImageLoaded: function(item, listEl, parentEl, newInputEl, inputEl) {
        let file = item.file;
                         var reader = new FileReader();
        var img2 = new Image();
                             img2.src = "";
                         reader.onload =  function (e) {
                            img2.src = e.target.result;
       var gosend = 0;
       let img = img2;
       var canvas = document.createElement('canvas');
                             var context = canvas.getContext('2d');
                             canvas.width = img.width;
                             canvas.height = img.height;
                             context.drawImage(img, 0, 0, img.width, img.height);
        item.upload.data.FileName=  file["name"];
        item.upload.data.Base64=  canvas.toDataURL(file.type, 0.3);    
       img.src = "";
       item.upload.send();
                         }
      try{
                        reader.readAsDataURL(file);
      }
      catch(err) {}
    },*/
        },
        upload: {
            url: uploadUrl,
            data: { type: 'img', Base64: '', FileName: '' }, // 當前未使用，目的:校驗上傳文件類型
            type: 'POST',
            enctype: 'multipart/form-data',
            start: true,
            synchronImages: true,
            synchron: true,
            beforeSend: function (item, listEl, parentEl, newInputEl, inputEl) {                
                Component.multiImageUpload.uploading = true;
            },
            onSuccess: function (data, item, listEl, parentEl, newInputEl, inputEl, textStatus, jqXHR) {
                if (!data)
                    return;
                data = $.parseJSON(data);

                item.html.find('input:hidden').val(JSON.stringify({ "ID": "0", "FileName": data.Name, "Img": data.Name, "IsShow": true, "IsOpenNew": false }));
                initNewItem(item);
            },
            onComplete: function (listEl, parentEl, newInputEl, inputEl, jqXHR, textStatus) {
                Component.multiImageUpload.uploading = false;
            }
        }
    }); 

    var itemOuterElm = fileElm.nextAll('div.fileuploader-items').find('ul');    
    itemOuterElm.sortable({ items: 'li' }); 
    
    fileElm.closest('form').submit(function () {
        var field = fileElm.attr('data-field');
        itemOuterElm.find('li').each(function (n) {
            $(this).find('input').each(function () {
                this.name = this.id = field + '[' + n + ']';
            });
        });
    });    
}

Component.singleFileUpload = function (elm, basePath, uploadUrl, file, disableAction) {
    var fileElm = $(elm);
    var changeInputHtml =
        '<div class="fileuploader-input">' +
        '   <div class="fileuploader-input-inner">' +
        '       <i class="cc cc-cloud-upload-o"></i>' +
        '       <h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
        '       <p>or</p>' +
        '       <div class="fileuploader-input-button"><span>Browse Files</span></div>' +
        '   </div>' +
        '</div>';

    var itemHtml =
        '<li class="fileuploader-item">' +
        '   <div class="columns">' +
        '       <div class="column-thumbnail">${image}</div>' +
        '       <div class="column-title">' +
        '           <div class="title-name" title="${name}">${name}</div>' +
        '           <span>${size2}</span>' +
        '       </div>' +
        '       <div class="column-actions">' +
        '           <a href="${file}" class="btn-download square transparent fileuploader-action-download tooltip" title="下載" target="_blank"><i class="cc cc-download"></i></a>';
    if (!disableAction) {
        itemHtml +=        
        '           <a href="' + basePath + 'Backend/Common/fileTextEdit" class="btn-grey-o square transparent fileuploader-action-rename tooltip openfileEdit" title="重新命名"><i class="cc cc-edit-o"></i></a>';
    }
    itemHtml += 
        '           <a class="btn-del square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
        '       </div>' +
        '   </div>' +
        '   <div class="progress-bar2">${progressBar}<span></span></div>' +
        '   <input type="hidden" name="' + fileElm.attr('data-field') + '" />' +
        '</li>';
    var item2Html = itemHtml;    

    var fileList = [];
    if (file) {
        var m = file.FileInfo.match(/\.([^\.]+)$/);
        var extension = (m ? m[1] : '');
        fileList.push({ name: file.ShowName ? file.ShowName + '.' + extension : file.FileInfo, file: uploadUrl + '/' + file.FileInfo, type: file.FileMimeType, size: file.FileSize || 0 });
    }
            
    fileElm.fileuploader({
        limit: 1,
        fileMaxSize: 10,
        files: fileList,
        theme: 'dragdrop',
        //changeInput: changeInputHtml,
        thumbnails: {
            item: itemHtml,
            item2: item2Html,
            onItemShow: function (item, listEl, parentEl, newInputEl, inputEl) {
                var valElm = item.html.find('input:hidden');
                if (item.appended) { // 以前上傳的檔案                    
                    valElm.val(JSON.stringify(file));
                } else {
                    valElm.val(JSON.stringify({ "Id": "0", "FileInfo": item.name }));
                    item.html.find('.tooltip').tooltipster({
                        maxWidth: 100
                    });
                    item.html.find(".btn-download").hide();
                }

                item.html.find('a.openfileEdit').click(function (e) {
                    e.preventDefault();
                    $.colorbox({
                        href: this.href,
                        width: "70%",
                        height: "160",
                        transition: false,
                        maxWidth: "70%",
                        maxHeight: "50%",
                        opacity: 0,
                        right: "20",
                        bottom: "100",
                        iframe: true,
                        fadeOut: 300,
                        fixed: true
                    });

                    window.getFileItem = function () {
                        return $.parseJSON(valElm.val());
                    }

                    window.setFileItem = function (fileItem) {
                        item.html.find('.title-name').html(fileItem.ShowName);
                        valElm.val(JSON.stringify(fileItem));
                    }
                });                
            }
        }
    });    
}

Component.multiFileUpload = function (elm, basePath, uploadUrl, browserUrl, files) {
    var fileElm = $(elm);

    var fileList = [];
    if (files && files.length) {
        for (var i = 0, len = files.length; i < len; ++i) {
            var f = files[i];
            var m = f.FileInfo.match(/\.([^\.]+)$/);  
            var extension = (m ? m[1] : '');
            fileList.push({ name: f.ShowName ? f.ShowName + '.' + extension : f.FileInfo, file: browserUrl + '/' + f.FileInfo, type: f.FileMimeType, size: f.FileSize || 0 });
        }
    }

    var fileIndex = 0;
    fileElm.fileuploader({
        files: fileList,
        theme: 'dragdrop',        
        thumbnails: {
            onItemShow: function (item, listEl, parentEl, newInputEl, inputEl) {
                var valElm = $('<input type="hidden" />');
                item.html.append(valElm);                
                if (item.appended) { // 以前上傳的檔案
                    var fileItem = files[fileIndex++];
                    valElm.val(JSON.stringify(fileItem));
                } else {                    
                    item.html.find('.tooltip').tooltipster({
                        maxWidth: 100
                    });
                }

                item.html.find('a.btn-grey-o').click(function (e) {
                    e.preventDefault();
                    $.colorbox({
                        href: basePath + 'Backend/Common/fileTextEdit',
                        width: "70%",
                        height: "160",
                        transition: false,
                        maxWidth: "70%",
                        maxHeight: "50%",
                        opacity: 0,
                        right: "20",
                        bottom: "100",
                        iframe: true,                        
                        fadeOut: 300,
                        fixed: true
                    });

                    window.getFileItem = function () {
                        return $.parseJSON(valElm.val());
                    }

                    window.setFileItem = function (fileItem) {
                        item.html.find('.title-name').html(fileItem.ShowName);
                        valElm.val(JSON.stringify(fileItem));
                    }
                });

                item.html.disableSelection();
            }
        },
        upload: {
            url: uploadUrl,
            data: { type: 'file' }, // 當前未使用，目的:校驗上傳文件類型
            type: 'POST',
            enctype: 'multipart/form-data',
            start: true,
            beforeSend: function (item, listEl, parentEl, newInputEl, inputEl) {
                Component.multiFileUpload.uploading = true;
            },
            onSuccess: function (data, item, listEl, parentEl, newInputEl, inputEl, textStatus, jqXHR) {
                if (!data)
                    return;
                data = $.parseJSON(data);

                item.html.find('input[type="hidden"]').val(JSON.stringify({ "ID": "0", "FileInfo": data.Name, "FileSize": data.FileSize,"ShowName": data.ShowName }));
                item.html.find('div.progress-bar2').html('');
                item.html.find('a.btn-download').prop('href', browserUrl + '/' + data.Name);
            },
            onComplete: function (listEl, parentEl, newInputEl, inputEl, jqXHR, textStatus) {
                Component.multiFileUpload.uploading = false;
            }
        }
    });

    var itemOuterElm = fileElm.nextAll('div.fileuploader-items').find('ul');
    itemOuterElm.sortable({ items: 'li', handle: '.btn-sort', helper: 'clone', appendTo: 'body' }); 

    fileElm.closest('form').submit(function () {
        var field = fileElm.attr('data-field');
        itemOuterElm.find('li').each(function (n) {
            $(this).find('input').each(function () {
                this.name = this.id = field + '[' + n + ']';
            });
        });
    });
}

Component.singleVoiceUpload = function (elm, basePath, uploadUrl, browserUrl, voice) {
    var fileElm = $(elm);
    var changeInputHtml =
        '<div class="fileuploader-input">' +
        '   <div class="fileuploader-input-inner">' +
        '       <i class="cc cc-cloud-upload-o"></i>' +
        '       <h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
        '       <p>or</p>' +
        '       <div class="fileuploader-input-button"><span>Browse Files</span></div>' +
        '   </div>' +
        '</div>';

    var boxHtml =
        '<div class="fileuploader-items voice">' +
        '   <ul class="fileuploader-items-list"></ul>' +
        '</div>';

    var itemHtml =
        '<li class="fileuploader-item">' +
        '   <div class="columns">' +
        '       <div class="column-title">' +
        '           <div class="title-name" title="${name}">${name}</div>' +
        '           <div class="voice-mp3"></div>' +
        '       </div>' +
        '       <div class="column-actions">' +
        '           <a class="btn-download square transparent fileuploader-action-download tooltip" title="下載" target="_blank"><i class="cc cc-download"></i></a>' +
        '           <a href="' + basePath + '/Backend/Common/fileTextEdit" class="btn-grey-o square transparent fileuploader-action-rename tooltip openvoiceEdit" title="重新命名"><i class="cc cc-edit-o"></i></a>' +
        '           <a class="btn-del square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
        '       </div>' +
        '   </div>' +
        '   <div class="progress-bar2">${progressBar}<span></span></div>' +
        '   <input type="hidden" name="' + fileElm.attr('data-field') + '" />' +
        '</li>'
    var item2Html = itemHtml;

    var fileList = [];
    if (voice) {
        fileList.push({ name: voice.ShowName || voice.Path, file: browserUrl + '/' + encodeURIComponent(voice.Path), type: voice.MimeType });
    }

    function player(id, fileName) {
        var jw = jwplayer(id).setup({
            file: browserUrl + '/' + encodeURIComponent(fileName),
            width: 240,
            height: 30,
            skin: {
                //name: "bekle",//主題
                active: "#2e2e2e"//控制列主色
                //inactive: "#ffffff",
                //background: "rgba(0,0,0,0)"//控制列背景
            }
        });

    }

    fileElm.fileuploader({
        limit: 1,
        files: fileList,
        fileMaxSize: 100,
        extensions: ['mp3', 'm4a'],
        theme: 'dragdrop',
        changeInput: changeInputHtml,
        thumbnails: {
            box: boxHtml,
            item: itemHtml,
            item2: item2Html,
            onItemShow: function (item, listEl, parentEl, newInputEl, inputEl) {
                var valElm = item.html.find('input:hidden');
                if (item.appended) { // 以前上傳的檔案
                    valElm.val(JSON.stringify(voice));

                    item.html.find('div.progress-bar2').html('');
                    item.html.find('a.btn-download').prop('href', browserUrl + '/' + encodeURIComponent(voice.Path));

                    var uniqueId = Component.guid();
                    item.html.find('div.voice-mp3').prop('id', uniqueId);
                    player(uniqueId, voice.Path);
                } else {
                    item.html.find('.tooltip').tooltipster({
                        maxWidth: 100
                    });
                }

                item.html.find('a.openvoiceEdit').click(function (e) {
                    e.preventDefault();
                    $.colorbox({
                        href: this.href,
                        width: "70%",
                        height: "160",
                        transition: false,
                        maxWidth: "70%",
                        maxHeight: "50%",
                        opacity: 0,
                        right: "20",
                        bottom: "100",
                        iframe: true,
                        fadeOut: 300,
                        fixed: true
                    });

                    window.getFileItem = function () {
                        return $.parseJSON(valElm.val());
                    }

                    window.setFileItem = function (fileItem) {
                        item.html.find('.title-name').html(fileItem.ShowName);
                        valElm.val(JSON.stringify(fileItem));
                    }
                });
            }
        },
        upload: {
            url: uploadUrl,
            data: { type: 'voice' }, // 當前未使用，目的:校驗上傳文件類型
            type: 'POST',
            enctype: 'multipart/form-data',
            start: true,
            beforeSend: function (item, listEl, parentEl, newInputEl, inputEl) {
                Component.singleVoiceUpload.uploading = true;
            },
            onSuccess: function (data, item, listEl, parentEl, newInputEl, inputEl, textStatus, jqXHR) {
                if (!data)
                    return;
                data = $.parseJSON(data);

                item.html.find('input:hidden').val(JSON.stringify({ "ID": "0", "Path": data.Name }));
                item.html.find('div.progress-bar2').html('');
                item.html.find('a.btn-download').prop('href', browserUrl + '/' + data.Name);

                var uniqueId = Component.guid();
                item.html.find('div.voice-mp3').prop('id', uniqueId);
                player(uniqueId, data.Name);
            },
            onComplete: function (listEl, parentEl, newInputEl, inputEl, jqXHR, textStatus) {
                Component.singleVoiceUpload.uploading = false;
            }
        }
    });
}

Component.multiVoiceUpload = function (elm, basePath, uploadUrl, browserUrl, voices) {
    var changeInputHtml =
        '<div class="fileuploader-input">' +
        '   <div class="fileuploader-input-inner">' +
        '       <i class="cc cc-cloud-upload-o"></i>' +
        '       <h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
        '       <p>or</p>' +
        '       <div class="fileuploader-input-button"><span>Browse Files</span></div>' +
        '   </div>' +
        '</div>';

    var boxHtml =
        '<div class="fileuploader-items voice">' +
        '   <ul class="fileuploader-items-list"></ul>' +
        '</div>';

    var itemHtml =
        '<li class="fileuploader-item">' +
        '   <div class="columns">' +
        '       <div class="column-title">' +
        '           <div class="title-name" title="${name}">${name}</div>' +
        '           <div class="voice-mp3"></div>' +
        '       </div>' +
        '       <div class="column-actions">' +
        '           <a href="javascript:" class="btn-sort square transparent fileuploader-action-sort tooltip" title="排序"><i class="cc cc-drag"></i></a>' +
        '           <a class="btn-download square transparent fileuploader-action-download tooltip" title="下載" target="_blank"><i class="cc cc-download"></i></a>' +
        '           <a href="' + basePath + 'Backend/Common/fileTextEdit" class="btn-grey-o square transparent fileuploader-action-rename tooltip openvoiceEdit" title="重新命名"><i class="cc cc-edit-o"></i></a>' +
        '           <a class="btn-del square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
        '       </div>' +
        '   </div>' +
        '   <div class="progress-bar2">${progressBar}<span></span></div>' +
        '   <input type="hidden" />' +
        '</li>'    
    var item2Html = itemHtml;

    var fileElm = $(elm);

    var fileList = [];
    if (voices && voices.length) {
        for (var i = 0, len = voices.length; i < len; ++i) {
            var voice = voices[i];
            fileList.push({ name: voice.ShowName || voice.Path, file: browserUrl + '/' + encodeURIComponent(voice.Path), type: voice.MimeType });
        }
    }

    function player(id, fileName) {
        var jw = jwplayer(id).setup({
            file: browserUrl + '/' + encodeURIComponent(fileName),
            width: 240,
            height: 30,
            skin: {
                //name: "bekle",//主題
                active: "#2e2e2e"//控制列主色
                //inactive: "#ffffff",
                //background: "rgba(0,0,0,0)"//控制列背景
            }
        });
        
    }

    var voiceIndex = 0;
    fileElm.fileuploader({
        files: fileList,
        fileMaxSize: 100,
        extensions: ['mp3', 'm4a'],
        theme: 'dragdrop',
        changeInput: changeInputHtml,
        thumbnails: {
            box: boxHtml,
            item: itemHtml,
            item2: item2Html,
            onItemShow: function (item, listEl, parentEl, newInputEl, inputEl) {
                var valElm = item.html.find('input:hidden');
                if (item.appended) { // 以前上傳的檔案
                    var voiceItem = voices[voiceIndex++];
                    valElm.val(JSON.stringify(voiceItem));
                                        
                    item.html.find('div.progress-bar2').html('');
                    item.html.find('a.btn-download').prop('href', browserUrl + '/' + encodeURIComponent(voiceItem.Path));

                    var uniqueId = Component.guid();
                    item.html.find('div.voice-mp3').prop('id', uniqueId);
                    player(uniqueId, voiceItem.Path);
                } else {                    
                    item.html.find('.tooltip').tooltipster({
                        maxWidth: 100
                    });
                }

                item.html.find('a.openvoiceEdit').click(function (e) {
                    e.preventDefault();
                    $.colorbox({
                        href: this.href,
                        width: "70%",
                        height: "160",
                        transition: false,
                        maxWidth: "70%",
                        maxHeight: "50%",
                        opacity: 0,
                        right: "20",
                        bottom: "100",
                        iframe: true,
                        fadeOut: 300,
                        fixed: true
                    });

                    window.getFileItem = function () {
                        return $.parseJSON(valElm.val());
                    }

                    window.setFileItem = function (fileItem) {
                        item.html.find('.title-name').html(fileItem.ShowName);
                        valElm.val(JSON.stringify(fileItem));
                    }
                });

                item.html.disableSelection();
            }
        }, 
        upload: {
            url: uploadUrl,
            data: { type: 'voice' }, // 當前未使用，目的:校驗上傳文件類型
            type: 'POST',
            enctype: 'multipart/form-data',
            start: true,
            beforeSend: function (item, listEl, parentEl, newInputEl, inputEl) {
                Component.multiVoiceUpload.uploading = true;
            },
            onSuccess: function (data, item, listEl, parentEl, newInputEl, inputEl, textStatus, jqXHR) {
                if (!data)
                    return;
                data = $.parseJSON(data);

                item.html.find('input:hidden').val(JSON.stringify({ "ID": "0", "Path": data.Name }));
                item.html.find('div.progress-bar2').html('');
                item.html.find('a.btn-download').prop('href', browserUrl + '/' + data.Name);

                var uniqueId = Component.guid();
                item.html.find('div.voice-mp3').prop('id', uniqueId);
                player(uniqueId, data.Name);
            },
            onComplete: function (listEl, parentEl, newInputEl, inputEl, jqXHR, textStatus) {
                Component.multiVoiceUpload.uploading = false;
            }
        }
    });

    var itemOuterElm = fileElm.nextAll('div.fileuploader-items').find('ul');
    itemOuterElm.sortable({ items: 'li', handle: '.btn-sort', helper: 'clone', appendTo: 'body' });

    fileElm.closest('form').submit(function () {
        var field = fileElm.attr('data-field');
        itemOuterElm.find('li').each(function (n) {
            $(this).find('input').each(function () {
                this.name = this.id = field + '[' + n + ']';
            });
        });
    });
}

Component.singleVideoUpload = function (elm, uploadUrl, browserUrl, video, jwplayerReady) {    
    var boxHtml =
        '<div class="fileuploader-items singleImg video">' +
        '   <ul class="fileuploader-items-list">' +
        '       <li class="fileuploader-thumbnails-input">' +
        '           <div class="fileuploader-thumbnails-input-inner">' +
        '               <i class="cc cc-cloud-upload-o"></i>' +
        '               <h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
        '               <p>or</p>' +
        '               <div class="fileuploader-input-button"><span>Browse Files</span></div>' +
        '           </div>' +
        '       </li>' +
        '   </ul>' +
        '</div>';

    var itemHtml =
        '<li class="fileuploader-item">' +
        '   <div class="fileuploader-item-inner">' +
        '       <div class="thumbnail-holder"><div class="video-mp4"></div></div>' +
        '       <div class="actions-holder">' +
        '           <a class="btn-del btn-white-o square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
        '       </div>' +
        '       <div class="progress-holder">${progressBar}</div>' +
        '       <input type="hidden" />' +
        '   </div>' +
        '</li>';       
    var item2Html = itemHtml;

    var fileElm = $(elm);

    var file = null;
    if (video) {
        file = { name: video, file: browserUrl + '/' + encodeURIComponent(video) };
    }

    function player(id, video) {
        jwplayer(id).setup({
            width: "100%",
            height: "100%",
            type: "mp4",
            file: browserUrl + '/' + video,            
            skin: {
                name: "default",//選擇主題
                active: "#2e2e2e",//選擇主色
                inactive: "#ffffff",
                background: "rgba(255,255,255,0)"//選擇背景
            },
            showdownload: false,
            aspectratio: "16:9",//影片比例
            autostart: false //自動播放
        });

        jwplayer(id).onBufferChange(jwplayerReady);        
    }

    fileElm.fileuploader({
        limit: 1,
        files: file,
        fileMaxSize: 100,
        extensions: ['mp4'],
        changeInput: ' ',
        theme: 'thumbnails',
        enableApi: true,
        addMore: false,        
        thumbnails: {
            box: boxHtml,
            item: itemHtml,
            item2: item2Html,
            startImageRenderer: true,
            canvasImage: false,
            _selectors: {
                list: '.fileuploader-items-list',
                item: '.fileuploader-item',
                start: '.fileuploader-action-start',
                retry: '.fileuploader-action-retry',
                remove: '.fileuploader-action-remove'
            },
            onItemShow: function (item, listEl, parentEl, newInputEl, inputEl) {
                var plusInput = listEl.find('.fileuploader-thumbnails-input'),
                    api = $.fileuploader.getInstance(inputEl.get(0));

                if (api.getFiles().length >= api.getOptions().limit) {
                    plusInput.hide();
                }

                plusInput.insertAfter(item.html);

                var valElm = item.html.find('input:hidden');
                if (item.appended) { // 以前上傳的檔案                    
                    valElm.val(video);

                    item.html.find('div.progress-holder').html('');                    

                    var uniqueId = Component.guid();
                    item.html.find('div.video-mp4').prop('id', uniqueId);
                    player(uniqueId, video);
                } else {
                    item.html.find('.tooltip').tooltipster({
                        maxWidth: 100
                    });
                }                
            },
            onItemRemove: function (html, listEl, parentEl, newInputEl, inputEl) {
                var plusInput = listEl.find('.fileuploader-thumbnails-input'),
                    api = $.fileuploader.getInstance(inputEl.get(0));

                html.children().animate({ 'opacity': 0 }, 200, function () {
                    setTimeout(function () {
                        html.remove();

                        if (api.getFiles().length - 1 < api.getOptions().limit) {
                            plusInput.show();
                        }
                    }, 100);
                });
            }
        },
        afterRender: function (listEl, parentEl, newInputEl, inputEl) {
            var plusInput = listEl.find('.fileuploader-thumbnails-input'),
                api = $.fileuploader.getInstance(inputEl.get(0));

            plusInput.on('click', function () {
                api.open();
            });
        }, 
        upload: {
            url: uploadUrl,
            data: { type: 'video' }, // 當前未使用，目的:校驗上傳文件類型
            type: 'POST',
            enctype: 'multipart/form-data',
            start: true,
            beforeSend: function (item, listEl, parentEl, newInputEl, inputEl) {
                Component.singleVideoUpload.uploading = true;
            },
            onSuccess: function (data, item, listEl, parentEl, newInputEl, inputEl, textStatus, jqXHR) {
                if (!data)
                    return;
                data = $.parseJSON(data);

                item.html.find('input:hidden').val(data.Name);
                item.html.find('div.progress-holder').html('');
                
                var uniqueId = Component.guid();
                item.html.find('div.video-mp4').prop('id', uniqueId);
                player(uniqueId, data.Name);
            },
            onComplete: function (listEl, parentEl, newInputEl, inputEl, jqXHR, textStatus) {
                Component.singleVideoUpload.uploading = false;
            }
        }
    });

    var itemOuterElm = fileElm.nextAll('div.fileuploader-items').find('ul');
    fileElm.closest('form').submit(function () {
        var field = fileElm.attr('data-field');
        itemOuterElm.find('li').each(function (n) {
            $(this).find('input').each(function () {
                this.name = this.id = field;
            });
        });
    });
}

Component.editor = function (id, isSimple) {
    var config = {
        // 內文
        toolbar: [
            ['Font', 'FontSize'],
            ['TextColor', 'BGColor'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight'],
            ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'],
            ['BulletedList', 'NumberedList', 'Indent', 'Outdent'],
            ['Link', 'Smiley'],
            ['RemoveFormat', 'Source', 'Sourcedialog', 'Maximize']
        ],
        height: "400",
        skin: 'minimalist'
    };

    var config2 = {
        // 標題
        toolbar: [
            ['Font', 'FontSize'],
            ['TextColor', 'BGColor'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight'],
            ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'],
            ['Link', 'Smiley'],
            ['RemoveFormat', 'Source', 'Sourcedialog']
        ],
        height: "80",
        skin: "minimalist"
    };

    isSimple = !!isSimple;
    var editor = CKEDITOR.replace(id, isSimple ? config2 : config);

    $('form').submit(function () {
        var v = editor.getData();
        if (v.replace(/(<[^>]*>|\s)/g, '') == '請填入段落內文') {
            try {
                editor.setData('');
            } catch(e) {
            
            }
        }
    });

    return editor;
}

Component.radioList = function (outerElms) {
    $(outerElms).each(function () {
        var groupName = $(this).attr('data-radioGroup');

        var valElm = $(this).find('input[type="hidden"]');
        var v = valElm.val();
        $(this).find(':radio').each(function (n) {
            this.name = groupName;
            this.id = groupName + n;
            $(this).nextAll('label').prop('for', this.id);

           
            if (this.value.trim() == v.trim()) {
                this.checked = true;
            }
            $(this).click(function () {
                valElm.val(this.value);
            });
        });
    });
}

Component.checkList = function (outerElms) {
    $(outerElms).each(function () {
        var groupName = $(this).attr('data-checkGroup');
        var checkElms = $(this).find(':checkbox');
        var allElm = checkElms.filter('.select-all');
        checkElms = checkElms.not(allElm);

        var allChecked = true;
        checkElms.each(function (n) {
            this.name = groupName;
            this.id = groupName + n;
            $(this).nextAll('label').prop('for', this.id);

            if (!this.checked)
                allChecked = false;

            $(this).click(function () {
                allElm.prop('checked', checkElms.filter(':not(:checked)').length == 0);
            });
        });

        if (allChecked)
            allElm.prop('checked', true);

        allElm.click(function () {
            checkElms.prop('checked', this.checked);
        });
    });
}

Component.dataList = function (tableId) {
    var tableElm = $('#' + tableId);
    
    var eventObj = {};

    tableElm.find('a[data-action]').click(function (e) {
        var action = $(this).attr('data-action');
        var btnOuterElm = $(this).closest('div'); //$(this).parent();
        var tbodyElm = tableElm.children('tbody');

        var relativeSpan = tableElm.find('span[data-for="' + action + '"]');
        if (relativeSpan.length) {
            btnOuterElm.children().hide();
            relativeSpan.fadeIn();
        }
        
        if (action == 'sort') {
            tbodyElm.find('td.sort').each(function () {
                $(this).data('originalIndex', this.innerHTML);
                this.innerHTML = '<div class="input-field"><input placeholder="" type="text" value="' + this.innerHTML + '"></div>';                
            });
        } else if (action == 'add') {
            e.preventDefault();
            var mainWin = Component.openRight(this.href);
            if (eventObj.opened)
                eventObj.opened(mainWin, action);
        } else if (action == 'del') {
            tbodyElm.find('td.edit').each(function (n) {
                if (!$(this).data('editHtml'))
                    $(this).data('editHtml', this.innerHTML);
                var id = tableId + '_del_' + n;
                this.innerHTML = '<input type="checkbox" id="' + id + '" /><label for="' + id + '"></label>';
            });
        } else {
            if ($(this).attr('data-select') == 'true') {
                tbodyElm.find('td.edit').each(function (n) {
                    if (!$(this).data('editHtml'))
                        $(this).data('editHtml', this.innerHTML);
                    var id = tableId + '_select_' + n;
                    this.innerHTML = '<input type="checkbox" id="' + id + '" /><label for="' + id + '"></label>';
                });
            }
        }
    });
    
    tableElm.find('span[data-for]').each(function () {
        var action = $(this).attr('data-for');        
        var btnOuterElm = $(this).parent();
        var tbodyElm = tableElm.children('tbody');
        
        $(this).find('a.no').click(function () {
            if (action == 'sort') {
                tbodyElm.find('td.sort').each(function (n) {
                    this.innerHTML = (n + 1).toString();                    
                });                
            } else if (action == 'del' || tableElm.find('a[data-action="' + action + '"]').attr('data-select') == 'true') {
                tbodyElm.find('td.edit').each(function () {                    
                    this.innerHTML = $(this).data('editHtml');
                });                
            }

            btnOuterElm.children('span[data-for]').hide();
            btnOuterElm.children('a').fadeIn();

            if (eventObj.canceled)
                eventObj.canceled(action);                
        });

        $(this).find('a.yes').click(function () {            
            if (action == 'sort') {
                var sortVals = [];
                var status = true;
                tbodyElm.find('td.sort').each(function () {
                    var id = $(this).closest('tr').attr('data-id');
                    var originalIndex = $(this).data('originalIndex') - 0;
                    var curIndex = $(this).find('input').val() - 0;
                    if (isNaN(curIndex)) {
                        Component.alert('排序值必須為數字');
                        status = false;
                        return false;
                    }

                    if (curIndex != originalIndex)
                        sortVals.push({ ID: id, Index: curIndex });
                });

                if (status && eventObj.sorted)
                    eventObj.sorted(sortVals);

            } else if (action == 'del') {
                var delVals = [];
                tbodyElm.find('td.edit').each(function () {
                    if ($(this).find('input').prop('checked')) {
                        var id = $(this).closest('tr').attr('data-id');
                        delVals.push(id);
                    }                    
                });

                if (eventObj.deleted)
                    eventObj.deleted(delVals);
            } else {
                if (tableElm.find('a[data-action="' + action + '"]').attr('data-select') == 'true') {
                    var selectedVals = [];
                    tbodyElm.find('td.edit').each(function () {
                        if ($(this).find('input').prop('checked')) {
                            var id = $(this).closest('tr').attr('data-id');
                            selectedVals.push(id);
                        }
                    });

                    if (eventObj.selected)
                        eventObj.selected(action, selectedVals);
                }
            }
        });        
    });

    tableElm.on('click', 'a.openRight,a.openCenter,a.iframe', function (e) {
        var mainWin = null;
        if ($(this).hasClass('openRight')) {
            mainWin = Component.openRight(this.href);
        } else if ($(this).hasClass('openCenter')) {
            mainWin = Component.openCenter(this.href);
        } else if ($(this).hasClass('iframe')) {
            mainWin = Component.iframe(this);
        }

        if (mainWin) {
            e.preventDefault();
            if (eventObj.opened)
                eventObj.opened(mainWin, 'modify');
        }        
    });

    tableElm.on('click', 'a.showStatus', function () {
        var id = $(this).closest('tr').attr('data-id');
        if (eventObj.statusChange)
            eventObj.statusChange(id);
        
        var iconElm = $(this).find('i');
        if (iconElm.hasClass('cc-eye')) {
            iconElm.removeClass('cc-eye').addClass('cc-eye-off font-red');
        } else {
            iconElm.removeClass('cc-eye-off font-red').addClass('cc-eye');
        }
    });
        
    return eventObj;
}

Component.searchBox = function (searchBox, btnOpen) {
    var searchBox = $(searchBox);
    var height = searchBox.outerHeight();

    if (searchBox.hasClass('pushup')) {
        $('.fixTable, .pagination').css({
            top: height
        });               
    } else {
        $('.fixTable, .pagination').css({
            top: 0
        });
    }

    searchBox.find('a.btn-close').click(function () {
        searchBox.removeClass('pushup');
        $('.fixTable, .pagination').css({
            top: 0
        });
    });

    $(btnOpen).click(function () {
        searchBox.toggleClass('pushup');
        if (searchBox.hasClass('pushup')) {
            $('.fixTable, .pagination').css({
                top: height
            });
        } else {
            $('.fixTable, .pagination').css({
                top: 0
            });
        }
    });     
}

Component.paragraph = function (outerElm, editUrl, matchUrl, matchDelUrl, sourceNo) {
    outerElm = $(outerElm);

    function assignIds() {
        var fieldPrefix = outerElm.attr('data-field');
        outerElm.children().each(function (n) {
            $(this).find('[data-field]').each(function () {
                var field = $(this).attr('data-field');
                this.name = this.id = fieldPrefix + "[" + n + "]." + field;
            });

            $(this).find('[data-group]').each(function () {
                var group = $(this).attr('data-group');
                $(this).find(':radio').each(function (index) {
                    this.name = group + n;
                    this.id = this.name + "_" + index;

                    $(this).nextAll('label').prop('for', this.id);
                });
            });
        });
    }

    function initParagraph(container) {
        container.find('textarea[data-field="Contents"]').each(function () {
            Component.editor(this);
        });

        container.find('[data-group]').each(function () {
            var $this = $(this);
            var group = $this.attr('data-group');
            var valElm = $this.find('input[type="hidden"]');
            var v = valElm.val();
            $this.find(':radio').each(function () {
                $(this).click(function () {
                    if (group == 'pos') {
                        if (this.value == '文繞圖') {
                            $this.next().find(':radio[value="圖片置中"]').parent().fadeOut();
                        } else {
                            $this.next().find(':radio[value="圖片置中"]').parent().fadeIn();
                        }
                    }

                    valElm.val(this.value);
                });

                if (this.value == v) {
                    this.checked = true;
                    $(this).triggerHandler('click');
                }
            });
        });

        container.find('a[data-sort]').click(function () {
            var liElm = $(this).closest('li');
            var dir = $(this).attr('data-sort');
            if (dir == 'up') {
                var prevLi = liElm.prev();
                if (prevLi.length) {
                    liElm.fadeOut(function () {
                        prevLi.before(liElm);
                        liElm.fadeIn();
                        assignIds();
                    });
                }
            } else {
                var nextLi = liElm.next();
                if (nextLi.length) {
                    liElm.fadeOut(function () {
                        nextLi.after(liElm);
                        liElm.fadeIn();
                        assignIds();
                    });
                }
            }
        });

        container.find('a.delParagraph').click(function () {
            var liElm = $(this).closest('li');
            var paragraphId = liElm.find('input[data-field="ID"]').val();
            Component.confirm('刪除後，資料無法復原，確定刪除？', function (isConfirm) {
                if (isConfirm) {
                    var delValElm = outerElm.nextAll('input:hidden:first');
                    var delVal = delValElm.val();
                    delVal = delVal ? delVal.split(',') : [];

                    delVal.push(paragraphId);
                    delValElm.val(delVal.join());

                    liElm.fadeOut(function () {
                        liElm.remove();
                        assignIds();
                    });
                }
            }, 'warning');
        });

        container.find('li.paragraph').each(function () { // 注意：這段程式只會在 container == outerElm 時執行
            var matchType = $(this).find('input[data-field="MatchType"]').val();
            if (matchType) {
                loadMatch($(this), matchType);
            }
        });

        container.on('click', 'a.delMatch', function () {
            var $this = $(this);
            Component.confirm('刪除後，資料無法復原，確定刪除？', function (isConfirm) {
                if (isConfirm) {
                    var paragraphElm = $this.closest('li.paragraph');
                    var paragraphId = paragraphElm.find('input[data-field="ID"]').val();
                    var matchType = paragraphElm.find('input[data-field="MatchType"]').val();
                    $.get(matchDelUrl + '&paragraphId=' + paragraphId + '&matchType=' + matchType, function () {
                        paragraphElm.find('input[data-field="MatchType"]').val('');
                        paragraphElm.find('li.matchContent').slideUp(function () {
                            $(this).html('').show();
                        });
                    });
                }
            });
        })
    }

    outerElm.load(editUrl + '&sourceNo=' + sourceNo, function () {
        assignIds();
        initParagraph(outerElm);
    });

    function loadMatch(paragraphLi, matchType) {
        var paragraphId = paragraphLi.find('input[data-field="ID"]').val();
        $.get(matchUrl + '&paragraphId=' + paragraphId + '&matchType=' + matchType, function (html) {
            var matchOuterElm = paragraphLi.find('li.matchContent');
            matchOuterElm.fadeOut(function () {
                matchOuterElm.html(html);

                if (matchType == 'voice') {
                    matchOuterElm.find('div[data-voice]').each(function () {
                        this.id = Component.guid();
                        jwplayer(this.id).setup({
                            file: $(this).attr('data-voice'),
                            width: 240,
                            height: 30,
                            skin: {
                                active: "#2e2e2e"
                            }
                        });
                    });
                } else if (matchType == 'video') {                    
                    var videoElm = matchOuterElm.find('div[data-video]');
                    if (videoElm.length > 0) {
                        videoElm.prop('id', Component.guid());
                        jwplayer(videoElm.prop('id')).setup({
                            width: "100%",
                            height: "100%",
                            type: "mp4",
                            file: videoElm.attr('data-video'),
                            image: videoElm.attr('data-shot'),
                            skin: {
                                name: "default",//選擇主題
                                active: "#2e2e2e",//選擇主色
                                inactive: "#ffffff",
                                background: "rgba(255,255,255,0)"//選擇背景
                            },
                            showdownload: false,
                            aspectratio: "16:9",//影片比例
                            autostart: false //自動播放
                        });
                    }
                }

                if (matchType == 'img' || matchType == 'video') {
                    matchOuterElm.next().fadeIn();
                } else {
                    matchOuterElm.next().fadeOut();
                }

                matchOuterElm.fadeIn();
            });
        });
    }

    outerElm.on('click', 'a.match', function (e) {
        e.preventDefault();
        var mainWin = Component.openRight(this.href);
        var matchType = $(this).find('i').attr('data-value');
        var matchValElm = $(this).closest('ul').next();
        var paragraphElm = $(this).closest('li.paragraph');
                
        mainWin.getPosConfig = function () {
            return paragraphElm.find('input[data-field="ImgPos"]').val();
        }

        mainWin.refreshResourceItems = function () { // refreshResourceItems 是固定名稱，由點擊打開的 lightbox 調用
            loadMatch(paragraphElm, matchType);
            matchValElm.val(matchType);
        };
    });

    outerElm.on('click', 'a.matchItem', function (e) {
        e.preventDefault();
        var mainWin = Component.openRight(this.href);
        var matchType = $(this).parent().attr('data-match');
        var paragraphElm = $(this).closest('li.paragraph');

        mainWin.getPosConfig = function () {
            return paragraphElm.find('input[data-field="ImgPos"]').val();
        }

        mainWin.refreshResourceItems = function () {
            loadMatch(paragraphElm, matchType);
        };
    });

    outerElm.next('a.paragraph-add').click(function () {
        $.get(editUrl, function (html) {
            var pElm = $(html);
            outerElm.append(pElm);
            assignIds();
            initParagraph(pElm);
        });
    });
}

Component.scrollLoad = function (bottomOffset, fn) {
    $(window).scroll(function () {
        var win = $(window);        
        var winHeight = win.height();                  
        var scrollTop = win.scrollTop();        
        var docHeight = $(document).height();

        if ((bottomOffset + scrollTop) >= docHeight - winHeight) {
            fn();
        }
    });
}

Component.click = function (outerElm, basePath, siteID, menuID) {
    outerElm = $(outerElm);

    // 刷新預覽物件
    function RefrechPreview(type, data) {
        $.post(basePath + "Backend/Click/ClickPreview", { SiteID: siteID, MenuID: menuID, clickType: type, data: data }, function (html) {
            if (html != null && html != "") {
                outerElm.find('#ClickEventPreview').html(html);
                outerElm.find('#ClickEventAdmin').hide();
            } else {
                outerElm.find('#ClickEventPreview').html("");
                outerElm.find('#ClickEventAdmin').show();
            }
        });
    }

    function GetEditUrl(type) {
        var url = basePath;
        if (type == 1) {
            url += "Backend/Click/ImgEdit?SiteID=" + siteID + "&MenuID=" + menuID;
        } else if (type == 2) {
            url += "Backend/Click/VideoEdit?SiteID=" + siteID + "&MenuID=" + menuID;
        } else if (type == 3) {
            url += "Backend/Click/VoiceEdit?SiteID=" + siteID + "&MenuID=" + menuID;
        } else if (type == 4) {
            url += "Backend/Click/FileEdit?SiteID=" + siteID + "&MenuID=" + menuID;
        } else if (type == 5) {
            url += "Backend/Click/LinkEdit?SiteID=" + siteID + "&MenuID=" + menuID;
        }
        return url;
    }

    // 初始作業
    var intiType = outerElm.find('#ClickType').val();
    if (intiType != 0) {
        var intiData = outerElm.find('#ClickEvent').val();
        RefrechPreview(intiType, intiData);
    }

    // 編輯點擊事件
    outerElm.on('click', 'a.click', function (e) {
        e.preventDefault();
        var mainWin = Component.openRight(this.href);
        mainWin.getClickType = function () {
            return outerElm.find('#ClickType').val();
        }
        mainWin.getClickEvent = function () {
            return $.parseJSON(outerElm.find('#ClickEvent').val());
        }
        mainWin.setClick = function (type, data) {
            outerElm.find('#ClickType').val(type);
            outerElm.find('#ClickEvent').val(JSON.stringify(data));
            RefrechPreview(type, JSON.stringify(data));
        }
    });

    // 刪除點擊事件
    outerElm.on('click', 'a.delclick', function () {
        var $this = $(this);
        Component.confirm('刪除後，資料無法復原，確定刪除？', function (isConfirm) {
            if (isConfirm) {
                outerElm.find('#ClickType').val("0");
                outerElm.find('#ClickEvent').val("{}");
                outerElm.find('#ClickEventPreview').html("");
                outerElm.find('#ClickEventAdmin').show();
            }
        });
    });
}

Component.worldRegion = function (valElm, regionUrl, options) {
    options = $.extend({
        showLevel: 4, 
        fix: [] // 固定國家、省、縣市 等，固定的部分將不會顯示
    }, options);
        
    valElm = $(valElm);
    var val = $.trim(valElm.val());
    if (val)
        val = $.parseJSON(val);
    else
        val = options.fix;

    var titles = ['', '國家', '省/州', '縣/市', '行政區'];

    function createSelectElm(regions, prevElm) {
        if (!regions || regions.length == 0 || regions[0].Levels > options.showLevel)
            return;

        var html = '<div class="col-4 region" data-level="' + regions[0].Levels + '"><select>';

        var title = titles[regions[0].Levels];
        html += '<option value="">' + title + '</option>';
        for (var i = 0, len = regions.length; i < len; ++i) {
            var item = regions[i];

            var selected = '';
            if (val && $.inArray(item.ID, val) != -1)
                selected = ' selected';
            html += '<option value="' + item.ID + '"' + selected + '>' + item.Name + '</option>';
        }

        html += '</select></div>';

        var selectElm = $(html).hide();
        if (prevElm) {
            prevElm.after(selectElm);
        } else {
            valElm.before(selectElm);
        }

        if (($.inArray((selectElm.find('select').val() || 0) - 0, options.fix) == -1))
            selectElm.fadeIn();

        selectElm.find('select').change(function () {
            var outerElm = $(this).closest('div.region');
            outerElm.nextAll('div.region').remove();

            var v = $(this).val();
            if (v) {
                $.getJSON(regionUrl + '?parentId=' + v, function (subRegions) {
                    if (subRegions && subRegions.length > 0)
                        createSelectElm(subRegions, outerElm);
                });
            }
        }).change().material_select();
    }

    $.getJSON(regionUrl, function (regions) {
        createSelectElm(regions);
    });

    var obj = {
        getVal: function () {
            var regions = [];
            valElm.prevAll('div.region').each(function () {
                var v = $(this).find('select').val();
                if (v)
                    regions.unshift(v - 0);
            });

            return regions;
        },
        getTextVal: function () {
            var regions = [];
            valElm.prevAll('div.region').each(function () {
                var item = $(this).find('select :selected');
                if (item.val()) {
                    regions.unshift(item.prop('text'));
                }
            });
            return regions;
        },
        setShowLevel: function (level) {
            options.showLevel = level;
            valElm.prevAll('div.region').each(function (n) {
                var curLevel = $(this).attr('data-level') - 0;
                if (n == 0 && curLevel < level) {
                    $(this).find('select').triggerHandler('change');
                    return false;
                } else if (curLevel > level)
                    $(this).remove();
            });
        }
    };
    
    valElm.closest('form').submit(function () {
        var regions = obj.getVal();
        valElm.val(regions.length > 0 ? JSON.stringify(regions) : '');
    });

    return obj;
}

Component.queryString = function (key) {
    var querys = location.search;
    if (!querys)
        return null;

    key = key.toLowerCase();
    querys = querys.substring(1).split('&');

    for (var i = 0, len = querys.length; i < len; ++i) {
        var q = $.trim(querys[i]);
        if (!q)
            continue;

        q = q.split('=');
        if (q[0].toLowerCase() == key) {
            q.shift();
            return $.trim(decodeURIComponent(q.join('=')));
        }
    }
}

Component.parseDate = function (date) {
    var reg = /^(\d{4})([-\/\.])(\d{1,2})\2(\d{1,2})(\s(\d{1,2})(:(\d{1,2}))?)?$/;
    var m = date.match(reg);
    if (!m)
        return null;

    var year = m[1] - 0, month = m[3] - 1, day = m[4] - 0, hour = 0, minute = 0;
    if (year < 1800)
        return null;

    if (m[6]) {
        hour = m[6] - 0;
        if (hour > 23)
            return null;
    }

    if (m[8]) {
        minute = m[8] - 0;
        if (minute > 59)
            return null;
    }

    date = new Date(year, month, day, hour, minute);
    if (date.getFullYear() != year || date.getMonth() != month || date.getDate() != day)
        return null;

    return date;
}

Component.showElementError = function (element, msg, isSlide) {
    $(element).validationEngine('showPrompt', msg, 'error', null, true);
    $('div.formError').click(function () {
        $(this).fadeOut('normal', function () { $(this).remove(); });
    });

    if (isSlide) {
        $body = (window.opera) ? (document.compatMode == 'CSS1Compat' ? $('html') : $('body')) : $('html,body');
        $body.animate({ scrollTop: $('div.formError:first').offset().top }, 500);
    }
}
Component.memberCollection = function (element, collectionType, collectionUrl) {
    if (collectionType < 0) {
        $(element).bind("click", function () {
            swal({
                customClass: 'animated fadeIn',
                type: 'warning',
                html:
                  '<div><span>請先登入會員!</span></div>',
                confirmButtonText: '確定',
                showConfirmButton: true
            }).then(function (isConfirm) {
                location.href = "Login";
            });
        });
    }
    else if (collectionType == 1) {
        $(element).html("<i class=\"cc cc-favorite\"></i>"); //carrie 20180216
        $(element).bind("click", function () {
            swal({
                html:
                  '<div><span>您已收藏此頁面</span></div>'
            });//carrie 20180216
        });
    }
    else {
        $(element).html("<i class=\"cc cc-favorite-o\"></i>"); //carrie 20180216
        $(element).bind("click", function () {
            var url = collectionUrl.replace("&amp;", "&").replace("&amp;", "&");
            $.get(url, function (rs) {

                //if (!rs) {
                swal({
                    customClass: 'animated fadeIn',
                    type: 'warning',
                    html:
                      '<div><span>收藏成功!</span></div>',
                    confirmButtonText: '確定',
                    showConfirmButton: true
                }).then(function (isConfirm) {
                    location.href = location.href;
                    //console.log(rs);
                });
                //}
            });

            //alert(pageID);
            //$.ajax({
            //    type: "POST",
            //    url: url,
            //    data: data,
            //    success: success,
            //    dataType: dataType
            //});
        });
    }
}