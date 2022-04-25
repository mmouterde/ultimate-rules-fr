const MarkdownIt = require("markdown-it");
const markdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});
module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/*.css");
    eleventyConfig.addNunjucksFilter("markdown", function(value) {
        return markdownIt.render(value); });
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
        if( outputPath && outputPath.endsWith(".html") ) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }
        return content;
    });
};