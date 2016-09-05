(function(root){
    'use strict';

    root.blocks.phi = {};
    root.blocks.phi.build = function(alpha){ return root.blocks.simple('φ' + alpha.substring(4)); };
    root.blocks.phi.test = function(alpha) { return /^\\phi/.test(alpha); };


    root.blocks.Phi = {};
    root.blocks.Phi.build = function(alpha){ return root.blocks.simple('Φ' + alpha.substring(4)); };
    root.blocks.Phi.test = function(alpha) { return /^\\Phi/.test(alpha); };

})(this.latex);