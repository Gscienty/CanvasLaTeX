(function(root){
    'use strict';

    root.blocks.simple = function simple(word, top_line_buf, bottom_line_buf){
        var self = {};
        self.word = word;
        self.line_bufs = [top_line_buf, bottom_line_buf];
        self.small_ratio = 0.6;
        self.right_spacing = 0.1;

        this.get_block_name = function(){ return 'simple'; };

        this.get_block_width = function(cursor){
            var origin_width = cursor.get_measure(self.word).width;
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var width = origin_width + (function(a, b) { if(a > b) { return a;} else { return b;}; })(self.line_bufs[0].get_width(cursor), self.line_bufs[1].get_width(cursor));
            cursor.set_size(member);
            return width + self.right_spacing * cursor.get_size();
        };

        this.get_block_height = function(cursor){
            var origin_height = cursor.get_measure(self.word).height;
            var member = cursor.get_size();
            cursor.set_size(member * self.small_ratio);
            var height = origin_height + (function(a, b) { if(a > b) { return a;} else { return b;}; })(self.line_bufs[0].get_height(cursor), self.line_bufs[1].get_height(cursor));
            cursor.set_size(member);
            return height;
        };

        this.block_render = function(cursor){
            var member = cursor.get_size();
            var origin_x = cursor.get_x();
            var origin_y = cursor.get_y();
            var origin_width = cursor.get_measure(self.word).width;
            var origin_height = cursor.get_measure(self.word).height;

            cursor.set_size(member * self.small_ratio);
            var tor_height = (function(a, b) { if(a > b) { return a;} else { return b;}; })(self.line_bufs[0].get_height(cursor), self.line_bufs[1].get_height(cursor));

            cursor.set_size(member);
            cursor.set_y(origin_y - tor_height / 2);
            cursor.write_word(self.word);

            cursor.set_size(member * self.small_ratio);

            cursor.set_y(origin_y - tor_height / 2);
            cursor.set_x(origin_x + origin_width + member * self.right_spacing);
            self.line_bufs[1].render(cursor);

            cursor.set_y(origin_y - tor_height / 4 - origin_height);
            cursor.set_x(origin_x + origin_width + member * self.right_spacing);
            self.line_bufs[0].render(cursor);

            cursor.set_size(member);

            cursor.set_x(origin_x + this.get_block_width(cursor));
        };
    };

    root.blocks.simple.prototype = root.blocks.abstract_block;

    root.blocks.simple.build = function(alpha){
        if(/^\\./.test(alpha)) alpha = alpha.substring(1);
        
        var word = alpha[0];
        for(var i = 1; i < alpha.length; i++){
            if(/[0-9A-Za-z]/.test(alpha[i])) { word = word + alpha[i]; }
            else { break; };
        }
        var top_length = 0;
        var bottom_length = 0;
        var is_top = 0;
        var is_bottom = 0;
        var top_param = '';
        var bottom_param = '';
        var px = 0;
        for(var i = word.length; i < alpha.length; i++){
            if (alpha[i] === '_' && is_bottom === 0) { is_bottom = 1; px = px + 1; }
            else if (alpha[i] === '^' && is_top === 0) { is_top = 1; px = px + 1;}
            else if (alpha[i] === '{' && is_bottom === 1) {
                bottom_length = root.blocks.get_param_length(alpha.substring(i));
                bottom_param = alpha.substr(i + 1, bottom_length);
                is_bottom = 2;
                i = i + 1 + bottom_length;
                px = px + 2;
            }
            else if(alpha[i] === '{' && is_top === 1) {
                top_length = root.blocks.get_param_length(alpha.substring(i));
                top_param = alpha.substr(i + 1, top_length);
                is_top = 2;
                i = i + 1 + top_length;
                px = px + 2;
            }
            else if (is_bottom === 1) {
                bottom_length = 1;
                bottom_param = alpha[i];
                is_bottom = 2;
            }
            else if (is_top === 1) {
                top_length = 1;
                top_param = alpha[i];
                is_top = 2;
            }
            else { break; };
        };
        return [alpha.substring(word.length + bottom_length + top_length + px), new root.blocks.simple(word, (new root.line_buf()).append(top_param), (new root.line_buf()).append(bottom_param))];
    };

})(this.latex);
