(function(root){
    'use strict';

    root.blocks.omega = {};
    root.blocks.omega.build = function(alpha){ return root.blocks.simple('ω' + alpha.substring(6)); };
    root.blocks.omega.test = function(alpha) { return /^\\omega/.test(alpha); };


    root.blocks.Omega = {};
    root.blocks.Omega.build = function(alpha){ return root.blocks.simple('Ω' + alpha.substring(6)); };
    root.blocks.Omega.test = function(alpha) { return /^\\Omega/.test(alpha); };

})(this.latex);