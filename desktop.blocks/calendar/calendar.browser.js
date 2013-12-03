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
        DOM.decl('calendar', {
            onSetMod : {
                js : function () {
                    this._month = this.findBlockInside('month');
                    this._navigation = this.findBlockInside('navigation');
                    this._month.on('update', this._onMonthUpdate, this);
                    this._onMonthUpdate();
                    setTimeout($.proxy(this, 'update'), datesUtils.getTimeToTomorrow());
                }
            },

            _onMonthUpdate : function () {
                var days = this._month.findElem('day', 'empty', 'no');
                this.bindTo(days, 'click', this._onDayClick);
                this._month.findElem('day', 'today', 'yes').trigger('click');
            },

            _onDayClick : function (ev) {
                this.$target && this._month.delMod(this.$target, 'active', 'yes');
                this.$target = $(ev.currentTarget);
                this._month.setMod(this.$target, 'active', 'yes');
                this.emit('date:change', this._month.elemParams(this.$target));
            },

            update : function () {
                var today = new Date();
                this._month.update(today);
                this._navigation.update(today);
            }
        });

        provide(DOM);
    }
);
