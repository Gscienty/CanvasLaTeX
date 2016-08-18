(function(root){
    'use strict';
    root.frac = function(line_buf_t, line_buf_b){
        self.line_bufs = [line_buf_t, line_buf_b];
        self.small_ratio = 0.9;
        self.spacing = 0.1;
        self.sur = 0.4;

        function get_truth_width(cursor){
            var member_size = cursor.get_size();
            cursor.set_size(self.small_ratio * member_size);
            var width = self.line_bufs[0].get_width(cursor);
            var width_ = self.line_bufs[1].get_width(cursor);
            if(width < width_) { width = width_; };
            cursor.set_size(member_size);
            return width + 2 * self.sur * cursor.get_size();
        }

        this.get_block_width = function(cursor){
            return get_truth_width(cursor) + 2 * self.sur * cursor.get_size();
        };

        this.get_block_height = function(cursor){
            var member_size = cursor.get_size();
            cursor.set_size(self.small_ratio * member_size);
            var height = self.line_bufs[0].get_height(cursor) + self.line_bufs[1].get_height(cursor) + 2 * self.spacing * cursor.get_size();
            cursor.set_size(member_size);
            return height;
        };

        this.block_render = function(cursor){
            var member_size = cursor.get_size();
            var width = get_truth_width(cursor);
            var origin_x = cursor.get_x() + self.sur * cursor.get_size();
            var origin_y = cursor.get_y();
            cursor.set_size(self.small_ratio * member_size);

            cursor.set_x( origin_x + width / 2 - self.line_bufs[0].get_width(cursor) / 2);
            cursor.set_y(origin_y - member_size / 2 - self.spacing * cursor.get_size());
            self.line_bufs[0].render(cursor);
            cursor.set_x(origin_x + width / 2 - self.line_bufs[1].get_width(cursor) / 2);
            cursor.set_y(origin_y - member_size / 2 + self.spacing * cursor.get_size() + self.line_bufs[1].get_height(cursor));
            self.line_bufs[1].render(cursor);
            cursor.draw_line(
                origin_x,
                origin_y - member_size / 2 + self.spacing * cursor.get_size(),
                origin_x + width,
                origin_y - member_size / 2 + self.spacing * cursor.get_size());

            cursor.set_x(origin_x + this.get_block_width(cursor));
            cursor.set_y(origin_y);
            cursor.set_size(member_size);
        };
    };

    root.frac.prototype = root.abstract_block;

})(this.latex.blocks);
