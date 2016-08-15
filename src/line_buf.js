(function(root){
    'use strict';

    root.line_buf = function(cursor) {
        var self = {};
        self.width = 0;
        self.height = 0;
        self.buff = [];
        self.cursor = cursor;

        function get_cursor() { return self.cursor; };

        this.get_width = function() {
            var width = 0;
            var len = self.buff.length;
            for(var i = 0; i < len; i++){
                width = width + self.buff[i].get_width();
            };
            return width;
        };

        this.get_height = function() {
            var height = 0;
            var len = self.buff.length;
            for(var i = 0; i < len; i++){
                var tmp_height = self.buff[i].get_height();
                if(height < tmp_height){
                    height = tmp_height;
                };
            };
            return height;
        };

        this.append = function(word){
            var alpha = word;
            while(alpha.length > 0){
                var next = 0;
                if(/^\\paragraph\{(.*)\}/.test(alpha)){
                    var block_segs = /^\\paragraph\{(.*)\}/.exec(alpha);

                    next = block_segs[0].length;
                    var block_line_buf = new root.line_buf(self.cursor);
                    block_line_buf.append(block_segs[1]);
                    self.buff.push(new root.blocks.paragraph(block_line_buf, self.cursor));
                }
                else{
                    self.buff.push(new root.blocks.simple(alpha[0], self.cursor));
                    next = 1;
                };

                alpha = alpha.substring(next);
            };
        };

        this.render = function(){
            var buf_len = self.buff.length;
            for(var i = 0; i < buf_len; i++){
                self.buff[i].render();
            };
        };
    };

})(this.latex);
