(function(root){
    'use strict';

    function latex_document(area_dom, page_info){
        var self = {};
        self.pages = [];
        self.area = area_dom;
        self.line_bufs = [];
        if(page_info == undefined){
            page_info = {
                width : 595,
                height : 842,
                left : 30,
                right : 565,
                top : 30,
                bottom : 812,
                line_spacing : 15
            };
        };
        self.page_info = page_info;

        this.append_page = function(){
            var canvas_element = document.createElement('canvas');
            self.area.appendChild(canvas_element);
            var new_page = new root.page(canvas_element, self.page_info.width, self.page_info.height);
            self.pages.push(new_page);
            return new_page;
        };

        this.get_page_by_number = function(i){
            return self.pages[i];
        };

        this.append_line = function(line_buf){
            self.line_bufs.push(line_buf);
        };

        this.render = function(page_number, line_number_start){
            var current_page = this.get_page_by_number(page_number);
            current_page.get_cursor().set_x(self.page_info.left).set_y(self.page_info.top);
            var line_count = self.line_bufs.length;
            for(var line_itr = line_number_start; line_itr < line_count; line_itr++){
                if(current_page.get_cursor().get_y() < self.page_info.bottom){

                    current_page.get_cursor().set_y(current_page.get_cursor().get_y() + self.line_bufs[line_itr].get_height(current_page.get_cursor()) + self.page_info.line_spacing);

                    current_page.get_cursor().set_x(self.page_info.left);
                    
                    self.line_bufs[line_itr].render(current_page.get_cursor());
                }
                else { return line_itr; };
            };
        };
    };

    root.document = latex_document;
})(this.latex);
