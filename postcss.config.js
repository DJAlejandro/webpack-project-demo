// postcss.config.js
const path = require('path');

module.exports={
    plugins:[
        require('cssnano')(),
        require('postcss-preset-env')(),
        require('postcss-sprites')({
            // spritePath只在生产环*境中有效，在开发环*境中雪碧图打包的路径为outputPath+useRelativePath+name
            spritePath:'../dist/assets/imgs/',
            retina:true,
            //过滤一些不需要合并的图片，返回值是一个promise，默认有一个exist的filter
            filterBy : function (image) {
                if (image.url.indexOf('sprites') === -1) {
                    return Promise.reject();
                }
                return Promise.resolve();
            },
            groupBy:function(image){
                let spritesPaths=image.url.split('sprites')
                if (spritesPaths.length>1) {
                    let spritesImagePaths = spritesPaths[1].split('/')
                    if (spritesImagePaths.length>2) {
                        let groupName = spritesImagePaths[1]
                        return Promise.resolve(groupName);
                    } else {
                        return Promise.resolve();
                    }
                } else {
                    return Promise.resolve();
                }
            },
            hooks: {
                onSaveSpritesheet: function(opts, spritesheet) {
                    // We assume that the groups is not an empty array
                    var filenameChunks = spritesheet.groups.concat(spritesheet.extension);
                    return path.join(opts.spritePath, filenameChunks.join('.'));
                }
            }
        })
    ]
};
