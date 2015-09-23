$.get('/wxlogin/hasLogin.do',function(data){
    if(data.error_no == '0' && data.data == false) {
        location.href = '/api/login.do?wcbzlr='+encodeURIComponent(location.href);
    }
});
