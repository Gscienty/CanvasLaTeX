((root) => {
    'use strict';

    root.blocks.leftbracket = {
        GetInstance : (flag, buf) => {
            var self = {};
            self.buf = buf;
            self.flag = flag;
            var instance = {
                Name : 'leftbracket',
                GetWidth : (cursor) => { return instance.GetHeight(cursor).add(self.buf.GetWidth(cursor)); },
                GetHeight : (cursor) => { return self.buf.GetHeight(cursor); },
                Render : (cursor) => {
                    const member = cursor.GetSize();
                    const bufHeight = instance.GetHeight(cursor);
                    const position = cursor.GetPosition();

                    cursor.SetSize(self.buf.GetHeight(cursor).mul(1.181));
                    cursor.SetPosition({ Y : position.Y.add(bufHeight.mul(0.5)) });
                    cursor.Write(self.flag);
                    cursor.SetSize(member);
                    cursor.SetPosition({ Y : position.Y });
                    self.buf.Render(cursor);
                }
            };

            return instance;
        },
        Test : (alpha) => { return /^\\left(\(|\[|\{)/.test(alpha); },
        Build : (alpha) => {
            const parameterLength = root.utils.GetParameterLength(alpha.substring(6));
            return {
                Remainder : alpha.substring(8 + parameterLength),
                Instance : root.blocks.leftbracket.GetInstance(alpha[5], root.buf.CreateBuf().TransferText(alpha.substr(7, parameterLength)))
            };
        }
    };

    root.blocks.rightbracket = {
        GetInstance : (flag, buf) => {
            var self = {};
            self.buf = buf;
            self.flag = flag;
            var instance = {
                Name : 'rightbracket',
                GetWidth : (cursor) => { return instance.GetHeight(cursor).add(self.buf.GetWidth(cursor)); },
                GetHeight : (cursor) => { return self.buf.GetHeight(cursor); },
                Render : (cursor) => {
                    const member = cursor.GetSize();
                    const bufHeight = instance.GetHeight(cursor);
                    const position = cursor.GetPosition();

                    cursor.SetPosition({ Y : position.Y });
                    self.buf.Render(cursor);

                    cursor.SetSize(self.buf.GetHeight(cursor).mul(1.281));
                    cursor.SetPosition({ Y : position.Y.add(bufHeight.mul(0.5)) });
                    cursor.Write(self.flag);
                    cursor.SetSize(member);
                }
            };

            return instance;
        },
        Test : (alpha) => { return /^\\right(\)|\]|\})/.test(alpha); },
        Build : (alpha) => {
            const parameterLength = root.utils.GetParameterLength(alpha.substring(7));
            return {
                Remainder : alpha.substring(9 + parameterLength),
                Instance : root.blocks.rightbracket.GetInstance(alpha[6], root.buf.CreateBuf().TransferText(alpha.substr(8, parameterLength)))
            };
        }
    };
})(this.latex);