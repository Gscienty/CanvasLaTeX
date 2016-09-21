(function(root){
    root.blocks.lim = function(bottom_line_buf){
        var self = {};
        self.operation = 'lim';
        self.small_ratio = 0.7;
        self.big_ratio = 1.4;
        self.vertical_spacing = 0.01;
        self.line_buf = bottom_line_buf;

        this.get_block_name = function(){ return 'lim'; };

        function get_operation_height(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.big_ratio);
            var height = cursor.get_measure(self.operation).height;
            cursor.set_size(member);
            return height;
        };

        function get_operation_width(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.big_ratio);
            var width = cursor.get_measure(self.operation).width;
            cursor.set_size(member);
            return width;
        };

        function get_bottom_height(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var height = self.line_buf.get_height(cursor);
            cursor.set_size(member);
            return height;
        };

        function get_bottom_width(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var width = self.line_buf.get_width(cursor);
            cursor.set_size(member);
            return width;
        };

        this.get_block_width = function(cursor){
            return (function(a, b) { if(a > b) { return a;} else { return b; }; })(get_bottom_width(cursor), get_operation_width(cursor));
        };

        this.get_block_height = function(cursor){
            return get_bottom_height(cursor) + get_operation_height(cursor) + cursor.get_size() * self.vertical_spacing;
        };

        this.block_render = function(cursor){
            var member = cursor.get_size();
            var operation = {
                width : get_operation_width(cursor),
                height : get_operation_height(cursor)
            };
            var bottom = {
                width : get_bottom_width(cursor),
                height : get_bottom_height(cursor)
            };
            var vertical_spacing = cursor.get_size() * self.vertical_spacing;
            var width = this.get_block_width(cursor);
            var origin_x = cursor.get_x();
            var origin_y = cursor.get_y();

            cursor.set_x(origin_x + (width - bottom.width) / 2);
            cursor.set_y(origin_y - bottom.height * 0.5);
            cursor.set_size(member * self.small_ratio);
            self.line_buf.render(cursor);

            cursor.set_x(origin_x + (width - operation.width) / 2);
            cursor.set_y(origin_y - bottom.height - vertical_spacing);
            cursor.set_size(member * self.big_ratio);
            cursor.write_word(self.operation);
            
            cursor.set_size(member);
            cursor.set_x(origin_x + width);
        };
    };

    root.blocks.lim.prototype = root.blocks.abstract_block;

    root.blocks.lim.test = function(alpha) { return /^\\lim/.test(alpha); };

    root.blocks.lim.build = function(alpha){
        const lim_length = 4;
        var param_length = 0;
        var param = '';
        var is_param = 0;
        var px = 0;
        for(var i = lim_length; i < alpha.length; i++){
            if(alpha[i] === '_' && is_param === 0) { is_param = 1; px = px + 1; }
            else if(alpha[i] === '{' && is_param === 1){
                param_length = root.blocks.get_param_length(alpha.substring(i));
                param = alpha.substr(i + 1, param_length);
                px = px + 2;
                break;
            }
            else if(is_param === 1){
                param_length = 1;
                param = alpha[i];
                break;
            }
            else { break; }
        };

        return [alpha.substring(lim_length + param_length + px), new root.blocks.lim((new root.line_buf()).append(param))];
    }
})(this.latex);