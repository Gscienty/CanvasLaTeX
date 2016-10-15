((root) => {
    'use strict';

    root.blocks.bf = {
        GetInstance : (buf) => {
            var self = {};
            self.buf = buf;

            var instance = {
                Name : 'bf',
                GetHeight : (cursor) => {
                    const member = cursor.GetStyle();
                    cursor.SetStyle('bold');
                    var width = buf.GetWidth(cursor);
                    cursor.SetStyle(member);
                    return width; 
                },
                GetWidth : (cursor) => {
                    var member = cursor.GetStyle();
                    cursor.SetStyle('bold');
                    var height = self.buf.GetHeight(cursor);
                    cursor.SetStyle(member);
                    return height;
                },
                Render : (cursor) => {
                    var member = cursor.GetStyle();
                    cursor.SetStyle('bold');
                    self.buf.Render(cursor);
                    cursor.SetStyle(member);
                }
            };

            return instance;
        },
        Test : (a) => { return /^{\\bf/.test(a); },
        Build : (a) => {
            const parameterLength = root.utils.GetParameterLength(a);
            return {
                Remainder : a.substring(parameterLength + 2),
                Instance : root.blocks.bf.GetInstance(root.buf.CreateBuf().TransferText(a.substr(4, parameterLength - 3)))
            };
        }
    };


    root.blocks.center = {
        GetInstance : (buf) => {
            var self = {};
            self.buf = buf;

            var instance = {
                Name : 'center',
                GetWidth : (cursor) => { return self.buf.GetWidth(cursor); },
                GetHeight : (cursor) => { return self.buf.GetHeight(cursor); },
                Render : (cursor) => {
                    cursor.SetPosition({ Y : cursor.GetPosition().Y.add(instance.GetHeight(cursor).mul(0.5)) });
                    self.buf.Render(cursor);
                }
            };

            return instance;
        },
        Test : (a) => { return /^{\\center/.test(a); },
        Build : (a) => {
            const parameterLength = root.utils.GetParameterLength(a);
            return {
                Remainder : a.substring(parameterLength + 2),
                Instance : root.blocks.center.GetInstance(root.buf.CreateBuf().TransferText(a.substr(8, parameterLength - 7)))
            };
        }
    };

    root.blocks.crlf = {
        GetInstance : () => {
            return {
                Name : 'crlf',
                GetWidth : (cursor) => { return 0; },
                GetHeight : (cursor) => { return 0; },
                Render : (cursor) => {}
            };
        },
        Build : (a) => { return { Remainder : a.substring(2), Instance : root.blocks.crlf.GetInstance() } },
        Test : (a) => { return /^\\\\/.test(a); }
    };

    root.blocks.it = {
        GetInstance : (buf) => {
            var self = {};
            self.buf = buf;

            var instance = {
                Name : 'it',
                GetHeight : (cursor) => {
                    const member = cursor.GetStyle();
                    cursor.SetStyle('italic');
                    var width = buf.GetWidth(cursor);
                    cursor.SetStyle(member);
                    return width; 
                },
                GetWidth : (cursor) => {
                    var member = cursor.GetStyle();
                    cursor.SetStyle('italic');
                    var height = self.buf.GetHeight(cursor);
                    cursor.SetStyle(member);
                    return height;
                },
                Render : (cursor) => {
                    var member = cursor.GetStyle();
                    cursor.SetStyle('italic');
                    self.buf.Render(cursor);
                    cursor.SetStyle(member);
                }
            };

            return instance;
        },
        Test : (a) => { return /^{\\it/.test(a); },
        Build : (a) => {
            const parameterLength = root.utils.GetParameterLength(a);
            return {
                Remainder : a.substring(parameterLength + 2),
                Instance : root.blocks.bf.GetInstance(root.buf.CreateBuf().TransferText(a.substr(4, parameterLength - 3)))
            };
        }
    };

    root.blocks.originFontSize = {
        GetInstance : (ratio) => {
            var self = {};
            self.ratio = ratio;

            return {
                Name : 'fontsize',
                GetWidth : (cursor) => { return 0; },
                GetHeight : (cursor) => { return 0; },
                Render : (cursor) => { cursor.SetSize(self.ratio); }
            };
        }
    };

    root.blocks.tiny = {
        Build : (alpha) => { return { Remainder : alpha.substring(5), Instance : root.blocks.originFontSize.GetInstance(8) }},
        Test : (alpha) => { return /^\\tiny/.test(alpha); }
    };
    root.blocks.scriptsize = {
        Build : (alpha) => { return { Remainder : alpha.substring(11), Instance : root.blocks.originFontSize.GetInstance(12) }},
        Test : (alpha) => { return /^\\scriptsize/.test(alpha); }
    };
    root.blocks.footnotesize = {
        Build : (alpha) => { return { Remainder : alpha.substring(13), Instance : root.blocks.originFontSize.GetInstance(14) }},
        Test : (alpha) => { return /^\\footnotesize/.test(alpha); }
    };
    root.blocks.small = {
        Build : (alpha) => { return { Remainder : alpha.substring(6), Instance : root.blocks.originFontSize.GetInstance(16) }},
        Test : (alpha) => { return /^\\small/.test(alpha); }
    };
    root.blocks.normalsize = {
        Build : (alpha) => { return { Remainder : alpha.substring(11), Instance : root.blocks.originFontSize.GetInstance(18) }},
        Test : (alpha) => { return /^\\normalsize/.test(alpha); }
    };
    root.blocks.large = {
        Build : (alpha) => { return { Remainder : alpha.substring(6), Instance : root.blocks.originFontSize.GetInstance(20) }},
        Test : (alpha) => { return /^\\large/.test(alpha); }
    };
    root.blocks.Large = {
        Build : (alpha) => { return { Remainder : alpha.substring(6), Instance : root.blocks.originFontSize.GetInstance(22) }},
        Test : (alpha) => { return /^\\Large/.test(alpha); }
    };
    root.blocks.LARGE = {
        Build : (alpha) => { return { Remainder : alpha.substring(6), Instance : root.blocks.originFontSize.GetInstance(24) }},
        Test : (alpha) => { return /^\\LARGE/.test(alpha); }
    };
    root.blocks.huge = {
        Build : (alpha) => { return { Remainder : alpha.substring(5), Instance : root.blocks.originFontSize.GetInstance(26) }},
        Test : (alpha) => { return /^\\huge/.test(alpha); }
    };
    root.blocks.Huge = {
        Build : (alpha) => { return { Remainder : alpha.substring(5), Instance : root.blocks.originFontSize.GetInstance(28) }},
        Test : (alpha) => { return /^\\Huge/.test(alpha); }
    };

})(this.latex);