Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

var market = localStorage.getItem('market') || 'groceries';

var util = {
    logo: {
        MTR: 'metro.png',
        MAXI: 'maxi.png',
        SUPRC: 'superc.png',
        IGA: 'iga.png',
        LOB: 'loblaws.png',
        PROV: 'provigo.png',
        BRNT: 'brunet.png',
        JCP: 'jeancoutu.png',
        UNIP: 'uniprix.png',
        PXM: 'proxim.png',
        PHX: 'pharmaprix.png'
    },
    name: {
        MTR: 'Metro',
        MAXI: 'Maxi',
        SUPRC: 'Super C',
        IGA: 'IGA',
        LOB: 'Loblaws',
        PROV: 'Provigo',
        BRNT: 'Brunet',
        JCP: 'Jean Coutu',
        UNIP: 'Uniprix',
        PXM: 'Proxim',
        PHX: 'Pharmaprix'
    },
    bigBanner: {
        MTR: 'METRO',
        MAXI: 'MAXI',
        SUPRC: 'SUPERC',
        IGA: 'IGA',
        LOB: 'LOBLAWS',
        PROV: 'PROVIGO',
        BRNT: 'BRUNET',
        JCP: 'JEAN_COUTU',
        UNIP: 'UNIPRIX',
        PXM: 'PROXIM',
        PHX: 'PHARMAPRIX'
    },
    markets : {
        MTR: 'groceries',
        MAXI: 'groceries',
        SUPRC: 'groceries',
        IGA: 'groceries',
        LOB: 'groceries',
        PROV: 'groceries',
        BRNT: 'drugstores',
        JCP: 'drugstores',
        UNIP: 'drugstores',
        PXM: 'drugstores',
        PHX: 'drugstores'
    },
    getLogo: function(code){
        return 'img/logos/' + this.logo[code];
    },
    toUpper : function(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    getMarketFromBanner: function(banner_code){
        return this.markets[banner_code];
    },
    sumCart : function(){
        var p = localStorage.getObject('cartProducts') || [];
        var qty = 0;
        if (p) {
            p.forEach(function(product){
                qty += product.CartQuantity ? product.CartQuantity : 1;
            })
        }
        return qty;
    }
}