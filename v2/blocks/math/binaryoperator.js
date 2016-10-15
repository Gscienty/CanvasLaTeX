((root) => {
    'use strict';

    root.blocks.triangleleft = {
        Test : (alpha) => { return /^\\triangleleft/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(13),
                Instance : root.blocks.simple.Build('◁')
            };
        }
    };
    root.blocks.cdot = {
        Test : (alpha) => { return /^\\cdot/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(5),
                Instance : root.blocks.simple.Build('·')
            };
        }
    };
    root.blocks.pm = {
        Test : (alpha) => { return /^\\pm/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(3),
                Instance : root.blocks.simple.Build('±')
            };
        }
    };
    root.blocks.triangleright = {
        Test : (alpha) => { return /^\\triangleright/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(14),
                Instance : root.blocks.simple.Build('▷')
            };
        }
    };
    root.blocks.div = {
        Test : (alpha) => { return /^\\div/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(4),
                Instance : root.blocks.simple.Build('÷')
            };
        }
    };
    root.blocks.times = {
        Test : (alpha) => { return /^\\times/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(5),
                Instance : root.blocks.simple.Build('×')
            };
        }
    };
    root.blocks.cup = {
        Test : (alpha) => { return /^\\cup/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(4),
                Instance : root.blocks.simple.Build('∪')
            };
        }
    };
    root.blocks.cap = {
        Test : (alpha) => { return /^\\cap/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(4),
                Instance : root.blocks.simple.Build('∩')
            };
        }
    };
    root.blocks.vee = {
        Test : (alpha) => { return /^\\vee/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(4),
                Instance : root.blocks.simple.Build('∨')
            };
        }
    };
    root.blocks.wedge = {
        Test : (alpha) => { return /^\\wedge/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(6),
                Instance : root.blocks.simple.Build('∧')
            };
        }
    };
    root.blocks.oplus = {
        Test : (alpha) => { return /^\\oplus/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(6),
                Instance : root.blocks.simple.Build('⊕')
            };
        }
    };
})(this.latex);