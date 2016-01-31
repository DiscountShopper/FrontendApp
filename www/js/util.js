var theme = localStorage.getItem('theme') || 'GROC';
var themes = {
    GROC: 'assertive',
    ELEC: 'calm',
    DRUG: 'royal',
    HOME: 'balanced'
};

var changeColor = true;

var util = {
    logo: {
        MTR: 'metro.png',
        MAXI: 'maxi.png',
        SUPRC: 'superc.png',
        IGA: 'iga.png',
        LOB: 'loblaws.png',
        PROV: 'provigo.png'
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
    },
    getTheme : function(prefix){
        return prefix + themes[theme];
    }
}