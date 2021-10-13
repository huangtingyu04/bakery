$(function() {

    //colorbox
    $('.openEdit').colorbox({
        width: function() {
            var NW = "400";
            if ($.isNumeric($(this).data("width"))) {
                NW = $(this).data("width");
            }
            //console.log("NW:" + NW);
            return NW;
        },
        height: function() {
            var NH = "350";
            if ($.isNumeric($(this).data("height"))) {
                NH = $(this).data("height");
            }
            //console.log("NH:" + NH);
            return NH;
        },
        maxWidth: '95%',
        maxHeight: '95%',
        iframe: true,
        onOpen: function(){
            $('body').css({ overflow: 'hidden' });
        },
        onClosed: function(){
            $('body').css({ overflow: '' });
        },
        onComplete:function(){
            $("#cboxLoadedContent iframe").on('load', function(){
                var iframe = $('iframe.cboxIframe');
                var body = iframe.contents().find('body');
                body.addClass('body-lightBox');
            });
        }
    });

    //tooltipster
    $('.tooltip').tooltipster({
        maxWidth: 250,
    });
    $('.tooltip-content').tooltipster({
        minWidth: 150,
        maxWidth: 250
    });
    $('.tooltip-info').tooltipster({
        maxWidth: 250,
    });

    //sweetalert
    $('.data-del').on('click', function() {
        parent.window.swal({
            // title: 'Are you sure?',
            text: '刪除後，資料無法復原，確定刪除？',
            type: 'warning',
            showCancelButton: true,
            // confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: '刪除',
            cancelButtonText: '取消',
            animation: false,
            customClass: 'animated fadeIn'
        });
    });

    //上傳Demo暫時放這
    //File upload Multiple
    $('input[name="FilesMultiple"]').fileuploader({
        changeInput: '<div class="fileuploader-input">' +
                          '<div class="fileuploader-input-inner">' +
                              '<i class="cc cc-cloud-upload-o"></i>' +
                              '<h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
                              '<p>or</p>' +
                              '<div class="fileuploader-input-button"><span>Browse Files</span></div>' +
                          '</div>' +
                      '</div>',
        theme: 'dragdrop',
        thumbnails: {
            item: '<li class="fileuploader-item">' +
                       '<div class="columns">' +
                           '<div class="column-thumbnail">${image}</div>' +
                           '<div class="column-title">' +
                               '<div class="title-name" title="${name}">${name}</div>' +
                               '<span>${size2}</span>' +
                           '</div>' +
                           '<div class="column-actions">' +
                                '<a href="javascript:" class="btn-sort square transparent fileuploader-action-sort tooltip" title="排序"><i class="cc cc-drag"></i></a>' +
                                '<a href="${file}" class="btn-download square transparent fileuploader-action-download tooltip" title="下載"><i class="cc cc-download"></i></a>' +
                                '<a href="../../Views/Share/BackEnd/fileTextEdit.aspx" class="btn-grey-o square transparent fileuploader-action-rename tooltip openfileEdit" title="重新命名"><i class="cc cc-edit-o"></i></a>' +
                                '<a class="btn-del square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                           '</div>' +
                       '</div>' +
                       '<div class="progress-bar2">${progressBar}<span></span></div>' +
                   '</li>',
            item2: '<li class="fileuploader-item">' +
                        '<div class="columns">' +
                            '<a href="${file}" target="_blank">' +
                                '<div class="column-thumbnail">${image}</div>' +
                                '<div class="column-title">' +
                                    '<div class="title-name" title="${name}">${name}</div>' +
                                    '<span>${size2}</span>' +
                                '</div>' +
                            '</a>' +
                            '<div class="column-actions">' +
                                '<a href="javascript:" class="btn-sort square transparent fileuploader-action-sort tooltip" title="排序"><i class="cc cc-drag"></i></a>' +
                                '<a href="${file}" class="btn-download square transparent fileuploader-action-download tooltip" title="下載"><i class="cc cc-download"></i></a>' +
                                '<a href="../../Views/Share/BackEnd/fileTextEdit.aspx" class="btn-grey-o square transparent fileuploader-action-rename tooltip openfileEdit" title="重新命名"><i class="cc cc-edit-o"></i></a>' +
                                '<a class="btn-del square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                            '</div>' +
                        '</div>' +
                    '</li>',
            onItemShow: function(item, listEl) {
                $('.tooltip').tooltipster({
                    maxWidth: 100,
                });
                $('.openfileEdit').colorbox({
                    width: "70%",
                    height: "160",
                    transition: false,
                    maxWidth: "70%",
                    maxHeight: "50%",
                    opacity: 0,
                    right: "20",
                    bottom: "100",
                    iframe: true,
                    // speed: 0,
                    fadeOut: 300,
                    fixed: true
                });
                $( ".fileuploader-items-list" ).sortable({
                    handle: ".btn-sort",
                    helper: "clone",
                    appendTo: "body"
                });
                $( ".fileuploader-items-list" ).disableSelection();
            }
        }
    });
    //File upload Single
    $('input[name="FileSingle"]').fileuploader({
        theme: 'dragdrop',
        limit: 1,
        thumbnails: {
            item: '<li class="fileuploader-item">' +
                       '<div class="columns">' +
                           '<div class="column-thumbnail">${image}</div>' +
                           '<div class="column-title">' +
                               '<div class="title-name" title="${name}">${name}</div>' +
                               '<span>${size2}</span>' +
                           '</div>' +
                           '<div class="column-actions">' +
                                '<a href="${file}" class="btn-download square transparent fileuploader-action-download tooltip" title="下載"><i class="cc cc-download"></i></a>' +
                                '<a href="../../Views/Share/fileTextEdit.aspx" class="btn-grey-o square transparent fileuploader-action-rename tooltip openfileEdit" title="重新命名"><i class="cc cc-edit-o"></i></a>' +
                                '<a class="btn-del square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                           '</div>' +
                       '</div>' +
                       '<div class="progress-bar2">${progressBar}<span></span></div>' +
                   '</li>',
            item2: '<li class="fileuploader-item">' +
                        '<div class="columns">' +
                            '<a href="${file}" target="_blank">' +
                                '<div class="column-thumbnail">${image}</div>' +
                                '<div class="column-title">' +
                                    '<div class="title-name" title="${name}">${name}</div>' +
                                    '<span>${size2}</span>' +
                                '</div>' +
                            '</a>' +
                            '<div class="column-actions">' +
                                '<a href="${file}" class="btn-download square transparent fileuploader-action-download tooltip" title="下載"><i class="cc cc-download"></i></a>' +
                                '<a href="../../Views/Share/fileTextEdit.aspx" class="btn-grey-o square transparent fileuploader-action-rename tooltip openfileEdit" title="重新命名"><i class="cc cc-edit-o"></i></a>' +
                                '<a class="btn-del square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                            '</div>' +
                        '</div>' +
                    '</li>',
            onItemShow: function(item, listEl) {
                $('.tooltip').tooltipster({
                    maxWidth: 100,
                });
                $('.openfileEdit').colorbox({
                    width: "70%",
                    height: "160",
                    transition: false,
                    maxWidth: "70%",
                    maxHeight: "50%",
                    opacity: 0,
                    right: "20",
                    bottom: "100",
                    iframe: true,
                    // speed: 0,
                    fadeOut: 300,
                    fixed: true
                });
            }
        }
    })
    //image upload Multiple
    $('input[name="imgFilesMultiple"]').fileuploader({
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
        changeInput: '<div class="fileuploader-input">' +
                      '<div class="fileuploader-input-inner">' +
                          '<i class="cc cc-cloud-upload-o"></i>' +
                          '<h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
                          '<p>or</p>' +
                          '<div class="fileuploader-input-button"><span>Browse Files</span></div>' +
                      '</div>' +
                  '</div>',
        theme: 'thumbnails',
        enableApi: true,
        addMore: true,
        thumbnails: {
            item: '<li class="fileuploader-item">' +
                       '<div class="fileuploader-item-inner">' +
                           '<div class="thumbnail-holder">${image}</div>' +
                           '<div class="actions-holder">' +
                               '<a class="btn-white-o square transparent fileuploader-action-image tooltip" title="裁切" href="javascript:"><i class="cc cc-camera-o"></i></a>' +
                               '<a class="btn-white-o square transparent fileuploader-action-text tooltip openEdit" title="編輯圖說" href="../../Views/Share/imgTextEdit.aspx"><i class="cc cc-edit-o"></i></a>' +
                               '<a class="btn-white-o square transparent fileuploader-action-show tooltip" title="顯示" href="javascript:"><i class="cc cc-eye"></i></a>' +
                               '<a class="btn-del btn-white-o square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                           '</div>' +
                           '<div class="progress-holder">${progressBar}</div>' +
                       '</div>' +
                   '</li>',
            item2: '<li class="fileuploader-item">' +
                       '<div class="fileuploader-item-inner">' +
                           '<div class="thumbnail-holder">${image}</div>' +
                           '<div class="actions-holder">' +
                               '<a class="btn-white-o square transparent fileuploader-action-image tooltip" title="裁切" href="javascript:"><i class="cc cc-camera-o"></i></a>' +
                               '<a class="btn-white-o square transparent fileuploader-action-text tooltip openEdit" title="編輯圖說" href="../../Views/Share/imgTextEdit.aspx"><i class="cc cc-edit-o"></i></a>' +
                               '<a class="btn-white-o square transparent fileuploader-action-show tooltip" title="顯示" href="javascript:"><i class="cc cc-eye"></i></a>' +
                               '<a class="btn-del btn-white-o square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                           '</div>' +
                       '</div>' +
                   '</li>',
            startImageRenderer: true,
            canvasImage: false,
            _selectors: {
                list: '.fileuploader-items-list',
                item: '.fileuploader-item',
                start: '.fileuploader-action-start',
                retry: '.fileuploader-action-retry',
                remove: '.fileuploader-action-remove'
            },
            onItemShow: function(item, listEl) {
                var plusInput = listEl.find('.fileuploader-thumbnails-input');
                
                plusInput.insertAfter(item.html);
                
                if(item.format == 'image') {
                    item.html.find('.fileuploader-item-icon').hide();
                };

                $('.openEdit').colorbox({
                    width: function() {
                        var NW = "500";
                        if ($.isNumeric($(this).data("width"))) {
                            NW = $(this).data("width");
                        }
                        //console.log("NW:" + NW);
                        return NW;
                    },
                    height: function() {
                        var NH = "400";
                        if ($.isNumeric($(this).data("height"))) {
                            NH = $(this).data("height");
                        }
                        //console.log("NH:" + NH);
                        return NH;
                    },
                    maxWidth: '95%',
                    maxHeight: '95%',
                    iframe: true,
                    onOpen: function(){
                        $('body').css({ overflow: 'hidden' });
                    },
                    onClosed: function(){
                        $('body').css({ overflow: '' });
                    },
                    onComplete:function(){
                        $("#cboxLoadedContent iframe").on('load', function(){
                            var iframe = $('iframe.cboxIframe');
                            var body = iframe.contents().find('body');
                            body.addClass('body-lightBox');
                        });
                    }
                });

                $('.tooltip').tooltipster({
                    maxWidth: 100,
                });
                $( ".fileuploader-items-list" ).sortable();
                $( ".fileuploader-items-list" ).disableSelection();
            }
        },
        afterRender: function(listEl, parentEl, newInputEl, inputEl) {
            var plusInput = listEl.find('.fileuploader-thumbnails-input'),
                api = $.fileuploader.getInstance(inputEl.get(0));
        
            plusInput.on('click', function() {
                api.open();
            });
        }
    });
    //image upload Single
    $('input[name="imgFile"]').fileuploader({
      limit: 1,
      extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
      changeInput: ' ',
      theme: 'thumbnails',
      enableApi: true,
      addMore: false,
      thumbnails: {
        box: '<div class="fileuploader-items singleImg">'+
              '<ul class="fileuploader-items-list">'+
                '<li class="fileuploader-thumbnails-input">'+
                  '<div class="fileuploader-thumbnails-input-inner">'+
                    '<i class="cc cc-cloud-upload-o"></i>' +
                    '<h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
                    '<p>or</p>' +
                    '<div class="fileuploader-input-button"><span>Browse Files</span></div>' +
                  '</div>'+
                '</li>'+
              '</ul>'+
            '</div>',
        item: '<li class="fileuploader-item">' +
                '<div class="fileuploader-item-inner">' +
                  '<div class="thumbnail-holder">${image}</div>' +
                  '<div class="actions-holder">' +
                    '<a class="btn-white-o square transparent fileuploader-action-image tooltip" title="裁切" href="javascript:"><i class="cc cc-camera-o"></i></a>' +
                    '<a class="btn-white-o square transparent fileuploader-action-text tooltip openEdit" title="編輯圖說" href="../../Views/Share/imgTextEdit.aspx"><i class="cc cc-edit-o"></i></a>' +
                    '<a class="btn-white-o square transparent fileuploader-action-show tooltip" title="顯示" href="javascript:"><i class="cc cc-eye"></i></a>' +
                    '<a class="btn-del btn-white-o square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                  '</div>' +
                  '<div class="progress-holder">${progressBar}</div>' +
                '</div>' +
              '</li>',
        item2: '<li class="fileuploader-item">' +
                '<div class="fileuploader-item-inner">' +
                  '<div class="thumbnail-holder">${image}</div>' +
                  '<div class="actions-holder">' +
                    '<a class="btn-white-o square transparent fileuploader-action-image tooltip" title="裁切" href="javascript:"><i class="cc cc-camera-o"></i></a>' +
                    '<a class="btn-white-o square transparent fileuploader-action-text tooltip openEdit" title="編輯圖說" href="../../Views/Share/imgTextEdit.aspx"><i class="cc cc-edit-o"></i></a>' +
                    '<a class="btn-white-o square transparent fileuploader-action-show tooltip" title="顯示" href="javascript:"><i class="cc cc-eye"></i></a>' +
                    '<a class="btn-del btn-white-o square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                  '</div>' +
                '</div>' +
              '</li>',
        startImageRenderer: true,
        canvasImage: false,
        _selectors: {
          list: '.fileuploader-items-list',
          item: '.fileuploader-item',
          start: '.fileuploader-action-start',
          retry: '.fileuploader-action-retry',
          remove: '.fileuploader-action-remove'
        },
        onItemShow: function(item, listEl, parentEl, newInputEl, inputEl) {
          var plusInput = listEl.find('.fileuploader-thumbnails-input'),
              api = $.fileuploader.getInstance(inputEl.get(0));

          if(api.getFiles().length >= api.getOptions().limit) {
            plusInput.hide();
          }

          plusInput.insertAfter(item.html);

          if(item.format == 'image') {
            item.html.find('.fileuploader-item-icon').hide();
          };

          $('.openEdit').colorbox({
              width: function() {
                  var NW = "500";
                  if ($.isNumeric($(this).data("width"))) {
                      NW = $(this).data("width");
                  }
                  //console.log("NW:" + NW);
                  return NW;
              },
              height: function() {
                  var NH = "400";
                  if ($.isNumeric($(this).data("height"))) {
                      NH = $(this).data("height");
                  }
                  //console.log("NH:" + NH);
                  return NH;
              },
              maxWidth: '95%',
              maxHeight: '95%',
              iframe: true,
              onOpen: function(){
                  $('body').css({ overflow: 'hidden' });
              },
              onClosed: function(){
                  $('body').css({ overflow: '' });
              },
              onComplete:function(){
                  $("#cboxLoadedContent iframe").on('load', function(){
                      var iframe = $('iframe.cboxIframe');
                      var body = iframe.contents().find('body');
                      body.addClass('body-lightBox');
                  });
              }
          });
          $('.tooltip').tooltipster({
            maxWidth: 100,
          });
        },
        onItemRemove: function(html, listEl, parentEl, newInputEl, inputEl) {
          var plusInput = listEl.find('.fileuploader-thumbnails-input'),
              api = $.fileuploader.getInstance(inputEl.get(0));

          html.children().animate({'opacity': 0}, 200, function() {
            setTimeout(function() {
              html.remove();

              if(api.getFiles().length - 1 < api.getOptions().limit) {
                plusInput.show();
              }
            }, 100);
          });
        }
      },
      afterRender: function(listEl, parentEl, newInputEl, inputEl) {
        var plusInput = listEl.find('.fileuploader-thumbnails-input'),
            api = $.fileuploader.getInstance(inputEl.get(0));

        plusInput.on('click', function() {
          api.open();
        });
      }
    });
    //image profile
    $('input[name="imgFileProfile"]').fileuploader({
      limit: 1,
      extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
      changeInput: ' ',
      theme: 'thumbnails',
      enableApi: true,
      addMore: false,
      thumbnails: {
        box: '<div class="imgFileProfile"><div class="fileuploader-items singleImg b-radius">'+
              '<ul class="fileuploader-items-list">'+
                '<li class="fileuploader-thumbnails-input">'+
                  '<a href="JavaScript:;" class="user"><i class="cc cc-user-o"></i></a>' +
                  '<a href="JavaScript:;" class="camera"><i class="cc cc-camera-o"></i></a>' +
                '</li>'+
              '</ul>'+
            '</div></div>',
        item: '<li class="fileuploader-item">' +
                '<div class="fileuploader-item-inner">' +
                  '<div class="thumbnail-holder b-radius">${image}</div>' +
                  '<div class="actions-holder">' +
                    '<a class="btn-white-o square transparent fileuploader-action-image tooltip" title="裁切" href="javascript:"><i class="cc cc-camera-o"></i></a>' +
                    '<a class="btn-del btn-white-o square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                  '</div>' +
                  '<div class="progress-holder">${progressBar}</div>' +
                '</div>' +
              '</li>',
        item2: '<li class="fileuploader-item">' +
                '<div class="fileuploader-item-inner">' +
                  '<div class="thumbnail-holder b-radius">${image}</div>' +
                  '<div class="actions-holder">' +
                    '<a class="btn-white-o square transparent fileuploader-action-image tooltip" title="裁切" href="javascript:"><i class="cc cc-camera-o"></i></a>' +
                    '<a class="btn-del btn-white-o square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                  '</div>' +
                '</div>' +
              '</li>',
        startImageRenderer: true,
        canvasImage: false,
        _selectors: {
          list: '.fileuploader-items-list',
          item: '.fileuploader-item',
          start: '.fileuploader-action-start',
          retry: '.fileuploader-action-retry',
          remove: '.fileuploader-action-remove'
        },
        onItemShow: function(item, listEl, parentEl, newInputEl, inputEl) {
          var plusInput = listEl.find('.fileuploader-thumbnails-input'),
              api = $.fileuploader.getInstance(inputEl.get(0));

          if(api.getFiles().length >= api.getOptions().limit) {
            plusInput.hide();
          }

          plusInput.insertAfter(item.html);

          if(item.format == 'image') {
            item.html.find('.fileuploader-item-icon').hide();
          };

          $('.openEdit').colorbox({
              width: function() {
                  var NW = "500";
                  if ($.isNumeric($(this).data("width"))) {
                      NW = $(this).data("width");
                  }
                  //console.log("NW:" + NW);
                  return NW;
              },
              height: function() {
                  var NH = "400";
                  if ($.isNumeric($(this).data("height"))) {
                      NH = $(this).data("height");
                  }
                  //console.log("NH:" + NH);
                  return NH;
              },
              maxWidth: '95%',
              maxHeight: '95%',
              iframe: true,
              onOpen: function(){
                  $('body').css({ overflow: 'hidden' });
              },
              onClosed: function(){
                  $('body').css({ overflow: '' });
              },
              onComplete:function(){
                  $("#cboxLoadedContent iframe").on('load', function(){
                      var iframe = $('iframe.cboxIframe');
                      var body = iframe.contents().find('body');
                      body.addClass('body-lightBox');
                  });
              }
          });
          $('.tooltip').tooltipster({
            maxWidth: 100,
          });
        },
        onItemRemove: function(html, listEl, parentEl, newInputEl, inputEl) {
          var plusInput = listEl.find('.fileuploader-thumbnails-input'),
              api = $.fileuploader.getInstance(inputEl.get(0));

          html.children().animate({'opacity': 0}, 200, function() {
            setTimeout(function() {
              html.remove();

              if(api.getFiles().length - 1 < api.getOptions().limit) {
                plusInput.show();
              }
            }, 100);
          });
        }
      },
      afterRender: function(listEl, parentEl, newInputEl, inputEl) {
        var plusInput = listEl.find('.fileuploader-thumbnails-input'),
            api = $.fileuploader.getInstance(inputEl.get(0));

        plusInput.on('click', function() {
          api.open();
        });
      }
    });
    //Video upload
    $('input[name="videoFile"]').fileuploader({
      limit: 1,
      extensions: ['mp4'],
      changeInput: ' ',
      theme: 'thumbnails',
      enableApi: true,
      addMore: false,
      thumbnails: {
        box: '<div class="fileuploader-items singleImg video">'+
              '<ul class="fileuploader-items-list">'+
                '<li class="fileuploader-thumbnails-input">'+
                  '<div class="fileuploader-thumbnails-input-inner">'+
                    '<i class="cc cc-cloud-upload-o"></i>' +
                    '<h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
                    '<p>or</p>' +
                    '<div class="fileuploader-input-button"><span>Browse Files</span></div>' +
                  '</div>'+
                '</li>'+
              '</ul>'+
            '</div>',
        item: '<li class="fileuploader-item">' +
                '<div class="fileuploader-item-inner">' +
                  '<div class="thumbnail-holder"><div id="video-mp4"></div></div>' +
                  '<div class="actions-holder">' +
                    '<a class="btn-del btn-white-o square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                  '</div>' +
                  '<div class="progress-holder">${progressBar}</div>' +
                '</div>' +
              '</li>',
        item2: '<li class="fileuploader-item">' +
                '<div class="fileuploader-item-inner">' +
                  '<div class="thumbnail-holder"><div id="video-mp4"></div></div>' +
                  '<div class="actions-holder">' +
                    '<a class="btn-del btn-white-o square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                  '</div>' +
                '</div>' +
              '</li>',
        startImageRenderer: true,
        canvasImage: false,
        _selectors: {
          list: '.fileuploader-items-list',
          item: '.fileuploader-item',
          start: '.fileuploader-action-start',
          retry: '.fileuploader-action-retry',
          remove: '.fileuploader-action-remove'
        },
        onItemShow: function(item, listEl, parentEl, newInputEl, inputEl) {
          var plusInput = listEl.find('.fileuploader-thumbnails-input'),
              api = $.fileuploader.getInstance(inputEl.get(0));

          if(api.getFiles().length >= api.getOptions().limit) {
            plusInput.hide();
          }

          plusInput.insertAfter(item.html);

          if(item.format == 'image') {
            item.html.find('.fileuploader-item-icon').hide();
          };

          $('.tooltip').tooltipster({
            maxWidth: 100,
          });
          $('.openEdit').colorbox({
              width: function() {
                  var NW = "500";
                  if ($.isNumeric($(this).data("width"))) {
                      NW = $(this).data("width");
                  }
                  //console.log("NW:" + NW);
                  return NW;
              },
              height: function() {
                  var NH = "400";
                  if ($.isNumeric($(this).data("height"))) {
                      NH = $(this).data("height");
                  }
                  //console.log("NH:" + NH);
                  return NH;
              },
              maxWidth: '95%',
              maxHeight: '95%',
              iframe: true,
              onOpen: function(){
                  $('body').css({ overflow: 'hidden' });
              },
              onClosed: function(){
                  $('body').css({ overflow: '' });
              },
              onComplete:function(){
                  $("#cboxLoadedContent iframe").on('load', function(){
                      var iframe = $('iframe.cboxIframe');
                      var body = iframe.contents().find('body');
                      body.addClass('body-lightBox');
                  });
              }
          });

          jwplayer("video-mp4").setup({
              width: "100%",
              height: "100%",
              type: "mp4",
              file: "<%= SysHelp.GetURL() %>images/temp/myVideo.mp4",
              image: "<%= SysHelp.GetURL() %>images/temp/myVideo.jpg",
              skin: {
                  name:"default",//選擇主題
                  active: "#2e2e2e",//選擇主色
                  inactive: "#ffffff",
                  background: "rgba(255,255,255,0)"//選擇背景
              },
              showdownload: false,
              aspectratio: "16:9",//影片比例
              autostart: false //自動播放
          });
        },
        onItemRemove: function(html, listEl, parentEl, newInputEl, inputEl) {
          var plusInput = listEl.find('.fileuploader-thumbnails-input'),
              api = $.fileuploader.getInstance(inputEl.get(0));

          html.children().animate({'opacity': 0}, 200, function() {
            setTimeout(function() {
              html.remove();

              if(api.getFiles().length - 1 < api.getOptions().limit) {
                plusInput.show();
              }
            }, 100);
          });
        }
      },
      afterRender: function(listEl, parentEl, newInputEl, inputEl) {
        var plusInput = listEl.find('.fileuploader-thumbnails-input'),
            api = $.fileuploader.getInstance(inputEl.get(0));

        plusInput.on('click', function() {
          api.open();
        });
      }
    });
    //voice upload Multiple
    $('input[name="VoiceMultiple"]').fileuploader({
        extensions: ['mp3'],
        changeInput: '<div class="fileuploader-input">' +
                          '<div class="fileuploader-input-inner">' +
                              '<i class="cc cc-cloud-upload-o"></i>' +
                              '<h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
                              '<p>or</p>' +
                              '<div class="fileuploader-input-button"><span>Browse Files</span></div>' +
                          '</div>' +
                      '</div>',
        theme: 'dragdrop',
        thumbnails: {
            box: '<div class="fileuploader-items voice">' +
                      '<ul class="fileuploader-items-list"></ul>' +
                  '</div>',
            item: '<li class="fileuploader-item">' +
                       '<div class="columns">' +
                           '<div class="column-title">' +
                               '<div class="title-name" title="${name}">${name}</div>' +
                               '<div id="voice-mp3"></div>' +
                           '</div>' +
                           '<div class="column-actions">' +
                                '<a href="javascript:" class="btn-sort square transparent fileuploader-action-sort tooltip" title="排序"><i class="cc cc-drag"></i></a>' +
                                '<a href="${file}" class="btn-download square transparent fileuploader-action-download tooltip" title="下載"><i class="cc cc-download"></i></a>' +
                                '<a href="../../Views/Share/BackEnd/fileTextEdit.aspx" class="btn-grey-o square transparent fileuploader-action-rename tooltip openvoiceEdit" title="重新命名"><i class="cc cc-edit-o"></i></a>' +
                                '<a class="btn-del square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                           '</div>' +
                       '</div>' +
                       '<div class="progress-bar2">${progressBar}<span></span></div>' +
                   '</li>',
            item2: '<li class="fileuploader-item">' +
                        '<div class="columns">' +
                            '<a href="${file}" target="_blank">' +
                                '<div class="column-title">' +
                                    '<div class="title-name" title="${name}">${name}</div>' +
                                    '<div id="voice-mp3"></div>' +
                                '</div>' +
                            '</a>' +
                            '<div class="column-actions">' +
                                '<a href="javascript:" class="btn-sort square transparent fileuploader-action-sort tooltip" title="排序"><i class="cc cc-drag"></i></a>' +
                                '<a href="${file}" class="btn-download square transparent fileuploader-action-download tooltip" title="下載"><i class="cc cc-download"></i></a>' +
                                '<a href="../../Views/Share/BackEnd/fileTextEdit.aspx" class="btn-grey-o square transparent fileuploader-action-rename tooltip openvoiceEdit" title="重新命名"><i class="cc cc-edit-o"></i></a>' +
                                '<a class="btn-del square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                            '</div>' +
                        '</div>' +
                    '</li>',
            onItemShow: function(item, listEl) {
                $('.tooltip').tooltipster({
                    maxWidth: 100,
                });
                $('.openvoiceEdit').colorbox({
                    width: "70%",
                    height: "160",
                    transition: false,
                    maxWidth: "70%",
                    maxHeight: "50%",
                    opacity: 0,
                    right: "20",
                    bottom: "100",
                    iframe: true,
                    // speed: 0,
                    fadeOut: 300,
                    fixed: true
                });
                $( ".fileuploader-items-list" ).sortable({
                    handle: ".btn-sort",
                    helper: "clone",
                    appendTo: "body"
                });
                $( ".fileuploader-items-list" ).disableSelection();
                jwplayer("voice-mp3").setup({
                    file: "<%= SysHelp.GetURL() %>images/temp/BraveShine.mp3",
                    width: 240,
                    height: 30,
                    skin: {
                        //name: "bekle",//主題
                        active: "#2e2e2e",//控制列主色
                        //inactive: "#ffffff",
                        //background: "rgba(0,0,0,0)"//控制列背景
                    }
                });
            }
        }
    });
    //voice upload Single
    $('input[name="VoiceFile"]').fileuploader({
        limit: 1,
        extensions: ['mp3'],
        changeInput: '<div class="fileuploader-input">' +
                          '<div class="fileuploader-input-inner">' +
                              '<i class="cc cc-cloud-upload-o"></i>' +
                              '<h3 class="fileuploader-input-caption"><span>Drag and drop files here</span></h3>' +
                              '<p>or</p>' +
                              '<div class="fileuploader-input-button"><span>Browse Files</span></div>' +
                          '</div>' +
                      '</div>',
        theme: 'dragdrop',
        thumbnails: {
            box: '<div class="fileuploader-items voice">' +
                      '<ul class="fileuploader-items-list"></ul>' +
                  '</div>',
            item: '<li class="fileuploader-item">' +
                       '<div class="columns">' +
                           '<div class="column-title">' +
                               '<div class="title-name" title="${name}">${name}</div>' +
                               '<div id="voice-mp3"></div>' +
                           '</div>' +
                           '<div class="column-actions">' +
                                '<a href="${file}" class="btn-download square transparent fileuploader-action-download tooltip" title="下載"><i class="cc cc-download"></i></a>' +
                                '<a class="btn-del square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                           '</div>' +
                       '</div>' +
                       '<div class="progress-bar2">${progressBar}<span></span></div>' +
                   '</li>',
            item2: '<li class="fileuploader-item">' +
                        '<div class="columns">' +
                            '<a href="${file}" target="_blank">' +
                                '<div class="column-title">' +
                                    '<div class="title-name" title="${name}">${name}</div>' +
                                    '<div id="voice-mp3"></div>' +
                                '</div>' +
                            '</a>' +
                            '<div class="column-actions">' +
                                '<a href="${file}" class="btn-download square transparent fileuploader-action-download tooltip" title="下載"><i class="cc cc-download"></i></a>' +
                                '<a class="btn-del square transparent fileuploader-action-remove tooltip" title="刪除" href="javascript:"><i class="cc cc-close"></i></a>' +
                            '</div>' +
                        '</div>' +
                    '</li>',
            onItemShow: function(item, listEl) {
                $('.tooltip').tooltipster({
                    maxWidth: 100,
                });
                jwplayer("voice-mp3").setup({
                    file: "<%= SysHelp.GetURL() %>images/temp/BraveShine.mp3",
                    width: 240,
                    height: 30,
                    skin: {
                        //name: "bekle",//主題
                        active: "#2e2e2e",//控制列主色
                        //inactive: "#ffffff",
                        //background: "rgba(0,0,0,0)"//控制列背景
                    }
                });
            }
        }
    });
    //上傳Demo暫時放這 END
});
