(function(root){
    'use strict';

    root.blocks.theta = {};
    root.blocks.theta.build = function(alpha){ return root.blocks.simple.build('θ' + alpha.substring(6)); };
    root.blocks.theta.test = function(alpha) { return /^\\theta/.test(alpha); };


    root.blocks.Theta = {};
    root.blocks.Theta.build = function(alpha){ return root.blocks.simple.build('Θ' + alpha.substring(6)); };
    root.blocks.Theta.test = function(alpha) { return /^\\Theta/.test(alpha); };

})(this.latex);