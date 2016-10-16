((root) => {
    'use strict';

    root.blocks.frac = {
        GetInstance : (topBuf, bottomBuf) => {
            var self = {};
            self.smallRatio = 0.8;
            self.leftRightSpacing = 0.1;
            self.verticalSpacing = 0.2;
            self.topBuf = topBuf;
            self.bottomBuf = bottomBuf;

            self.InnerWidth = (cursor) => {
                var member = cursor.GetSize();
                cursor.SetSize(member.mul(self.smallRatio));
                var result = Math.max(self.topBuf.GetWidth(cursor), self.bottomBuf.GetWidth(cursor));
                cursor.SetSize(member);
                return result;
            };

            var instance = {
                Name : 'frac',
                GetWidth : (cursor) => { return self.InnerWidth(cursor).add(cursor.GetSize().mul(self.leftRightSpacing).mul(2)) },
                GetHeight :　(cursor) => {
                    var member = cursor.GetSize();
                    cursor.SetSize(member.mul(self.smallRatio));
                    var result = Math.max(self.topBuf.GetHeight(cursor), self.bottomBuf.GetHeight(cursor)).mul(2).add(member.mul(self.verticalSpacing).mul(2));
                    cursor.SetSize(member);
                    return result;
                },
                Render : (cursor) => {
                    const member = cursor.GetSize();
                    const position = cursor.GetPosition();
                    const width = self.InnerWidth(cursor);

                    //draw line;
                    cursor.DrawLine({ X : position.X, Y : position.Y }, { X : position.X.add(member.mul(self.leftRightSpacing).mul(2)).add(width), Y : position.Y });

                    cursor.SetSize(member.mul(self.smallRatio));
                    cursor.SetPosition({
                        X : position.X.add(member.mul(self.leftRightSpacing)).add(width.add(-self.topBuf.GetWidth(cursor)).mul(0.5)),
                        Y : position.Y.add(-member.mul(self.verticalSpacing)).add(self.topBuf.GetHeight(cursor).mul(-0.5))
                    });
                    self.topBuf.Render(cursor);

                    cursor.SetPosition({
                        X : position.X.add(member.mul(self.leftRightSpacing)).add(width.add(-self.bottomBuf.GetWidth(cursor)).mul(0.5)),
                        Y : position.Y.add(member.mul(self.verticalSpacing)).add(self.bottomBuf.GetHeight(cursor).mul(0.5))
                    });
                    self.bottomBuf.Render(cursor);

                    cursor.SetSize(member);

                    cursor.SetPosition({ X : position.X.add(member.mul(self.leftRightSpacing).mul(2)).add(width), Y : 0 });
                }
            };

            return instance;
        },
        Test : (alpha) => { return /^\\frac/.test(alpha); },
        Build : (alpha) => {
            const blockLength = 5;
            const parameter1Lenght = root.utils.GetParameterLength(alpha.substring(blockLength));
            const parameter2Length = root.utils.GetParameterLength(alpha.substring(blockLength.add(parameter1Lenght).add(2)));

            return {
                Remainder : alpha.substring(blockLength.add(parameter1Lenght).add(parameter2Length).add(4)),
                Instance : root.blocks.frac.GetInstance(root.buf.CreateBuf().TransferText(alpha.substr(blockLength.add(1), parameter1Lenght)), root.buf.CreateBuf().TransferText(alpha.substr(blockLength.add(parameter1Lenght).add(3), parameter2Length)))
            };
        }
    };
})(this.latex);