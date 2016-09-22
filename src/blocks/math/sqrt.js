(function(root){
    'use strict';
    root.blocks.sqrt = function(n, inner_line_buf){
        var self = {};
        self.n = n;
        self.line_buf = inner_line_buf;
        self.inner_vertical_spacing = 0.1;
        self.small_ratio = 0.5;

        this.get_block_name = function(){ return 'sqrt'; };

        this.get_block_width = function(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var small_length = cursor.get_measure(self.n).width;
            cursor.set_size(member);

            return small_length + member * 0.5 + self.line_buf.get_width(cursor);
        };

        this.get_block_height = function(cursor){
            
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var small_height = cursor.get_measure(self.n).height;
            cursor.set_size(member);
            return small_height + cursor.get_size() * self.inner_vertical_spacing + self.line_buf.get_height(cursor) * 1.3;
        };

        this.block_render = function(cursor){
            var origin_x = cursor.get_x();
            var origin_y = cursor.get_y();
            var inner_length = self.line_buf.get_width(cursor);
            var block_height = self.line_buf.get_height(cursor) ;
            var one_word_size = cursor.get_size() * 0.5;

            var member = cursor.get_size();
            var top_n_length = cursor.get_measure(self.n).width;
            cursor.set_size(member * self.small_ratio);
            var offset_length = top_n_length;
            cursor.set_size(member);

            origin_x = origin_x + offset_length;
            cursor.draw_line(origin_x, origin_y - block_height * 0.15, origin_x + one_word_size * 0.5, origin_y - block_height * 0.5);
            cursor.draw_line(origin_x + one_word_size * 0.5, origin_y - block_height * 0.5, origin_x + one_word_size * 0.75, origin_y);
            cursor.draw_line(origin_x + one_word_size * 0.75, origin_y, origin_x + one_word_size, origin_y - block_height * 2);
            cursor.draw_line(origin_x + one_word_size, origin_y - block_height * 2, origin_x + one_word_size + inner_length, origin_y - block_height * 2);

            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            cursor.set_x(origin_x - offset_length + one_word_size * 0.9);
            cursor.set_y(origin_y - block_height * 1.5);
            cursor.write_word(self.n);
            cursor.set_size(member);

            cursor.set_y(origin_y - block_height * 0.75);
            cursor.set_x(origin_x + one_word_size);
            self.line_buf.render(cursor);
        };
    };

    root.blocks.sqrt.prototype = root.blocks.abstract_block;

    root.blocks.sqrt.test = function(alpha) { return /^\\sqrt/.test(alpha); };

    root.blocks.sqrt.build = function(alpha) {
        const block_length = 5;
        var top_n = ' ';
        var px = 0;
        if(alpha[block_length] === '['){
            px = 2;
            top_n = '';
            for(var i = block_length + 1; i < alpha.length; i++){
                if(alpha[i] === ']') { break; };
                top_n = top_n + alpha[i];
                px++;
            };
            if(top_n === '') { top_n = ' '; };
        };
        const param_length = root.blocks.get_param_length(alpha.substring(block_length)); 
        return [alpha.substring(block_length + px + param_length + 2), new root.blocks.sqrt(top_n, (new root.line_buf()).append(alpha.substr(block_length + px + 1, param_length)))];
    };

})(this.latex);