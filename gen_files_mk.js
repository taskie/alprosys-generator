const glob = require("glob");

const src = {};

src.html = glob.sync("contents/**/*.html");
src.ejs = glob.sync("contents/**/*.ejs");
src.css = glob.sync("contents/**/*.css");
src.styl = glob.sync("contents/**/*.styl");
src.js = glob.sync("contents/**/*.js");
src.assets = glob.sync("contents/**/*.@(png|gif|jpg|svg|mp3|m4a|mid|ttf|eot|woff|md|json)");

for (let key in src) {
    let paths = src[key];
    paths = paths.filter((path) => {
        // reject paths which start with _
        for (let part of path.split("/")) {
            if (part.length && part[0] == "_") {
                return false;
            }
        }
        return true;
    });
    console.log(`SRC_${key.toUpperCase()} := ${paths.join(" ")}`);
}
