(function(root){
    'use strict';

    function latex_document(area_dom, page_info){
        var self = {};
        self.pages = [];
        self.area = area_dom;
        self.text = '';
        if(page_info == undefined){
            page_info = {
                width : 595,
                height : 842,
                left : 30,
                right : 565,
                top : 30,
                bottom : 812,
                line_spacing : 0
            };
        };
        self.page_info = page_info;

        function create_page(){
            var canvas_element = document.createElement('canvas');
            self.area.appendChild(canvas_element);
            var new_page = new root.page(canvas_element, self.page_info.width, self.page_info.height);
            self.pages.push(new_page);
            return new_page;
        };

        this.document = function(text){
            self.text = text;
            return this;
        };

        this.render = function(){
            var text_blocks = (new root.line_buf()).append(self.text);
            var page = create_page();
            page.get_cursor().set_x(page_info.left).set_y(page_info.top);
            var row_width_limit = page_info.right - page_info.left;
            do {
                var row_blocks = new root.line_buf();
                while(text_blocks.get_blocks_length() > 0 && row_blocks.get_width(page.get_cursor()) + text_blocks.get_first_block().get_width(page.get_cursor()) < row_width_limit){
                    row_blocks.blocks_append(text_blocks.shift_blocks());
                };
                if(page.get_cursor().get_y() + row_blocks.get_height(page.get_cursor()) + page_info.line_spacing * page.get_cursor().get_size() > page_info.bottom){
                    page = create_page();
                    page.get_cursor().set_x(page_info.left).set_y(page_info.top);
                };
                page.get_cursor().set_y(page.get_cursor().get_y() + row_blocks.get_height(page.get_cursor()) + page_info.line_spacing * page.get_cursor().get_size());
                page.get_cursor().set_x(page_info.left);
                row_blocks.render(page.get_cursor());
            }while(text_blocks.get_blocks_length() > 0);
        };
    };

    root.document = latex_document;
})(this.latex);
