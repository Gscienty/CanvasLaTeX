(function(root){
    'use strict';
    root.blocks.frac = function(line_buf_t, line_buf_b){
        var self = {};
        self.line_bufs = [line_buf_t, line_buf_b];
        self.small_ratio = 0.9;
        self.left_right_spacing = 0.1;
        self.vertical_spacing = 0.1;

        this.get_block_name = function(){ return 'frac'; };
        
        function t_and_p_width(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var result = (function(a, b){if(a > b){ return a;} else { return b; }; })(self.line_bufs[0].get_width(cursor), self.line_bufs[1].get_width(cursor));
            cursor.set_size(member);

            return result + cursor.get_size() * self.left_right_spacing * 2;
        }

        this.get_block_width = function(cursor){
            return t_and_p_width(cursor) + cursor.get_size() * self.left_right_spacing * 2;
        };

        function t_and_p_height(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var heights = [self.line_bufs[0].get_height(cursor), self.line_bufs[1].get_height(cursor)];
            cursor.set_size(member);
            return (function(a, b) { if(a > b) { return a; } else { return b; };})(heights[0], heights[1]) + member * self.vertical_spacing * 2;
        }

        this.get_block_height = function(cursor){
            return t_and_p_height(cursor) + cursor.get_size() * self.vertical_spacing * 4;
        };

        this.block_render = function(cursor){
            const member = cursor.get_size();
            const ox = cursor.get_x() + member * self.left_right_spacing;
            const oy = cursor.get_y() - member * self.vertical_spacing * 2; 
            const block_width = t_and_p_width(cursor);

            cursor.set_size(member * self.small_ratio);
            const bottom_height = self.line_bufs[1].get_height(cursor);

            cursor.draw_line(ox, oy - bottom_height / 0.85, ox + block_width, oy - bottom_height / 0.85);

            cursor.set_x(ox + (block_width - self.line_bufs[0].get_width(cursor)) * 0.5);
            cursor.set_y(oy - bottom_height / 0.7 - member * self.vertical_spacing - self.line_bufs[0].get_height(cursor) * 0.4);
            self.line_bufs[0].render(cursor);

            cursor.set_x(ox + (block_width - self.line_bufs[1].get_width(cursor)) * 0.5);
            cursor.set_y(oy - bottom_height / 0.7 + member * self.vertical_spacing + self.line_bufs[1].get_height(cursor) * 0.95);
            self.line_bufs[1].render(cursor);

            cursor.set_size(member);
            cursor.set_x(ox + this.get_block_width(cursor) - member * self.left_right_spacing);
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
