/**
 * This is a Cucumber.js profile
 * @see https://github.com/cucumber/cucumber-js/blob/main/docs/profiles.md
 *
 * @type {{default: string}}
 */
module.exports = {
  default: {
    paths: ['features/**/*.{feature,feature.md}'],
    publishQuiet: true,
    requireModule: ['@babel/register'],
    format: ['@serenity-js/cucumber'],
    require: ['./features/**/*.steps.js', './features/**/*.config.js', './features/**/*page.js', './features/**/*section.js', './features/support/*.js', './features/tasks/*.js'],
    worldParameters: {
    },
  },
};
