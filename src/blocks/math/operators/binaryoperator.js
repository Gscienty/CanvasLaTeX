(function(root){
    root.blocks.triangleleft = {};
    root.blocks.triangleleft.test = function(alpha) { return /^triangleleft/.test(alpha); };
    root.blocks.triangleleft.build = function(alpha) {
        return [alpha.substring(13), new root.blocks.simple('◁')];
    };

    root.blocks.cdot = {};
    root.blocks.cdot.test = function(alpha) { return /^cdot/.test(alpha); };
    root.blocks.cdot.build = function(alpha) { return [alpha.substring(5), new root.blocks.simple('·')]; };
})(this.latex);