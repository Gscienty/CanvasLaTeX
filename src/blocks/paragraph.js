(function(root, cfg){
    'use strict';

    root.paragraph = function(line_buf){
        var self = {};
        self.line_buf = line_buf;
        self.cfg = cfg;

        this.get_block_width = function(cursor){
            var remember_origin_cfg = cursor.get_cfg();
            cursor.set_cfg(self.cfg);
            var result = self.line_buf.get_width(cursor) + cursor.get_size();
            cursor.set_cfg(remember_origin_cfg);
            return result;
        };

        this.get_block_height = function(cursor){
            var remember_origin_cfg = cursor.get_cfg();
            cursor.set_cfg(self.cfg);
            var result = self.line_buf.get_height(cursor);
            cursor.set_cfg(remember_origin_cfg);
            return result;
        };

        this.block_render = function(cursor){
            var remember_origin_cfg = cursor.get_cfg();
            cursor.set_cfg(self.cfg);
            self.line_buf.render(cursor);
            cursor.set_x(self.cursor.get_x() + cursor.get_size());
            cursor.set_cfg(remember_origin_cfg);
        };

    };

    root.paragraph.prototype = root.abstract_block;

})(this.latex.blocks, this.latex.cursor_default_cfg.paragraph_title);
