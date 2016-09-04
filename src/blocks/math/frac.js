(function(root){
    'use strict';
    root.blocks.frac = function(line_buf_t, line_buf_b){
        var self = {};
        self.line_bufs = [line_buf_t, line_buf_b];
        self.small_ratio = 0.7;
        self.left_right_spacing = 0.5;
        self.vertical_spacing = 0.1;

        this.get_block_width = function(cursor){
            var member_size = cursor.get_size();
            cursor.set_size(self.small_ratio * member_size);
            var width = (function(a,b) { if(a > b) { return a; } else { return b; };})(self.line_bufs[0].get_width(cursor), self.line_bufs[1].get_width(cursor));
            cursor.set_size(member_size);
            return width +  2 * self.left_right_spacing * cursor.get_size();
        };

        this.get_block_height = function(cursor){
            var member_size = cursor.get_size();
            cursor.set_size(member_size * self.small_ratio);
          
            var top_height = self.line_bufs[0].get_height(cursor);
            var bottom_height = self.line_bufs[1].get_height(cursor);
            var harf_height = (function(a, b){if(a > b) { return a; } else { return b;}; })(top_height, bottom_height);
            cursor.set_size(member_size);
            return harf_height * 2;
        };

        this.block_render = function(cursor){
            var member_size = cursor.get_size();
            var origin_x = cursor.get_x() + self.left_right_spacing * member_size;
            var origin_y = cursor.get_y();

            cursor.set_size(self.small_ratio * member_size);
            var top_height = self.line_bufs[0].get_height(cursor);
            var bottom_height = self.line_bufs[1].get_height(cursor);
            var harf_height = (function(a, b){if(a > b) { return a; } else { return b;}; })(top_height, bottom_height);
            var top_width = self.line_bufs[0].get_width(cursor);
            var bottom_width = self.line_bufs[1].get_width(cursor);
            var width = (function(a, b) { if(a > b) { return a; } else { return b;}; })(top_width, bottom_width);

            cursor.set_x(origin_x + (width - bottom_width) / 2);
            cursor.set_y(origin_y - harf_height / 2);
            self.line_bufs[1].render(cursor);

            cursor.set_x(origin_x + (width - top_width) / 2);
            cursor.set_y(origin_y - harf_height - harf_height / 2);
            self.line_bufs[0].render(cursor);
            
            cursor.draw_line(origin_x,
                            origin_y - harf_height + self.vertical_spacing * cursor.get_size(), 
                            origin_x + width, 
                            origin_y - harf_height + self.vertical_spacing * cursor.get_size());

            cursor.set_x(origin_x + width + 2 * self.left_right_spacing * cursor.get_size());
            cursor.set_y(origin_y);
            cursor.set_size(member_size);
        };
    };

    root.blocks.frac.prototype = root.blocks.abstract_block;

    root.blocks.frac.build = function(alpha){
        const block_length = 5;
        const param1_length = root.blocks.get_param_length(alpha.substring(block_length));
        const param2_length = root.blocks.get_param_length(alpha.substring(block_length + param1_length + 2));
        return [alpha.substring(block_length + param1_length + param2_length + 4), new root.blocks.frac((new root.line_buf()).append(alpha.substr(block_length + 1, param1_length)), (new root.line_buf()).append(alpha.substr(block_length + param1_length + 3, param2_length)))];
    };

})(this.latex);
