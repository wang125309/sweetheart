!function r(n,o,e){function t(f,u){if(!o[f]){if(!n[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(i)return i(f,!0);throw new Error("Cannot find module '"+f+"'")}var c=o[f]={exports:{}};n[f][0].call(c.exports,function(r){var o=n[f][1][r];return t(o?o:r)},c,c.exports,r,n,o,e)}return o[f].exports}for(var i="function"==typeof require&&require,f=0;f<e.length;f++)t(e[f]);return t}({1:[function(r,n,o){$.get("/wxlogin/hasLogin.do",function(r){"0"==r.error_no&&0==r.data&&(location.href="/api/login.do?wcbzlr="+encodeURIComponent(location.href))})},{}]},{},[1]);