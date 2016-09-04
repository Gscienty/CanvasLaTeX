(function(root){
    'use strict';

    root.blocks.gamma = function(){
        var self = {};
        self.word = 'γ';

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

    root.blocks.gamma.prototype = root.blocks.abstract_block;

    root.blocks.gamma.build = function(alpha){
        const block_length = 6;
        return [alpha.substring(block_length), new root.blocks.gamma()];
    };

    root.blocks.gamma.test = function(alpha) { return /^\\gamma/.test(alpha); };


    root.blocks.Gamma = function(){
        var self = {};
        self.word = 'Γ';

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

    root.blocks.Gamma.prototype = root.blocks.abstract_block;

    root.blocks.Gamma.build = function(alpha){
        const block_length = 6;
        return [alpha.substring(block_length), new root.blocks.Gamma()];
    };

    root.blocks.Gamma.test = function(alpha) { return /^\\Gamma/.test(alpha); };

})(this.latex);