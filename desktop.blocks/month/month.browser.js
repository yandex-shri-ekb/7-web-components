modules.define(
    'i-bem__dom',
    [
        'BEMHTML',
        'jquery',
        'utils__dates'
    ],
    function (
        provide,
        BEMHTML,
        $,
        datesUtils,
        DOM
    ) {
        var currentMonth = {
            nextDay : function () {
                return this.currentDate = datesUtils.getNextDay(this.currentDate);
            }
        };

        function getDayJSON (content, isEmpty, isToday, date) {
            return {
                elem : 'day',
                mods : {
                    empty : isEmpty ? 'yes' : 'no',
                    today : isToday && 'yes'
                },
                content : !isEmpty && content,
                js : { date : !isEmpty && date }
            };
        }

        function getWeekJSON (content) {
            return {
                elem : 'week',
                content : content
            };
        }

        function getMonthJSON (content) {
            return {
                block : 'month',
                content : content
            };
        }

        function buildWeek (startDay, startAt, today) {
            var days = [];
            for (var i = 0; i < 7; i++) {
                var isEmpty = i < startAt || (startDay + i > currentMonth.length),
                    day = startDay - startAt + i;

                days.push(getDayJSON(
                    day,
                    isEmpty,
                    day === today,
                    currentMonth.nextDay()
                ));
            }
            return getWeekJSON(days);
        }

        function buildMonth (date) {
            var weekShift = datesUtils.getWeekShift(date),
                today = datesUtils.isEqual(new Date(), date) && date.getDate(),
                weeks = [];

            currentMonth.length = datesUtils.getMonthLength(date);
            currentMonth.currentDate = new Date(date.getFullYear(), date.getMonth(), -weekShift);

            for (var i = 1; i < currentMonth.length; i += 7) {
                var startAt = i === 1 ? weekShift : 0;

                weeks.push(buildWeek(i, startAt, today));
                i -= startAt;
            }

            return getMonthJSON(weeks);
        }

        DOM.decl('month', {
            onSetMod : {
                js : function () {
                    this.update();
                }
            },

            update : function (date) {
                date = date ? new Date(date) : new Date();
                DOM.update(this.domElem, BEMHTML.apply(buildMonth(date)));
                this.emit('update');
            }
        });

        provide(DOM);
    }
);
