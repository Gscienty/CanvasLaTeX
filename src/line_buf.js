(function(root){
    'use strict';

    root.line_buf = function() {
        var self = {};
        self.width = 0;
        self.height = 0;
        self.blocks = [];

        this.self = self;

        this.get_width = function(cursor) {
            var result = 0;
            for(var i = 0; i < self.blocks.length; i++){
                result = result + self.blocks[i].get_width(cursor);
            };
            return result;
        };

        this.get_height = function(cursor) {
            var height = 0;
            var len = self.blocks.length;
            for(var i = 0; i < len; i++){
                var tmp_height = self.blocks[i].get_height(cursor);
                if(height < tmp_height){
                    height = tmp_height;
                };
            };
            return height;
        };

        function word_transfer_block(alpha){

            for(var block in root.blocks){
                if(root.blocks[block].test){
                    if(root.blocks[block].test(alpha)){
                        return root.blocks[block].build(alpha);
                    };
                };
            };
            
            return root.blocks.simple.build(alpha);

        };

        this.append = function(word){
            var alpha = word;
            while(alpha.length > 0){
                var tuple = word_transfer_block(alpha);
                self.blocks.push(tuple[1]);
                alpha = tuple[0];
            };
            return this;
        };

        this.insert = function(word, index){
            var alpha = word;
            var offset = index;
            while(alpha.length > 0){
                var tuple = word_transfer_block(alpha);
                self.blocks.splice(offset, 0, tuple[1]);
                alpha = tuple[0];
                offset = offset + 1;
            };
            return this;
        };

        this.render = function(cursor){
            var buf_len = self.blocks.length;
            var origin_y = cursor.get_y();
            for(var i = 0; i < buf_len; i++){
                cursor.set_y(origin_y + self.blocks[i].get_height(cursor) / 2);
                self.blocks[i].render(cursor);
                cursor.set_y(origin_y);
            };
            return this;
        };
    };

})(this.latex);
