(function(root){
    root.blocks.sum = function(start_line_buf, limit_line_buf){
        var self = {};
        self.line_bufs = [start_line_buf, limit_line_buf];
        self.operation = '∑';
        self.small_ratio = 0.5;
        self.big_ratio = 1.4;
        self.vertical_spacing = 0.1;

        function get_start_height(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var height = self.line_bufs[0].get_height(cursor);
            cursor.set_size(member);
            return height;
        };

        function get_limit_height(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var height = self.line_bufs[1].get_height(cursor);
            cursor.set_size(member);
            return height;
        };

        function get_operation_height(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.big_ratio);
            var height = cursor.get_measure(self.operation).height;
            cursor.set_size(member);
            return height;
        };

        function get_start_width(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var width = self.line_bufs[0].get_width(cursor);
            cursor.set_size(member);
            return width;
        };

        function get_limit_width(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var width = self.line_bufs[1].get_width(cursor);
            cursor.set_size(member);
            return width;
        };

        function get_operation_width(cursor){
            var member = cursor.get_size();
            cursor.set_size(member * self.big_ratio);
            var width = cursor.get_measure(self.operation).width;
            cursor.set_size(member);
            return width;
        };

        this.get_block_width = function(cursor){
            var max_func = function(a, b) { if (a > b) { return a; } else { return b;}; };
            return max_func(max_func(get_start_width(cursor), get_limit_width(cursor)), get_operation_width(cursor));
        };

        this.get_block_height = function(cursor){
            return get_start_height(cursor) + get_limit_height(cursor) + get_operation_height(cursor) * (1 + 2 * self.vertical_spacing);
        };

        this.block_render = function(cursor){
            var member = cursor.get_size();
            var origin_x = cursor.get_x();
            var origin_y = cursor.get_y();
            var width = this.get_block_width(cursor);
            var height = this.get_block_height(cursor);
            var limit_height = get_limit_height(cursor);
            var start_height = get_start_height(cursor);
            var operation_width = get_operation_width(cursor);
            var operation_height = get_operation_height(cursor);

            cursor.set_x(origin_x + (width - operation_width) / 2);
            cursor.set_x(origin_x + (width - operation_width) / 2);

            cursor.set_size(member * self.big_ratio);
            cursor.write_word(self.operation);

            cursor.set_size(member);
        };
    };

    root.blocks.sum.prototype = root.blocks.abstract_block;

    root.blocks.sum.test = function(alpha) { return /^\\sum/.test(alpha); };

    root.blocks.sum.build = function(alpha){
        const block_length = 4;
        var start_length = 0;
        var start_param = '';
        var is_start = 0;
        var is_limit = 0;
        var limit_length = 0;
        var limit_param = '';
        var px = 0;
        
        for(var i = block_length; i < alpha.length; i++){
            if(alpha[i] === '_' && is_start === 0) { is_start = 1; px = px + 1; }
            else if(alpha[i] === '^' && is_limit === 0) { is_limit = 1; px = px + 1; }
            else if(alpha[i] === '{' && is_start === 1) {
                start_length = root.blocks.get_param_length(alpha.substring(i));
                start_param = alpha.substr(i + 1, start_length);
                is_start = 2;
                i = i + 1 + start_length;
                px = px + 2;
            }
            else if(alpha[i] === '{' && is_limit === 1) {
                limit_length = root.blocks.get_param_length(alpha.substring(i));
                limit_param = alpha.substr(i + 1, limit_length);
                is_limit = 2;
                i = i + 1 + limit_length;
                px = px + 2;
            }
            else if(is_start === 1){
                start_length = 1;
                start_param = alpha[i];
                is_start = 2;
            }
            else if(is_limit === 1){
                limit_length = 1;
                limit_param = alpha[i];
                is_limit = 2;
            }
            else { break; };
        };
        return [alpha.substring(block_length + start_length + limit_length + px), new root.blocks.sum((new root.line_buf()).append(start_param), (new root.line_buf()).append(limit_param))];
    };

    
})(this.latex);