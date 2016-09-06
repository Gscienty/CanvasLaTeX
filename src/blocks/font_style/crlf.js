(function(root){
    root.blocks.crlf = function(){
        this.get_block_name = function() { return "crlf"; };
        this.get_block_width = function(cursor) { return 0; };
        this.get_block_height = function(cursor) { return 0; };
        this.block_render = function(cursor) {};
    };

    root.blocks.crlf.prototype = root.blocks.abstract_block;
    root.blocks.crlf.build = function(alpha) { return [alpha.substring(2), new root.blocks.crlf()]; };
    root.blocks.crlf.test = function(alpha) { return /^\\\\/.test(alpha); };
})(this.latex);