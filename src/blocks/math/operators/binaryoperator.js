(function(root){
    'use strict';

    root.blocks.triangleleft = {};
    root.blocks.triangleleft.test = function(alpha) { return /^\\triangleleft/.test(alpha); };
    root.blocks.triangleleft.build = function(alpha) {
        return [alpha.substring(13), new root.blocks.simple('◁')];
    };

    root.blocks.cdot = {};
    root.blocks.cdot.test = function(alpha) { return /^\\cdot/.test(alpha); };
    root.blocks.cdot.build = function(alpha) { return [alpha.substring(5), new root.blocks.simple('·')]; };

    root.blocks.pm = {};
    root.blocks.pm.test = function(alpha) { return /^\\pm/.test(alpha); };
    root.blocks.pm.build = function(alpha) { return [alpha.substring(3), new root.blocks.simple('±')]; };

    root.blocks.triangleright = {};
    root.blocks.triangleright.test= function(alpha) { return /^\\triangleright/.test(alpha); };
    root.blocks.triangleright.build = function(alpha) { return [alpha.substring(14), new root.blocks.simple('▷')]; };

    root.blocks.div = {};
    root.blocks.div.test = function(alpha) { return /^\\div/.test(alpha); };
    root.blocks.div.build = function(alpha) { return [alpha.substring(4), new root.blocks.simple('÷')]; };

    root.blocks.times = {};
    root.blocks.times.test = function(alpha) { return /^\\times/.test(alpha); };
    root.blocks.times.build = function(alpha) { return [alpha.substring(6), new root.blocks.simple('×')]; };

    root.blocks.cup = {};
    root.blocks.cup.test = function(alpha) { return /^\\cup/.test(alpha); };
    root.blocks.cup.build = function(alpha) { return [alpha.substring(4), new root.blocks.simple('∪')]; };

    root.blocks.cap = {};
    root.blocks.cap.test = function(alpha) { return /^\\cap/.test(alpha); };
    root.blocks.cap.build = function(alpha) { return [alpha.substring(4), new root.blocks.simple('∩')]; };

    root.blocks.vee = {};
    root.blocks.vee.test = function(alpha) { return /^\\vee/.test(alpha); };
    root.blocks.vee.build = function(alpha) { return [alpha.substring(4), new root.blocks.simple('∨')]; };

    root.blocks.wedge = {};
    root.blocks.wedge.test = function(alpha) { return /^\\wedge/.test(alpha); };
    root.blocks.wedge.build = function(alpha) { return [alpha.substring(6), new root.blocks.simple('∧')]; };

    root.blocks.oplus = {};
    root.blocks.oplus.test = function(alpha) { return /^\\oplus/.test(alpha); };
    root.blocks.oplus.build = function(alpha) { return [alpha.substring(6), new root.blocks.simple('⊕')]; };
})(this.latex);