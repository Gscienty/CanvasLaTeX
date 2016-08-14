(function(root){
    'use strict';
    function latex_page(dom, width, height){
        var page_dom = dom;
        var page_size = {
            width : width,
            height : height
        };

        var page_cursor = new root.cursor(page_dom, 0, width, height, 0);

        page_dom.setAttribute('width', page_size.width);
        page_dom.setAttribute('height', page_size.height);

        this.get_cursor_instance = function(){
            return page_cursor;
        };
    };

    root.page = latex_page;
})(this.latex);
