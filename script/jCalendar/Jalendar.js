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
var month_name_zhtw = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
var month_name_number = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

var jc = $(".jcalendar");
var holder = $(".jcalendar ul.days");
var prev = $(".jcalendar .prev");
var next = $(".jcalendar .next");
var title = $(".jcalendar .title");
var cmonth = $(".jcalendar .calendar-month");
var cyear = $(".jcalendar .calendar-year");
var eventlist;
var defaultOptions;
var chktp = ['m', 'n', 'e'];
var today = moment(),
    formatToday = today.format('YYYY-MM-D'),
    tempToday = today;

var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();



$(".jcalendar .calendar-show-day").text(formatToday);
// viewType = 'week'
var startWeekDate = moment(formatToday).week(moment(formatToday).week()).startOf('week').format('YYYY-MM-D');
var endWeekDate = moment(formatToday).week(moment(formatToday).week()).endOf('week').format('YYYY-MM-D');

tempToday = startWeekDate;

var splitStartWeekDate = startWeekDate.split("-");
var splitEndWeekDate = endWeekDate.split("-");

$(".jcalendar .calendar-show-range").text(splitStartWeekDate.join("/") + " - " + splitEndWeekDate.join("/"));

jc.find(".calendar-show-day, .calendar-show-ym").fadeOut(30, function () {
    jc.find(".calendar-show-range").fadeIn();
});
//
var viewType = 'week';

prev.on("click", function (e) {
    e.preventDefault();
    if (viewType == 'week') {
        startWeekDate = moment(tempToday).week(moment(tempToday).week() - 1).startOf('week').format('YYYY-MM-D');
        endWeekDate = moment(tempToday).week(moment(tempToday).week() - 1).endOf('week').format('YYYY-MM-D');

        tempToday = startWeekDate;
        var splitStartWeekDate = startWeekDate.split("-");
        var splitEndWeekDate = endWeekDate.split("-");

        $(".jcalendar .calendar-show-range").text(splitStartWeekDate.join("/") + " - " + splitEndWeekDate.join("/"));


        refreshDate(defaultOptions);
    }

});
next.on("click", function (e) {
    e.preventDefault();
    if (viewType == 'week') {
        startWeekDate = moment(tempToday).week(moment(tempToday).week() + 1).startOf('week').format('YYYY-MM-D');
        endWeekDate = moment(tempToday).week(moment(tempToday).week() + 1).endOf('week').format('YYYY-MM-D');

        tempToday = startWeekDate;
        var splitStartWeekDate = startWeekDate.split("-");
        var splitEndWeekDate = endWeekDate.split("-");

        $(".jcalendar .calendar-show-range").text(splitStartWeekDate.join("/") + " - " + splitEndWeekDate.join("/"));


        refreshDate(defaultOptions);
    }
});

function chktphasdata(tp, d) {
    var o;

    if (tp == d.tp) {
        o = "yes" + tp;
    } else {
        o = "empty " + tp;
    }
    return o;
}

function refreshDate(options) {
    var str = "";
    var totalDay = daysMonth(my_month, my_year);
    var firstDay = dayStart(my_month, my_year);
    var myclass;
    var halfHour = ["00", "30"]

    defaultOptions = options;
    eventlist = options.eventlist;

    if (viewType == 'week') {

        str += '<li class="tips"><div class="visibility-day">day</div><div><ol class="event-list">';

        // for (var i = 0; i < 24; i++) {
        //     if (i < 10) {
        //         str += '<div class="info-item"><span class="dt">0' + i + ':00' + '</span></div>'
        //     } else {
        //         str += '<div class="info-item"><span class="dt">' + i + ':00' + '</span></div>'
        //     }
        // }

        // halfHour
        for (var i = 0; i < 24; i++) {
            for (var j = 0; j < 2; j++) {
                if (i < 10) {
                    str += '<div class="info-item"><span class="dt">0' + i + ':' + halfHour[j] +'</span></div>'
                } else {
                    str += '<div class="info-item"><span class="dt">' + i + ':' + halfHour[j]  + '</span></div>'
                }
            }
        }

        str += '</ol></div></li>';


        var weekArray = enumerateDaysBetweenDates(startWeekDate, endWeekDate);

        console.log(weekArray, startWeekDate, endWeekDate)
        for (var i in weekArray) {
            var weekDat = weekArray[i],
                tplist = [],
                elist = "",
                hasdata = "",
                d = moment(weekDat).day(),
                split = weekDat.split("-");

            console.log('d', d)
            console.log('split', split)

            for (var i = 0; i < 24; i++) {
                elist +=  '<div class="detail-item" data="' + i + '">'

                for (var tmp = 0; tmp < eventlist.length; tmp++) {
                    var dat = eventlist[tmp];
                    if (dat.date == weekDat.ToSimpleDate()) {

                        for (var tmplist = 0; tmplist < dat.list.length; tmplist++) {
                            var edat = dat.list[tmplist],
                                detailinfo = edat.detailinfo,
                                detailhtml = "",
                                href = "javascript:;", cls, value,
                                hasdata = "hasdata",
                                formatAry = edat.slot,
                                status = edat.status;

                            switch (edat.status) {
                                case "直": status = "live"; break;
                                case "新": status = "new"; break;
                                case "重": status = "repeat"; break;
                            }

                            // hover 後出現的內容
                            if (detailinfo) {

                                detailhtml = '<div class="hover-detail-item">\
                                    <div class="title-info">\
                                        <i class="cc cc-sort-up cc-rotate-270"></i>預約資訊<i class="cc cc-sort-up cc-rotate-90"></i>\
                                    </div>\
                                    <ol>\
                                        <li>\
                                            <span>課程名稱</span>\
                                            <span>'+ detailinfo.classname + '</span>\
                                        </li>\
                                        <li>\
                                            <span>預約時間</span>\
                                            <span>\
                                                <p>'+ detailinfo.appointment[0] + '</p>\
                                                <p>'+ detailinfo.appointment[1] + '</p>\
                                            </span>\
                                        </li>\
                                        <li>\
                                            <span>預約空間</span>\
                                            <span>'+ detailinfo.reservation_space + '</span>\
                                        </li>\
                                        <li>\
                                            <span>主辦單位</span>\
                                            <span>'+ detailinfo.organizer + '</span>\
                                        </li>\
                                        <li>\
                                            <span>活動/課程簡述</span>\
                                            <span>'+ detailinfo.description + '</span>\
                                        </li>\
                                    </ol>\
                                </div>';
                            }

                            if (i == formatAry) {
                                elist += '<div class="detail-item-child">\
                                        <span class='+ status + '> ' + edat.status + '</span>\
                                        <span class="img"><img src='+ edat.src + '></span>\
                                        <span class="program">' + edat.program + '</span>' + detailhtml + '</div>'
                            }
                            
                        }

                    }
                }
                elist += '</div>'
            }


            str += "<li data-date='" + weekDat.ToSimpleDate() + "' class='" + hasdata + " week-" + d + "'><div>" + split[2] + "</div><div><ol class='event-list'>" + elist + "</ol></div></li>";
        }

    }


    holder.html(str);
    cmonth.html(month_name_zhtw[my_month]);
    cyear.html(my_year);
}

function enumerateDaysBetweenDates(startDate, endDate) {
    var dates = [];

    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');
    dates.push(currDate.format('YYYY-MM-D'));
    while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().format('YYYY-MM-D'));
    }
    dates.push(lastDate.format('YYYY-MM-D'));


    return dates;
};

function handelDayinfo(day) {
    day = day.ToSimpleDate();
    var dayinfo = $(".day-info-box.day-" + day).length;
    $(".day-info-box").hide();
    $(".day-info-box-empty").hide();
    if (dayinfo) {
        $(".day-info-box.day-" + day).show();
    } else {
        $(".day-info-box-empty").show();
    }
}

$(".jcalendar").on("click", ".view-buttons a", function (e) {
    e.preventDefault();
    var me = $(this);

    viewType = me.attr("href");

    me.addClass("active").siblings().removeClass("active");

    if (viewType == 'week') {
        //預設為今日的當週
        startWeekDate = moment(formatToday).week(moment(formatToday).week()).startOf('week').format('YYYY-MM-D');
        endWeekDate = moment(formatToday).week(moment(formatToday).week()).endOf('week').format('YYYY-MM-D');

        tempToday = startWeekDate;

        var splitStartWeekDate = startWeekDate.split("-");
        var splitEndWeekDate = endWeekDate.split("-");

        $(".jcalendar .calendar-show-range").text(splitStartWeekDate.join("/") + " - " + splitEndWeekDate.join("/"));

        jc.find(".calendar-show-day, .calendar-show-ym").fadeOut(30, function () {
            jc.find(".calendar-show-range").fadeIn();
        });
    }

    if (viewType != 'day') {
        refreshDate(defaultOptions);

        $(".jcalendar .body").show();
        $(".day-info-box-empty").hide();
        $(".day-info-box").hide().removeClass("viewday");
    } else {
        //預設為今日
        tempToday = moment(today).format("YYYY-MM-D");

        $(".jcalendar .calendar-show-day").text(tempToday);

        jc.find(".calendar-show-ym, .calendar-show-range").fadeOut(30, function () {
            jc.find(".calendar-show-day").fadeIn();
        });

        $(".day-info-box").addClass("viewday");

        $(".jcalendar .body").hide();
        handelDayinfo(tempToday);
    }

});

$(".jcalendar").on("click", ".openCalendar-event", function (e) {
    e.preventDefault();
    var link = $(this).attr('href');
    $.colorbox({ href: link, iframe: true, width: "50%", right: "2.5%", height: "95%" });
});

$(".jcalendar").on("click", ".detail-item.empty-detail-item", function () {
    var me = $(this),
        getDate = me.parents("li").attr("data-date"),
        getTp = me.attr("data-tp");

    //console.log("click, ", getDate, getTp);

});

$(".jcalendar").on("click", ".hasdata", function (e) {
    e.preventDefault();

    var me = $(this);
    $(".jcalendar .hasdata").removeClass("active");
    me.addClass("active");

    $(".day-info-box").fadeOut(function () {
        $(".day-info-box.day-" + me.attr("data-date")).fadeIn();
    });
})

function dayStart(month, year) {
    var tmpDate = new Date(year, month, 1);
    return tmpDate.getDay();
}

function daysMonth(month, year) {
    var tmp = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
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
