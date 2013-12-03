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
                year = date.getFullYear();

            return month + ' ' + year;
        }

        DOM.decl('navigation', {
            onSetMod : {
                js : function () {
                    this._model = {
                        date : new Date()
                    };
                    this._month = this.findBlockOutside('page').findBlockInside('month');
                    this.findBlockOn(this.elem('prev-month'), 'button').on('click', this._onPrevClick, this);
                    this.findBlockOn(this.elem('next-month'), 'button').on('click', this._onNextClick, this);
                    this.update();
                }
            },

            _onPrevClick : function () {
                this._move('Prev');
                this._month.update(this._model.date);
                this.update();
            },

            _onNextClick : function () {
                this._move('Next');
                this._month.update(this._model.date);
                this.update();
            },

            _move : function (direct) {
                this._model.date = datesUtils['get' + direct + 'MonthDate'](this._model.date);
            },

            update : function(date) {
                date && (this._model.date = date);
                DOM.update(this.elem('title'), formatTitle(this._model.date));
            }
        });

        provide(DOM);
    }
);
