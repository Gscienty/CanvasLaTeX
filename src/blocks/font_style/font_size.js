(function(root){
    root.blocks.origin_font_size = function(ratio){
        var self = {};
        self.ratio = ratio;
        this.get_block_name = function() { return "tiny"; };
        this.get_block_width = function(cursor) { return 0; };
        this.get_block_height = function(cursor) { return 0; };
        this.block_render = function(cursor) { cursor.set_size(self.ratio); };
    };
    root.blocks.origin_font_size.prototype = root.blocks.abstract_block;
    root.blocks.tiny = {};
    root.blocks.tiny.build = function(alpha) { return [alpha.substring(5), new root.blocks.origin_font_size(12)]; }
    root.blocks.tiny.test = function(alpha) { return /^\\tiny/.test(alpha); }
    
    root.blocks.scriptsize = {};
    root.blocks.scriptsize.build = function(alpha) { return [alpha.substring(11), new root.blocks.origin_font_size(14)]; }
    root.blocks.scriptsize.test = function(alpha) { return /^\\scriptsize/.test(alpha); }
    
    root.blocks.footnotesize = {};
    root.blocks.footnotesize.build = function(alpha) { return [alpha.substring(13), new root.blocks.origin_font_size(16)]; }
    root.blocks.footnotesize.test = function(alpha) { return /^\\footnotesize/.test(alpha); }
    
    root.blocks.small = {};
    root.blocks.small.build = function(alpha) { return [alpha.substring(6), new root.blocks.origin_font_size(18)]; }
    root.blocks.small.test = function(alpha) { return /^\\small/.test(alpha); }
    
    root.blocks.normalsize = {};
    root.blocks.normalsize.build = function(alpha) { return [alpha.substring(11), new root.blocks.origin_font_size(20)]; }
    root.blocks.normalsize.test = function(alpha) { return /^\\normalsize/.test(alpha); }
    
    root.blocks.large = {};
    root.blocks.large.build = function(alpha) { return [alpha.substring(6), new root.blocks.origin_font_size(22)]; }
    root.blocks.large.test = function(alpha) { return /^\\large/.test(alpha); }
    
    root.blocks.Large = {};
    root.blocks.Large.build = function(alpha) { return [alpha.substring(6), new root.blocks.origin_font_size(24)]; }
    root.blocks.Large.test = function(alpha) { return /^\\Large/.test(alpha); }
    
    root.blocks.LARGE = {};
    root.blocks.LARGE.build = function(alpha) { return [alpha.substring(6), new root.blocks.origin_font_size(26)]; }
    root.blocks.LARGE.test = function(alpha) { return /^\\LARGE/.test(alpha); }
    
    root.blocks.huge = {};
    root.blocks.huge.build = function(alpha) { return [alpha.substring(5), new root.blocks.origin_font_size(28)]; }
    root.blocks.huge.test = function(alpha) { return /^\\huge/.test(alpha); }
    
    root.blocks.Huge = {};
    root.blocks.Huge.build = function(alpha) { return [alpha.substring(5), new root.blocks.origin_font_size(30)]; }
    root.blocks.Huge.test = function(alpha) { return /^\\Huge/.test(alpha); }
})(this.latex);