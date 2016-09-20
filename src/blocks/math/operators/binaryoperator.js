(function(root){
    root.blocks.triangleleft = {};
    root.blocks.triangleleft.test = function(alpha) { return /^triangleleft/.test(alpha); };
    root.blocks.triangleleft.build = function(alpha) {
        return [alpha.substring(13), new root.blocks.simple('◁')];
    };

    root.blocks.cdot = {};
    root.blocks.cdot.test = function(alpha) { return /^cdot/.test(alpha); };
    root.blocks.cdot.build = function(alpha) { return [alpha.substring(5), new root.blocks.simple('·')]; };

    root.blocks.pm = {};
    root.blocks.pm.test = function(alpha) { return /^pm/.test(alpha); };
    root.blocks.pm.build = function(alpha) { return [alpha.substring(3), new root.blocks.simple('±')]; };

    root.blocks.triangleright = {};
    root.blocks.triangleright.test= function(alpha) { return /^triangleright/.test(alpha); };
    root.blocks.triangleright.build = function(alpha) { return [alpha.substring(14), new root.blocks.simple('▷')]; };

    
})(this.latex);