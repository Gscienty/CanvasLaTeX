(function(root, cfg){
    'use strict';

    root.paragraph = function(line_buf, cursor){
        var self = {};
        self.line_buf = line_buf;
        self.cursor = cursor;
        self.cfg = cfg;
        self.width = -1;
        self.height = -1;

        this.get_block_width = function(){
            if(self.with == -1){
                var remember_origin_cfg = self.cursor.get_cfg();
                self.cursor.set_cfg(self.cfg);
                self.width = self.line_buf.get_width();
                self.cursor.set_cfg(remember_origin_cfg);
            };
            return self.width;
        };

        this.get_block_height = function(){
            if(self.height == -1){
                var remember_origin_cfg = self.cursor.get_cfg();
                self.cursor.set_cfg(self.cfg);
                self.height = self.line_buf.get_height();
                self.cursor.set_cfg(remember_origin_cfg);
            };
            return self.height;
        };

        this.block_render = function(){
            var remember_origin_cfg = self.cursor.get_cfg();
            self.cursor.set_cfg(self.cfg);
            self.line_buf.render();
            self.cursor.set_cfg(remember_origin_cfg);
        };

    };

    root.paragraph.prototype = root.abstract_block;

})(this.latex.blocks, this.latex.cursor_default_cfg.paragraph_title);
