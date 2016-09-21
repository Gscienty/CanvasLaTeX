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
                height : 1,
                line_spacing : 0.5
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
            this.render();
            return this;
        };

        this.render = function(){
            var text_blocks = (new root.line_buf()).append(self.text);
            var page = create_page();
            page.get_cursor().set_x(0).set_y(0);
            var row_width_limit = self.page_info.width;
            do {
                var row_blocks = new root.line_buf();
                var break_flag = false;
                while(text_blocks.get_blocks_length() > 0 && row_blocks.get_width(page.get_cursor()) + text_blocks.get_first_block().get_width(page.get_cursor()) < row_width_limit){
                    
                    if((function(a){ return a === 'center' || a.indexOf('section') != -1 || a === 'crlf'  })(text_blocks.get_first_block().get_class_name())) { 
                        if (row_blocks.get_blocks_length() === 0) {
                            row_blocks.blocks_append(text_blocks.shift_blocks());
                        }
                        break;
                    };
                    var block = text_blocks.shift_blocks();
                    row_blocks.blocks_append(block);
                };
                if(page.get_cursor().get_y() + row_blocks.get_height(page.get_cursor()) * 2 + self.page_info.line_spacing * page.get_cursor().get_size() > page.get_height()){
                    page.set_height(page.get_height() + 2 * row_blocks.get_height(page.get_cursor()) * 2 + self.page_info.line_spacing * page.get_cursor().get_size());
                };
                page.get_cursor().set_y(page.get_cursor().get_y() +  self.page_info.line_spacing * page.get_cursor().get_size() + row_blocks.get_height(page.get_cursor()));

                if(row_blocks.get_first_block().get_class_name() === 'center'){
                    page.get_cursor().set_x((row_width_limit - row_blocks.get_width(page.get_cursor()) ) / 2);
                }
                else{
                    page.get_cursor().set_x(0);
                }
                row_blocks.render(page.get_cursor());
            }while(text_blocks.get_blocks_length() > 0);
        };
    };

    root.document = latex_document;
})(this.latex);
