(function(root){
    'use strict';
    root.blocks.frac = function(line_buf_t, line_buf_b){
        var self = {};
        self.line_bufs = [line_buf_t, line_buf_b];
        self.small_ratio = 0.8;
        self.left_right_spacing = 0.5;
        self.vertical_spacing = 0.1;

        this.line_bufs = [line_buf_t, line_buf_b];

        function get_truth_width(cursor){
            var member_size = cursor.get_size();
            cursor.set_size(self.small_ratio * member_size);
            var width = self.line_bufs[0].get_width(cursor);
            var width_ = self.line_bufs[1].get_width(cursor);
            if(width < width_) { width = width_; };
            cursor.set_size(member_size);
            return width;
        };

        this.get_block_width = function(cursor){
            return get_truth_width(cursor) + 2 * cursor.get_size(cursor) * self.left_right_spacing;
        };

        this.get_block_height = function(cursor){
            var member_size = cursor.get_size();
            cursor.set_size(member_size * self.small_ratio);
            var height = self.line_bufs[0].get_height(cursor) + self.line_bufs[1].get_height(cursor) + 2 * self.vertical_spacing * cursor.get_size(); 
            cursor.set_size(member_size);
            return height;
        };

        this.block_render = function(cursor){
            const member_size = cursor.get_size();
            const width = get_truth_width(cursor);
            const height = this.get_block_height(cursor);
            const origin_x = cursor.get_x() + self.left_right_spacing * member_size;
            const origin_y = cursor.get_y();

            cursor.set_size(self.small_ratio * member_size);

            const top_height = self.line_bufs[0].get_height(cursor);
            const bottom_height = self.line_bufs[1].get_height(cursor);

            cursor.set_x(origin_x + (width - self.line_bufs[1].get_width(cursor)));
            cursor.set_y(origin_y - bottom_height / 2);

            self.line_bufs[1].render(cursor);

            cursor.set_x(origin_x + (get_truth_width(cursor) - self.line_bufs[0].get_width(cursor)) / 2);
            cursor.set_y(origin_y - bottom_height - top_height / 2 - 2 * self.vertical_spacing * cursor.get_size());

            self.line_bufs[0].render(cursor);
            
            cursor.draw_line(origin_x, origin_y - bottom_height + self.vertical_spacing * cursor.get_size(), origin_x + get_truth_width(cursor), origin_y - bottom_height + self.vertical_spacing * cursor.get_size());

            cursor.set_size(member_size);
            cursor.set_x(origin_x + get_truth_width(cursor) + 2 * self.vertical_spacing * cursor.get_size());
            cursor.set_y(origin_y);
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
