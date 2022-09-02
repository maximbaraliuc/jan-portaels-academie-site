// Import prior to `module.exports` within `.eleventy.js`
const { DateTime } = require("luxon");
const htmlToText = require("./src/filters/html-to-text.js");
const removeSpaces = require("./src/filters/remove-spaces.js");
const markdown = require("markdown-it")({
  html: true,
  breaks: true,
  linkify: true,
});
const prettier = require("prettier");

module.exports = (config) => {
  config.setQuietMode(true);
  // Add filters
  config.addFilter("htmlToText", htmlToText);
  config.addFilter("removeSpaces", removeSpaces);
  config.addFilter("readablePostDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "Europe/Amsterdam",
    })
      .setLocale("nl")
      .toLocaleString(DateTime.DATE_FULL);
  });

  config.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "Europe/Amsterdam",
    })
      .setLocale("nl")
      .toISODate();
  });

  // Add transforms
  config.addTransform("prettier", function (content) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      let prettified = prettier.format(content, {
        parser: "html",
        htmlWhitespaceSensitivity: "css",
        bracketSameLine: true,
        singleAttributePerLine: false,
        // endOfLine: "auto",
      });
      return prettified;
    }

    return content;
  });

  // Plugin

  // Markdown
  config.addFilter("markdown", (content) => {
    return markdown.render(content);
  });

  config.addFilter("markdownInline", (content) => {
    return markdown.renderInline(content);
  });

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/media/");
  config.addPassthroughCopy("./src/css/");
  config.addPassthroughCopy("./src/javascript/");
  config.addPassthroughCopy("./src/admin/");
  config.addPassthroughCopy("./src/.htaccess");

  // Returns a collection of blog posts in reverse date order
  config.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
  });

  // Returns a collection of expos
  config.addCollection("expo", (collection) => {
    return [...collection.getFilteredByGlob("./src/expo/*.md")].reverse();
  });

  // Ateliers collection
  config.addCollection("ateliers", function (collection) {
    return collection.getFilteredByGlob("./src/ateliers/*.md");
  });

  // Contact data
  config.addCollection("contact", function (collection) {
    return collection.getFilteredByGlob("./src/contact.md");
  });
  // School schedules tables
  config.addCollection("schedules", function (collection) {
    return collection.getFilteredByGlob("./src/schedules/*.md");
  });

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
