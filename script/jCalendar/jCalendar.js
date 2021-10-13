var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_name = [
	"January",
	"Febrary",
	"March",
	"April",
	"May",
	"June",
	"July",
	"Auguest",
	"September",
	"October",
	"November",
	"December"
];
var month_name_zhtw = [
	"一月",
	"二月",
	"三月",
	"四月",
	"五月",
	"六月",
	"七月",
	"八月",
	"九月",
	"十月",
	"十一月",
	"十二月"
];
var jc = $(".jcalendar");
var holder = $(".jcalendar ul.days");
var prev = $(".jcalendar .prev");
var next = $(".jcalendar .next");
var title = $(".jcalendar .title");
var ctitle = $(".jcalendar .calendar-title");
var cyear = $(".jcalendar .calendar-year");
var eventlist;
var defaultOptions;
var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();
prev.on("click", function (e) {
	e.preventDefault();
	my_month--;
	if (my_month < 0) {
		my_year--;
		my_month = 11;
	}
	refreshDate(defaultOptions);
});
next.on("click", function (e) {
	e.preventDefault();
	my_month++;
	if (my_month > 11) {
		my_year++;
		my_month = 0;
	}
	refreshDate(defaultOptions);
});

function refreshDate(options) {
	var str = "";
	var totalDay = daysMonth(my_month, my_year);
	var firstDay = dayStart(my_month, my_year);
	var myclass;

	defaultOptions = options;
	eventlist = options.eventlist;

	console.log(eventlist)

	for (var i = 1; i < firstDay; i++) {
		str += "<li class='empty'></li>";
	}
	for (var i = 1; i <= totalDay; i++) {
		var pastday = ""
		if ((i < my_day &&my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year < my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month < my_date.getMonth())) {
			if (options.disabled == '< today') {
				myclass = " class='lightgrey'";
				pastday = "pastday";
			}
		} else if (i == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth() ) {
			myclass = " class='today'";
		} else {
			myclass = " class='darkgrey other'";
			pastday = "other";
		}
		var thisday = my_year + "-" + (my_month + 1) + "-" + i;
		var elist = "",
			status = false;

		for(var tmp = 0; tmp < eventlist.length; tmp++) {
			var dat = eventlist[tmp];
			if (dat.date == thisday) {
				status = true;

				for(var tmplist = 0; tmplist < dat.list.length; tmplist++) {
					var edat = dat.list[tmplist],
						href = "javascript:;", cls, value;
					if (edat.type) {
						value = '<i class="cc cc-plus font-red"></i>';
						cls = 'goSwiper-0';
					} else {
						if (edat.href == "javascript:;") {
							href = edat.href;
							value = dat.list[tmplist].value;
							cls = '';
						} else {
							href = edat.href;
							value = dat.list[tmplist].value;
							cls = 'openCalendar-event';
						}
					}
					elist += '<a href="' + href + '" class="' + cls + ' ' + edat.class + '">' + value +  '</a>';
				}
			}
		}
		if (options.view == "all" && !status) {
			elist = options.innerHtml;
		}
		if (options.disabled == '< today' && pastday == "pastday" && !status) {
			elist = options.innerHtml;
		}
		if (options.disabled == '> today' && pastday == "other" && !status) {
			elist = options.innerHtml;
		}

		str += "<li data-date='" + thisday + "' class='" + pastday + "'><div" + myclass + ">" + i + "</div><div><ol class='event-list'>" + elist + "</ol></div></li>";
	}
	holder.html(str);
	ctitle.html(month_name_zhtw[my_month]);
	cyear.html(my_year);
}


$(".jcalendar").on("click", ".openCalendar-event", function(e) {
	e.preventDefault();
	var link = $(this).attr('href');
	var ww = $(window).width();
	$.colorbox({ href: link, iframe: true, width: (ww <=580) ? "90%" : "50%", right: "2.5%", height:"95%"});
});

function dayStart(month, year) {
	var tmpDate = new Date(year, month, 1);
	return tmpDate.getDay();
}

function daysMonth(month, year) {
	var tmp = (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0);
	if (tmp) {
		return month_olympic[month];
	} else {
		return month_normal[month];
	}
}

String.prototype.ToSimpleDate = function () {
    var month = this.split('-')[1];
    var day = this.split('-')[2];
    if (month[0] == '0') {
        month = month.replace('0', '');
    }
    if (day[0] == '0') {
        day = day.replace('0', '');
    }
    var resoult = this.split('-')[0] + '-' + month + '-' + day;
    return resoult;
}
String.prototype.ToFullDate = function () {
    var month = this.split('-')[1];
    var day = this.split('-')[2];

    if (month.length == 1) {
        month = '0' + month;
    }
    if (day.length == 1) {
        day = '0' + day;
    }
    var resoult = this.split('-')[0] + '-' + month + '-' + day;

    return resoult;
}
