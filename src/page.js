(function(root){
    'use strict';
    function latex_page(dom, width, height, padding){
        var page_dom = dom;
        var page_size = {
            width : width,
            height : height
        };

        var page_padding = padding;

        var page_cursor = new root.cursor(page_dom, 0, width, height, 0);

        page_dom.setAttribute('width', page_size.width);
        page_dom.setAttribute('height', page_size.height);

        this.get_cursor = function(){
            return page_cursor;
        };

        this.get_width = function() { return page_size.width; };
        this.get_height = function() { return page_size.height; };

        this.set_width = function(width) {
            var cache_data = page_cursor.get_rendered(0, 0, page_size.width, page_size.height);
            page_dom.setAttribute('width', width);
            page_size.width = width; 
            page_cursor.put_image(0, 0, cache_data);
        };
        this.set_height = function(height) { 
            var cache_data = page_cursor.get_rendered(0, 0, page_size.width, page_size.height);
            page_dom.setAttribute('height', height);
            page_size.height = height; 
            page_cursor.put_image(0, 0, cache_data);
        };
    };

    root.page = latex_page;
})(this.latex);
