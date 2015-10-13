window.alertShow = function(text,okfun) {
    window.alert = {
        text : text, 
        sure : "确定",
        cancel : "取消",
        show : true,
        ok : function() {
            window.alert.show = false;
            okfun();
        },
        not : function() {
            window.alert.show = false;
        }
    };
};
