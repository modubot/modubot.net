var stylus = require('stylus'),
    nib = require('nib'),
    jade = require('jade'),
    walk = require('walk'),
    fs = require('fs'),
    path = require('path'),
    ncp = require('ncp').ncp;

// http://www.geedew.com/2012/10/24/remove-a-directory-that-is-not-empty-in-nodejs/
var rmdirSync = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                rmdirSync(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

rmdirSync('./output');
fs.mkdirSync('./output');
fs.mkdirSync('./output/stylesheets');
fs.mkdirSync('./output/javascripts');

var stylesheets = walk.walk('./src/stylesheets', { followLinks: false });

stylesheets.on('file', function (root, fileStats, next) {
    var file = path.join(root, fileStats.name);
    if(fileStats.name.charAt(0) == '_'){
        console.log('Skipped ' + file);
        next();
        return;
    }

    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            console.error('Could not read ' + file, err);
            return;
        }

        stylus(data)
            .set('filename', fileStats.name)
            .set('compress', true)
            .set('paths', [root])
            .use(nib())
            .render(function(err, css) {
                if (err) {
                    console.error('Could not process ' + file, err);
                    return;
                }

                fs.writeFile('./output/stylesheets/' + fileStats.name.replace(/\.styl$/i, '.css'), css, function(err){
                    if (err) {
                        console.error('Could not write ' + file, err);
                        return;
                    }

                    console.log('Processed ' + file);
                });
            });
    });
    next();
});

var html = walk.walk('./src/pages', { followLinks: false });

html.on('file', function (root, fileStats, next) {
    var file = path.join(root, fileStats.name);

    if(fileStats.name.charAt(0) == '_'){
        console.log('Skipped ' + file);
        next();
        return;
    }

    var html = jade.renderFile(file, { filename: fileStats.name });

    if (!html) {
        console.error('Could not process ' + file, err);
        next()
        return;
    }

    fs.writeFile('./output/' + fileStats.name.replace(/\.jade$/i, '.html'), html, function(err){
        if (err) {
            console.error('Could not write ' + file, err);
            return;
        }

        console.log('Processed ' + file);
    });
    next();
});

ncp('./static', './output', function (err) {
    if (err) {
        console.error('Could not copy static/*: ', err);
        return;
    }

    console.log('Processed static/*');
});
