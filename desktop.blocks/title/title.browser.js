modules.define(
    'i-bem__dom',
    [
        'BEMHTML',
        'utils__dates'
    ],
    function (
        provide,
        BEMHTML,
        datesUtils,
        DOM
    ) {
        function formatTitle (date) {
            date = new Date(date);

            var month = datesUtils.getMonthName(date.getMonth()),
                year = date.getFullYear(),
                day = date.getDate();

            return day + ' ' + month + ' ' + year;
        }

        function getTitleJSON (content) {
            return {
                content : formatTitle(content)
            };
        }

        DOM.decl('title', {
            onSetMod : {
                js : function () {
                    DOM.blocks['calendar'].on('date:change', function (b, data) {
                        this.update(data.date);
                    }, this);
                }
            },

            update : function (data) {
                DOM.update(this.domElem, BEMHTML.apply(getTitleJSON(data)));
            }
        });

        provide(DOM);
    }
);
