(function(root){
    'use strict';

    root.blocks.to = function(){
        var self = {};
        self.word = '→';

        this.get_block_name = function(){ return 'to'; };
        
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

    root.blocks.to.prototype = root.blocks.abstract_block;

    root.blocks.to.build = function(alpha){
        const block_length = 3;
        return [alpha.substring(block_length), new root.blocks.to()];
    };

    root.blocks.to.test = function(alpha) { return /^\\to/.test(alpha); };

})(this.latex);