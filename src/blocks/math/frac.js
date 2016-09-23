(function(root){
    'use strict';
    root.blocks.frac = function(line_buf_t, line_buf_b){
        var self = {};
        self.line_bufs = [line_buf_t, line_buf_b];
        self.small_ratio = 0.8;
        self.left_right_spacing = 0.1;
        self.vertical_spacing = 0.1;

        this.get_block_name = function(){ return 'frac'; };
        
        function t_and_b_width(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var result = (function(a, b){if(a > b){ return a;} else { return b; }; })(self.line_bufs[0].get_width(cursor), self.line_bufs[1].get_width(cursor));
            cursor.set_size(member);

            return result + cursor.get_size() * self.left_right_spacing * 2;
        }

        this.get_block_width = function(cursor){
            return t_and_b_width(cursor) + cursor.get_size() * self.left_right_spacing * 2;
        };

        this.get_block_height = function(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);

            var result = (function(a, b){ if(a > b){ return a;} else { return b; }; })(self.line_bufs[0].get_height(cursor), self.line_bufs[1].get_height(cursor)) * 2 + member * self.vertical_spacing * 2;
            cursor.set_size(member);

            return result;
        };

        this.block_render = function(cursor){
            const member = cursor.get_size();
            const x = cursor.get_x() + member * self.left_right_spacing;
            const y = cursor.get_y() - this.get_block_height(cursor) * 0.5;
            const width = t_and_b_width(cursor);

            cursor.draw_line(x, y, x + width, y);


            cursor.set_size(member * self.small_ratio);
            cursor.set_x(x + (width - self.line_bufs[0].get_width(cursor)) * 0.5);
            cursor.set_y(y - self.line_bufs[0].get_height(cursor) * 0.5 - member * self.vertical_spacing);
            self.line_bufs[0].render(cursor);

            cursor.set_x(x + (width - self.line_bufs[1].get_width(cursor)) * 0.5);
            cursor.set_y(y + self.line_bufs[1].get_height(cursor) * 0.35 + member * self.vertical_spacing);
            self.line_bufs[1].render(cursor);
            cursor.set_size(member);

            cursor.set_x(x + width + member * self.left_right_spacing);
        };
    };

    root.blocks.frac.prototype = root.blocks.abstract_block;

    root.blocks.frac.build = function(alpha){
        const block_length = 5;
        const param1_length = root.blocks.get_param_length(alpha.substring(block_length));
        const param2_length = root.blocks.get_param_length(alpha.substring(block_length + param1_length + 2));
        return [alpha.substring(block_length + param1_length + param2_length + 4), new root.blocks.frac((new root.line_buf()).append(alpha.substr(block_length + 1, param1_length)), (new root.line_buf()).append(alpha.substr(block_length + param1_length + 3, param2_length)))];
    };

    root.blocks.frac.test = function(alpha) { return /^\\frac/.test(alpha); };

})(this.latex);
