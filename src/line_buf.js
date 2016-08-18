(function(root){
    'use strict';

    root.line_buf = function() {
        var self = {};
        self.width = 0;
        self.height = 0;
        self.buff = [];

        this.get_width = function(cursor) {
            var width = 0;
            var len = self.buff.length;
            for(var i = 0; i < len; i++){
                width = width + self.buff[i].get_width(cursor);
            };
            return width;
        };

        this.get_height = function(cursor) {
            var height = 0;
            var len = self.buff.length;
            for(var i = 0; i < len; i++){
                var tmp_height = self.buff[i].get_height(cursor);
                if(height < tmp_height){
                    height = tmp_height;
                };
            };
            return height;
        };

        function word_transfer_block(alpha){
            if(/^\\paragraph\{(.+?)\}/.test(alpha)){
                var block_segs = /^\\paragraph\{(.+?)\}/.exec(alpha);
                var block_line_buf = new root.line_buf();
                block_line_buf.append(block_segs[1]);
                return [alpha.substring(block_segs[0].length), new root.blocks.paragraph(block_line_buf)];
            }
            else if(/^\\section\{(.+?)\}/.test(alpha)){
                var block_segs = /^\\section\{(.+?)\}/.exec(alpha);
                var block_line_buf = new root.line_buf();
                block_line_buf.append(block_segs[1]);
                return [alpha.substring(block_segs[0].length), new root.blocks.section(block_line_buf)];
            }
            else if(/^\\subsection\{(.+?)\}/.test(alpha)){
                var block_segs = /^\\subsection\{(.+?)\}/.exec(alpha);
                var block_line_buf = new root.line_buf();
                block_line_buf.append(block_segs[1]);
                return [alpha.substring(block_segs[0].length), new root.blocks.subsection(block_line_buf)];
            }
            else if(/^\\subsubsection\{(.+?)\}/.test(alpha)){
                var block_segs = /^\\subsubsection\{(.+?)\}/.exec(alpha);
                var block_line_buf = new root.line_buf();
                block_line_buf.append(block_segs[1]);
                return [alpha.substring(block_segs[0].length), new root.blocks.subsubsection(block_line_buf)];
            }
            else if(/^\\frac\{(.*?)\}\{(.*?)\}/.test(alpha)){
                var block_segs = /^\\frac\{(.*?)\}\{(.*?)\}/.exec(alpha);
                var block_line_bufs = [new root.line_buf(), new root.line_buf()];
                block_line_bufs[0].append(block_segs[1]);
                block_line_bufs[1].append(block_segs[2]);
                return [alpha.substring(block_segs[0].length), new root.blocks.frac(block_line_bufs[0], block_line_bufs[1])];
            }
            else if(/^\\jump\{(\d+(\.\d+)?)\}/.test(alpha)){
                var block_segs = /^\\jump\{(\d+(\.\d+)?)\}/.exec(alpha);
                return [alpha.substring(block_segs[0].length), new root.blocks.jump(parseFloat(block_segs[1]))];
            }
            return [alpha.substring(1), new root.blocks.simple(alpha[0])];

        };

        this.append = function(word){
            var alpha = word;
            while(alpha.length > 0){
                var tuple = word_transfer_block(alpha);
                self.buff.push(tuple[1]);
                alpha = tuple[0];
            };
            return this;
        };

        this.insert = function(word, index){
            var alpha = word;
            var offset = index;
            while(alpha.length > 0){
                var tuple = word_transfer_block(alpha);
                self.buff.splice(offset, 0, tuple[1]);
                alpha = tuple[0];
                offset = offset + 1;
            };
            return this;
        };

        this.render = function(cursor){
            var buf_len = self.buff.length;
            for(var i = 0; i < buf_len; i++){
                self.buff[i].render(cursor);
            };
            return this;
        };
    };

})(this.latex);
