var util = {
    logo: {
        MTR: 'metro.png',
        MAXI: 'maxi.png',
        SUPRC: 'superc.png',
        IGA: 'iga.png',
        LOB: 'loblaws.png'
    },
    getLogo: function(code){
        return 'img/logos/' + this.logo[code];
    },
    toUpper : function(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
}