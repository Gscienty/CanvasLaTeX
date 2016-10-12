(() => {
    'use strict';

    this.latex.buf = function() {
        var self = {};
        self.blocks = [];

        this.shiftblocks = () => { return self.blocks.shift(); };
        this.getblockslength = () => { return self.blocks.length; };
        this.getfirstblock = () => { return self.blocks[0]; };
        this.blockappend = (block) => { self.blocks.push(block); }; 

        this.width = (cursor) => {
            var result = 0;
            for(var i = 0; i < self.blocks.length; i++){
                result = result + self.blocks[i].width(cursor);
            };

            return result;
        };

        this.height = (cursor) => {
            var result = 0;
            for(var i = 0; i < self.blocks.length; i++){
                var temp = self.blocks[i].height(cursor);
                if(height < temp) { height = temp; };
            };
            return height;
        };
    };
}).call(this);