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
        PROV: 'Provigo'
    },
    getLogo: function(code){
        return 'img/logos/' + this.logo[code];
    },
    toUpper : function(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
}