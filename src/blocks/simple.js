(function(root){
    'use strict';

    root.simple = function simple(word, cursor){
        var self = {};
        self.word = word;
        self.cursor = cursor;
        self.width = -1;
        self.height = -1;

        this.get_block_width = function(){
            return self.cursor.get_measure(self.word).width;
        };

        this.get_block_height = function(){
            return self.cursor.get_measure(self.word).height;
        };

        this.block_render = function(){
            self.cursor.write_word(self.word);
        };
    };

    root.simple.prototype = root.abstract_block;

})(this.latex.blocks);
