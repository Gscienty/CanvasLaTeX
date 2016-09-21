(function(root){
    'use strict';
    root.blocks.sqrt = function(n, inner_line_buf){
        var self = {};
        self.n = n;
        self.line_buf = inner_line_buf;
        self.inner_vertical_spacing = 0.1;

        this.get_block_width = function(cursor){
            return cursor.get_size() + self.line_buf.get_width(cursor);
        };

        this.get_block_height = function(cursor){
            return cursor.get_size() * self.inner_vertical_spacing + self.line_buf.get_height(cursor);
        };

        this.block_render = function(cursor){
            var origin_x = cursor.get_x();
            var origin_y = cursor.get_y();
            var inner_length = self.line_buf.get_width(cursor);
            var block_height = this.get_block_height(cursor);
            var one_word_size = cursor.get_size(cursor);

            cursor.draw_line(origin_x, origin_y - block_height * 0.6, origin_x + one_word_size * 0.1, origin_y - block_height * 0.5);
            cursor.draw_line(origin_x + one_word_size * 0.1, origin_y - block_height * 0.5, origin_x + one_word_size * 0.5, origin_y);
            cursor.draw_line(origin_x + one_word_size * 0.5, origin_y, origin_x + one_word_size, origin_y - block_height);
        };
    };

})(this.latex);