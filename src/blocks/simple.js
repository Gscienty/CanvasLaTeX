(function(root){
    'use strict';

    root.blocks.simple = function simple(word, top_line_buf, bottom_line_buf){
        var self = {};
        self.word = word;

        this.get_block_width = function(cursor){
            return cursor.get_measure(self.word).width;
        };

        this.get_block_height = function(cursor){
            return cursor.get_measure(self.word).height;
        };

        this.block_render = function(cursor){
            cursor.write_word(self.word);
        };
    };

    root.blocks.simple.prototype = root.blocks.abstract_block;

    root.blocks.simple.build = function(alpha){
        if(/^\\./.test(alpha)) return [alpha.substring(2), new root.blocks.simple(alpha[1])];
        else return [alpha.substring(1), new root.blocks.simple(alpha[0])];
    };

})(this.latex);
