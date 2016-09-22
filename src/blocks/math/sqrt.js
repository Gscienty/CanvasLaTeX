(function(root){
    'use strict';
    root.blocks.sqrt = function(n, inner_line_buf){
        var self = {};
        self.n = n;
        self.line_buf = inner_line_buf;
        self.inner_vertical_spacing = 0.1;

        this.get_block_name = function(){ return 'sqrt'; };

        this.get_block_width = function(cursor){
            return cursor.get_size() * 0.5 + self.line_buf.get_width(cursor);
        };

        this.get_block_height = function(cursor){
            return cursor.get_size() * self.inner_vertical_spacing + self.line_buf.get_height(cursor) * 1.3;
        };

        this.block_render = function(cursor){
            var origin_x = cursor.get_x();
            var origin_y = cursor.get_y();
            var inner_length = self.line_buf.get_width(cursor);
            var block_height = self.line_buf.get_height(cursor) ;
            var one_word_size = cursor.get_size(cursor) * 0.5;
            cursor.set_y(cursor.get_y() - block_height / 2);

            cursor.draw_line(origin_x, origin_y - block_height * 0.15, origin_x + one_word_size * 0.5, origin_y - block_height * 0.5);
            cursor.draw_line(origin_x + one_word_size * 0.5, origin_y - block_height * 0.5, origin_x + one_word_size * 0.75, origin_y);
            cursor.draw_line(origin_x + one_word_size * 0.75, origin_y, origin_x + one_word_size, origin_y - block_height * 2);
            cursor.draw_line(origin_x + one_word_size, origin_y - block_height * 2, origin_x + one_word_size + inner_length, origin_y - block_height * 2);


            cursor.set_y(cursor.get_y() - block_height * 0.25);
            cursor.set_x(cursor.get_x() + one_word_size);
            self.line_buf.render(cursor);
        };
    };

    root.blocks.sqrt.prototype = root.blocks.abstract_block;

    root.blocks.sqrt.test = function(alpha) { return /^\\sqrt/.test(alpha); };

    root.blocks.sqrt.build = function(alpha) {
        const block_length = 5;

        const param_length = root.blocks.get_param_length(alpha.substring(block_length)); 
        return [alpha.substring(block_length + param_length + 2), new root.blocks.sqrt(' ', (new root.line_buf()).append(alpha.substr(block_length + 1, param_length)))];
    };

})(this.latex);