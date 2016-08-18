(function(root){
    'use strict';

    root.simple = function simple(word){
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

    root.simple.prototype = root.abstract_block;

})(this.latex.blocks);
