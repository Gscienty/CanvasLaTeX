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

                    cursor.SetSize(self.buf.GetHeight(cursor).mul(1.281));
                    cursor.SetPosition({ Y : position.Y.add(bufHeight.mul(0.5)) });
                    cursor.Write(self.flag);
                    cursor.SetSize(member);
                    cursor.SetPosition({ Y : position.Y });
                    self.buf.Render(cursor);
                }
            };

            return instance;
        },
        Test : (alpha) => { return /^\\left\\(\(|\[|\{)/.test(alpha); },
        Build : (alpha) => {
            const parameterLength = root.utils.GetParameterLength(alpha.substring(7));
            return {
                Remainder : alpha.substring(9 + parameterLength),
                Instance : root.blocks.leftbracket.GetInstance(alpha[6], root.buf.CreateBuf().TransferText(alpha.substr(8, parameterLength)))
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
        Test : (alpha) => { return /^\\right\\(\)|\]|\})/.test(alpha); },
        Build : (alpha) => {
            const parameterLength = root.utils.GetParameterLength(alpha.substring(8));
            return {
                Remainder : alpha.substring(10 + parameterLength),
                Instance : root.blocks.rightbracket.GetInstance(alpha[7], root.buf.CreateBuf().TransferText(alpha.substr(9, parameterLength)))
            };
        }
    };

    const OriginLikeIntBlock = (name, flag, innerBuf, topBuf, bottomBuf) => {
        var self = {};
        self.innerBuf = innerBuf;
        self.smallRatio = 0.85;
        self.leftSpacing = 0.2;
        self.flag = flag;
        self.topBuf = topBuf;
        self.bottomBuf = bottomBuf;

        self.GetFlagMeasure = (cursor) => {
            const member = cursor.GetSize();
            cursor.SetSize(self.innerBuf.GetHeight(cursor));
            var result = cursor.GetMeasure(self.flag);
            cursor.SetSize(member);
            return result;
        };

        self.GetTopMeasure = (cursor) => {
            const member = cursor.GetSize();
            cursor.SetSize(member.mul(self.smallRatio));
            var result = { Width : self.topBuf.GetWidth(cursor), Height : self.topBuf.GetHeight(cursor) };
            cursor.SetSize(member);
            return result;
        };

        self.GetBottomMeasure = (cursor) => {
            const member = cursor.GetSize();
            cursor.SetSize(member.mul(self.smallRatio));
            var result = { Width : self.bottomBuf.GetWidth(cursor), Height : self.bottomBuf.GetHeight(cursor) };
            cursor.SetSize(member);
            return result;
        };

        var instance = {
            Name : name,
            GetWidth : (cursor) => { return self.innerBuf.GetWidth(cursor).add(Math.max(self.GetTopMeasure(cursor).Width, self.GetBottomMeasure(cursor).Width)).add(self.GetFlagMeasure(cursor).Width).add(cursor.GetSize().mul(self.leftSpacing)); },
            GetHeight : (cursor) => { return self.innerBuf.GetHeight(cursor); },
            Render : (cursor) => {
                const position = cursor.GetPosition();
                const member = cursor.GetSize();
                const bufHeight = instance.GetHeight(cursor);
                const innerHeight = self.innerBuf.GetHeight(cursor);
                const topMeasure = self.GetTopMeasure(cursor);
                const bottomMeasure = self.GetBottomMeasure(cursor);
                const flagMeasure = self.GetFlagMeasure(cursor);

                cursor.SetSize(innerHeight.mul(1.281));
                cursor.SetPosition({ X : position.X, Y : position.Y.add(innerHeight.mul(0.5)) });
                cursor.Write(self.flag);

                cursor.SetSize(member.mul(self.smallRatio));
                cursor.SetPosition({ X : position.X.add(flagMeasure.Width).add(member.mul(self.leftSpacing)), Y : position.Y.add(flagMeasure.Height.mul(-0.5)).add(topMeasure.Height.mul(-0.5)) });
                self.topBuf.Render(cursor);

                cursor.SetPosition({ X : position.X.add(flagMeasure.Width).add(member.mul(self.leftSpacing)), Y : position.Y.add(flagMeasure.Height.mul(0.5)).add(bottomMeasure.Height.mul(0.5)) });
                self.bottomBuf.Render(cursor);

                cursor.SetSize(member);
                cursor.SetPosition({ X : position.X.add(Math.max(topMeasure.Width, bottomMeasure.Width)).add(flagMeasure.Width).add(member.mul(self.leftSpacing)), Y : position.Y });
                self.innerBuf.Render(cursor);
            }
        };

        return instance;
    };

    const OriginBuild = (alpha, length, name, flag) => {
        const blockLength = length;
        var topParameter = '';
        var topLength = 0;
        var isTop = 0;
        var bottomParameter = '';
        var bottomLength = 0;
        var isBottom = 0;
        var innerParameter = '';
        var innerLength = 0;
        var px = 0;

        for(var i = blockLength; i < alpha.length; i++) {
            if(alpha[i] === '_' && isBottom === 0) { isBottom = 1; px = px.add(1); }
            else if(alpha[i] === '^' && isTop === 0) { isTop = 1; px = px.add(1); }
            else if(alpha[i] === '{' && isBottom === 1) {
                bottomLength = root.utils.GetParameterLength(alpha.substring(i));
                bottomParameter = alpha.substr(i + 1, bottomLength);
                isBottom = 2;
                i = i.add(1).add(bottomLength);
                px = px.add(2);
            }
            else if(alpha[i] === '{' && isTop === 1) {
                topLength = root.utils.GetParameterLength(alpha.substring(i));
                topParameter = alpha.substr(i + 1, topLength);
                isTop = 2;
                i = i.add(1).add(topLength);
                px = px.add(2);
            }
            else if(alpha[i] === '{' && (isTop === 0 || isTop === 2) && (isBottom === 0 || isBottom === 2)) {
                innerLength = root.utils.GetParameterLength(alpha.substring(i));
                innerParameter = alpha.substr(i + 1, innerLength);
                i = i.add(1).add(innerLength);
                px = px.add(2);
            }
            else if(isTop === 1) {
                topLength = 1;
                topParameter = alpha[i];
                isTop = 2;
            }
            else if(isBottom === 1) {
                bottomLength = 1;
                bottomParameter = alpha[i];
                isBottom = 2;
            }
            else { break; };
        };

        return {
            Remainder : alpha.substring(blockLength.add(topLength).add(bottomLength).add(innerLength).add(px)),
            Instance : OriginLikeIntBlock(name, flag, root.buf.CreateBuf().TransferText(innerParameter), root.buf.CreateBuf().TransferText(topParameter), root.buf.CreateBuf().TransferText(bottomParameter))
        };
    };

    root.blocks.int = {
        Test : (alpha) => { return /^\\int/.test(alpha); },
        Build : (alpha) => { return OriginBuild(alpha, 4, 'int', '∫'); }
    };

    root.blocks.iint = {
        Test : (alpha) => { return /^\\oint/.test(alpha); },
        Build : (alpha) => { return OriginBuild(alpha, 5, 'oint', '∮'); }
    }
})(this.latex);