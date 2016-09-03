(function(root, cfg) {
    'use strict';

    root.blocks.paragraph = function(line_buf) {
        var self = {};
        self.line_buf = line_buf;
        self.cfg = cfg;

        this.get_block_width = function(cursor) {
            var remember_origin_cfg = cursor.get_cfg();
            cursor.set_cfg(self.cfg);
            var result = self.line_buf.get_width(cursor) + cursor.get_size();
            cursor.set_cfg(remember_origin_cfg);
            return result;
        };

        this.get_block_height = function(cursor) {
            var remember_origin_cfg = cursor.get_cfg();
            cursor.set_cfg(self.cfg);
            var result = self.line_buf.get_height(cursor);
            cursor.set_cfg(remember_origin_cfg);
            return result;
        };

        this.block_render = function(cursor) {
            var remember_origin_cfg = cursor.get_cfg();
            cursor.set_cfg(self.cfg);
            self.line_buf.render(cursor);
            cursor.set_x(self.cursor.get_x() + cursor.get_size());
            cursor.set_cfg(remember_origin_cfg);
        };
    };

    root.blocks.paragraph.prototype = root.blocks.abstract_block;

    root.blocks.paragraph.build = function(alpha) {
        const block_length = 10;
        const param_length = root.blocks.get_param_length(alpha.substring(block_length));
        return [alpha.substring(block_length + param_length + 2), (new root.line_buf()).append(alpha.substr(block_length + 1, param_length))];
    };

})(this.latex, this.latex.cursor_default_cfg.paragraph_title);
