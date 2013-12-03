modules.define('utils__dates', function (provide) {
    var MONTH_NAMES = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    provide({
        getMonthLength : function (date) {
            return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        },

        getWeekShift : function (date) {
            var start = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
            return start === 0 ? 6 : start - 1;
        },

        getMonthName : function (index) {
            return MONTH_NAMES[index];
        },

        getNextMonthDate : function (date) {
            date = new Date(date);
            return date.setMonth(date.getMonth() + 1);
        },

        getPrevMonthDate : function (date) {
            date = new Date(date);
            return date.setMonth(date.getMonth() - 1);
        },

        getNextDay : function (date) {
            date = new Date(date);
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        },

        getTimeToTomorrow : function () {
            var today = new Date();
            return this.getNextDay(today) - today;
        },

        isEqual : function (firstDate, secondDate) {
            return firstDate.getDate() === secondDate.getDate()
                && firstDate.getMonth() === secondDate.getMonth()
                && firstDate.getFullYear() === secondDate.getFullYear();
        }
    });
});
