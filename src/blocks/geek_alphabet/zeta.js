(function(root){
    'use strict';

    root.blocks.zeta = {};
    root.blocks.zeta.build = function(alpha){ return root.blocks.simple.build('ζ' + alpha.substring(5)); };
    root.blocks.zeta.test = function(alpha) { return /^\\zeta/.test(alpha); };


    root.blocks.Zeta = {};
    root.blocks.Zeta.build = function(alpha){ return root.blocks.simple.build('Z' + alpha.substring(5)); };
    root.blocks.Zeta.test = function(alpha) { return /^\\Zeta/.test(alpha); };

})(this.latex);