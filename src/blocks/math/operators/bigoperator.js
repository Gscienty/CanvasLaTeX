(function(root){
    'use strict';

    root.blocks.origin_big_operator = function(flag, start_line_buf, limit_line_buf){
        var self = {};
        self.line_bufs = [start_line_buf, limit_line_buf];
        self.operation = flag;
        self.small_ratio = 0.8;
        self.big_ratio = 2;
        self.vertical_spacing = 0;
        self.left_spacing = 0.1;

        this.get_block_name = function(){ return 'sum'; };
        
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
            var width = cursor.get_measure(self.operation).width + self.left_spacing * member;
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
            var limit_width = get_limit_width(cursor);
            var start_height = get_start_height(cursor);
            var start_width = get_start_width(cursor);
            var operation_width = get_operation_width(cursor);
            var operation_height = get_operation_height(cursor);

            cursor.set_x(origin_x + (width - operation_width) / 2);
            cursor.set_y(origin_y - start_height - operation_height * self.vertical_spacing - operation_height * 0.05);
            cursor.set_size(member * self.big_ratio);
            cursor.write_word(self.operation);

            cursor.set_x(origin_x + (width - start_width) / 2);
            cursor.set_y(origin_y - operation_height * self.vertical_spacing);
            cursor.set_size(member * self.small_ratio);
            self.line_bufs[0].render(cursor);

            cursor.set_x(origin_x + (width - limit_width) / 2);
            cursor.set_y(origin_y - start_height - operation_height * (1.5 + 2 * self.vertical_spacing) - limit_height * 0.5);
            self.line_bufs[1].render(cursor);

            cursor.set_size(member);

            cursor.set_x(origin_x + width + operation_width * self.left_spacing);
        };
    };

    function origin_build(flag, length, alpha){
        const block_length = length;
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
        return [alpha.substring(block_length + start_length + limit_length + px), new root.blocks.origin_big_operator(flag, (new root.line_buf()).append(start_param), (new root.line_buf()).append(limit_param))];
    }

    root.blocks.origin_big_operator.prototype = root.blocks.abstract_block;

    root.blocks.sum = {};
    root.blocks.sum.test = function(alpha) { return /^\\sum/.test(alpha); };
    root.blocks.sum.build = function(alpha) { return origin_build('Σ', 4, alpha); };

    root.blocks.prod = {};
    root.blocks.prod.test = function(alpha) { return /^\\prod/.test(alpha); };
    root.blocks.prod.build = function(alpha) { return origin_build('Π', 5, alpha); };

    root.blocks.bigcup = {};
    root.blocks.bigcup.test = function(alpha) { return /^\\bigcup/.test(alpha); };
    root.blocks.bigcup.build = function(alpha) { return origin_build('∪', 7, alpha); };

    root.blocks.bigcap = {};
    root.blocks.bigcap.test = function(alpha) { return /^\\bigcap/.test(alpha); };
    root.blocks.bigcap.build = function(alpha) { return origin_build('∩', 7, alpha); };

    root.blocks.bigvee = {};
    root.blocks.bigvee.test = function(alpha) { return /^\\bigvee/.test(alpha); };
    root.blocks.bigvee.build = function(alpha) { return origin_build('∨', 7, alpha); };

    root.blocks.bigwedge = {};
    root.blocks.bigwedge.test = function(alpha) { return /^\\bigwedge/.test(alpha); };
    root.blocks.bigwedge.build = function(alpha) { return origin_build('∧', 9, alpha); };

    root.blocks.bigoplus = {};
    root.blocks.bigoplus.test = function(alpha) { return /^\\bigoplus/.test(alpha); };
    root.blocks.bigoplus.build = function(alpha) { return origin_build('⊕', 9, alpha); };

    root.blocks.bigotimes = {};
    root.blocks.bigotimes.test = function(alpha) { return /^\\bigotimes/.test(alpha); };
    root.blocks.bigotimes.build = function(alpha) { return origin_build('⊙', 10, alpha); };

})(this.latex);