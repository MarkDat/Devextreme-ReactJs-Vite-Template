// eslint-disable-next-line no-extend-native
Object.defineProperty(Number.prototype, "toMoneyString", {
    value: function toMoneyString() {
        return String(this).replace(/(.)(?=(\d{3})+$)/g, '$1.');
    },
    writable: true,
    configurable: true
});
