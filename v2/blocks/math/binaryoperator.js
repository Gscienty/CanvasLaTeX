((root) => {
    'use strict';

    var BuildSimple = root.blocks.simple.Build;

    root.blocks.triangleleft = {
        Test : (alpha) => { return /^\\triangleleft/.test(alpha); },
        Build : (alpha) => { return BuildSimple('◁' + alpha.substring(13)); }
    };
    root.blocks.cdot = {
        Test : (alpha) => { return /^\\dot/.test(alpha); },
        Build : (alpha) => { return BuildSimple('·' + alpha.substring(5)); }
    };
    root.blocks.pm = {
        Test : (alpha) => { return /^\\pm/.test(alpha); },
        Build : (alpha) => { return BuildSimple('±' + alpha.substring(3)) }
    };
    root.blocks.triangleright = {
        Test : (alpha) => { return /^\\triangleright/.test(alpha); },
        Build : (alpha) => { return BuildSimple('▷', alpha.substring(14)) }
    };
    root.blocks.div = {
        Test : (alpha) => { return /^\\div/.test(alpha); },
        Build : (alpha) => { return BuildSimple('÷', alpha.substring(4)); }
    };
    root.blocks.times = {
        Test : (alpha) => { return /^\\times/.test(alpha); },
        Build : (alpha) => { return BuildSimple('×', alpha.substring(6)); }
    };
    root.blocks.cup = {
        Test : (alpha) => { return /^\\cup/.test(alpha); },
        Build : (alpha) => { return BuildSimple('∪', alpha.substring(4)); }
    };
    root.blocks.cap = {
        Test : (alpha) => { return /^\\cap/.test(alpha); },
        Build : (alpha) => { return BuildSimple('∩', alpha.substring(4)); }
    };
    root.blocks.vee = {
        Test : (alpha) => { return /^\\vee/.test(alpha); },
        Build : (alpha) => { return BuildSimple('∨', alpha.substring(4)); }
    };
    root.blocks.wedge = {
        Test : (alpha) => { return /^\\wedge/.test(alpha); },
        Build : (alpha) => { return BuildSimple('∧', alpha.substring(6)); }
    };
    root.blocks.oplus = {
        Test : (alpha) => { return /^\\oplus/.test(alpha); },
        Build : (alpha) => { return BuildSimple('⊕', alpha.substring(6)); }
    };

    //yes yes i'm lazybones
    root.blocks.infty = {
        Test : (alpha) => { return /^\\infty/.test(alpha); },
        Build : (alpha) => { return BuildSimple('∞', alpha.substring(6)); }
    };

    root.blocks.to = {
        Test : (alpha) => { return /^\\to/.test(alpha); },
        Build : (alpha) => { return BuildSimple('→', alpha.substring(3)); }
    };

    root.blocks.cdots = {
        Test : (alpha) => { return /^\\cdots/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(6),
                Instance : root.blocks.simple.GetInstance('···')
            };
        }
    };
    root.blocks.vdots = {
        Test : (alpha) => { return /^\\vdots/.test(alpha); },
        Build : (alpha) => {
            return {
                Remainder : alpha.substring(6),
                Instance : (() => {
                    const dot = '·';
                    return {
                        Name : 'simple',
                        GetWidth : (cursor) => { return cursor.GetMeasure(cursor).Width; },
                        GetHeight : (cursor) => { return cursor.GetMeasure(cursor).Height.mul(2); },
                        Render : (cursor) => {
                            const position = cursor.GetPosition();
                            const dotHeight = cursor.GetMeasure(dot).Height;
                            cursor.SetPosition({ X : position.X, Y : position.Y.add(dotHeight.mul(0)) });
                            cursor.Write(dot);
                            cursor.SetPosition({ X : position.X, Y : position.Y.add(dotHeight.mul(0.5)) });
                            cursor.Write(dot);
                            cursor.SetPosition({ X : position.X, Y : position.Y.add(dotHeight.mul(1)) });
                            cursor.Write(dot);
                        }
                    };
                })()
            };
        }
    };
})(this.latex);