angular.module('grocery.services', []);

var postalCode = localStorage.getItem('postalCode') || '';
var baseUrl = 'http://162.243.54.4:3000/api/';