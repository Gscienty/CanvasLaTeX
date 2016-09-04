(function(root){
    'use strict';

    root.blocks.simple = function simple(word){
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

})(this.latex);
