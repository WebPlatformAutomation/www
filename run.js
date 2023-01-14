// https://github.com/cucumber/cucumber-js/blob/d46c797aba67d36b5f446d202667d9d554b81462/docs/javascript_api.md
//

const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const fetch = require('node-fetch');
const urlJoin = require('url-join');
const convert = require('xml-js');
const parser = require('node-html-parser');
const { spawnSync } = require('child_process');

const { loadConfiguration, runCucumber } = require('@cucumber/cucumber/api');
const { ArgvParser } = require('@cucumber/cucumber/lib/configuration/index');
const { exit } = require('process');

async function readRobotsTxt(baseUrl) {
  let url = new URL(baseUrl);
  let robotsTxtUrl = urlJoin(url.origin, 'robots.txt');
  let res = await fetch(robotsTxtUrl);
  let body = await res.text();
  return body;
}

async function getSiteUrls(baseUrl) {
  let text = await readRobotsTxt(baseUrl);
  let lines = text.split('\n');
  let sitemaps = lines.filter((x) => x.trim().startsWith('sitemap:'));
  sitemaps = sitemaps.map((x) => x.split('sitemap:')[1].trim());
  let links = [];
  while (sitemaps.length > 0) {
    let url = sitemaps.shift();
    let res = await fetch(url);
    let body = await res.text();
    let data = JSON.parse(convert.xml2json(body, { compact: true, spaces: 2 }));
    if ('sitemapindex' in data) {
      let innerSitemaps = Array.isArray(data.sitemapindex.sitemap)
        ? data.sitemapindex.sitemap
        : [data.sitemapindex.sitemap];
      innerSitemaps = innerSitemaps.map((x) => x.loc._text);
      sitemaps.push(...innerSitemaps);
    }
    if ('urlset' in data) {
      let urls = data.urlset.url.map((x) => ({
        url: x.loc._text,
        lastmod: x.lastmod._text,
      }));
      links.push(...urls);
      console.log(`${url} has ${urls.length} links.`);
    }
  }
  console.log(`There are ${links.length} links.`);
  return links;
}

function findTestPages(links) {
  let linkSet = new Set(links.map((x) => x.url));
  let testPages = [];
  for (let link of links) {
    let urlObj = new URL(link.url);
    let testUrl = link.url;
    if (urlObj.pathname === '/') {
      testUrl += 'index-test';
    } else {
      testUrl += '-test';
    }
    if (linkSet.has(link.url) && linkSet.has(testUrl)) {
      testPages.push({ url: link.url, test: testUrl });
      linkSet.delete(testUrl);
    }
  }
  return testPages;
}

function findFeaturePages(testBaseUrl, testFeatures) {
  let url = new URL(testBaseUrl);
  let featurePages = [];
  for (let ftr of testFeatures) {
    featurePages.push({
      name: ftr,
      test: urlJoin(url.origin, `${ftr}-feature`),
    });
  }
  return featurePages;
}

async function getScenarios(testUrl) {
  let res = await fetch(testUrl);
  let body = await res.text();
  let root = parser.parse(body);
  let elems = root.querySelectorAll('div.test');
  let scenarios = [];
  for (let elem of elems) {
    let lines = elem.text.split('\n');
    lines = lines.map((x) => x.trim());
    lines = lines.filter((x) => x.length > 0);
    lines = lines.map((x) => {
      if (/^(Scenario|@|Examples)/i.test(x)) {
        return `  ${x}`;
      } else if (/^(Given|\|)/i.test(x)) {
        return `    ${x}`;
      } else if (/^(When|Then)/i.test(x)) {
        return `     ${x}`;
      } else if (/^(And|But)/i.test(x)) {
        return `      ${x}`;
      } else {
        return x;
      }
    });
    scenarios.push(lines.join('\n'));
  }
  return scenarios;
}

async function createFeature(testPage) {
  let scenarios = await getScenarios(testPage.test);
  let cucumber =
    `Feature: Page function tests\n` +
    `  Page under test: ${testPage.url}\n` +
    `  Test scenarios: ${testPage.test}\n\n`;
  for (let scenario of scenarios) {
    cucumber += scenario + '\n\n';
  }
  return cucumber;
}

async function writeFeatureFileForPage(featureSiteDir, testPage) {
  let feature = await createFeature(testPage);
  let url = new URL(testPage.url);
  let pathname = url.pathname === '/' ? '/index' : url.pathname;
  let featureFilePath = path.join(featureSiteDir, `${pathname}.feature`);
  let dirPath = path.dirname(featureFilePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(featureFilePath, feature);

  return featureFilePath;
}

async function writeFeatureFileForFeature(featureSiteDir, feature) {
  let scenarios = await getScenarios(feature.test);
  let cucumber =
    `Feature: Feature tests\n` + `  Feature under test: ${feature.name}\n\n`;
  for (let scenario of scenarios) {
    cucumber += scenario + '\n\n';
  }
  let featureFilePath = path.join(featureSiteDir, `${feature.name}.feature`);
  let dirPath = path.dirname(featureFilePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(featureFilePath, cucumber);

  return featureFilePath;
}

function getGitCurrentBranch() {
  let res = spawnSync('git', ['branch', '--show-current'], {
    shell: true,
  });
  return res.stdout.toString().trim();
}

async function startCucumber({ argv, userConfig }) {
  const { options, configuration } = ArgvParser.parse(argv);
  const { useConfiguration, runConfiguration } = await loadConfiguration({
    file: options.config,
    profiles: options.profile,
    provided: configuration,
  });
  if (global.features) {
    runConfiguration.sources.paths = Object.keys(global.features);
  }
  if (global.config.profile.tags) {
    runConfiguration.sources.tagExpression = global.config.profile.tags;
  }
  const { success } = await runCucumber(runConfiguration);
  return success;
}

async function main() {
  let argv = yargs
    .options('profile', { alias: 'p' })
    .options('features', { alias: 'f' })
    .option('pages', {
      alias: 'g',
    })
    .options('tags', { alias: 't' })
    .options('browser', {
      alias: 'b',
    })
    .options('locale', { alias: 'l' })
    .options('dryRun', {
      alias: 'd',
      type: 'boolean',
      description: 'Verify step definitions',
    })
    .option('headless', {
      alias: 'h',
      type: 'boolean',
      description: 'Use headless browser',
    })
    .option('exit', {
      description: 'Force exit code',
    })
    .parserConfiguration({ 'strip-aliased': true }).argv;

  let profilePath = path.join('features', 'profiles.yml');
  let profiles = yaml.load(fs.readFileSync(profilePath));

  if (profiles.default) {
    let defaultArgs = yargs.parse(profiles.default);
    argv = { ...defaultArgs, ...argv };
  }

  let profile = profiles[argv.profile];

  profile = { ...profile, ...argv };

  // Verify some arguments
  if (!/^(chromium|firefox|webkit)$/.test(profile.browser)) {
    console.log(`Can't run on the browser "${profile.browser}"`);
    console.log(`Use a supported browser only: chromium, firefox, and webkit.`);
    exit(1);
  }

  global.config = {
    profile,
  };

  if (/^(preview|live)$/.test(argv.profile)) {
    let branch = getGitCurrentBranch();
    global.config.profile.baseUrl = global.config.profile.baseUrl.replace('${branch}', branch);
  }

  let testBaseUrl = '';
  if (profiles.origin) {
    if (profile.testBaseUrl) {
      testBaseUrl = profile.testBaseUrl;
    } else if (profiles.origin.testBaseUrl) {
      testBaseUrl = profiles.origin.testBaseUrl;
    } else {
      testBaseUrl = profiles.origin.baseUrl;
    }
  }

  let features = profile.features && profile.features.split(',');
  let pages = profile.pages;

  let featureSiteDir = path.join('features', 'site');
  fs.rmSync(featureSiteDir, { recursive: true, force: true });

  if (features) {
    global.features = {};
    let testFeatures = findFeaturePages(testBaseUrl, features);
    for (let testFeature of testFeatures) {
      let featureFile = await writeFeatureFileForFeature(
        featureSiteDir,
        testFeature
      );
      global.features[featureFile] = testFeature;
      console.log(featureFile);
    }
  } else if (pages) {
    let testPages = [];
    if (pages === true) {
      let links = await getSiteUrls(testBaseUrl);
      testPages = findTestPages(links);
    } else {
      pages = pages.split(',');
      let origin = new URL(testBaseUrl).origin;
      for (let page of pages) {
        testPages.push({url: urlJoin(origin, page), test: urlJoin(origin, page + '-test')});
      }
    }
    global.features = {};
    for (let testPage of testPages) {
      let urlObj = new URL(testPage.url);
      testPage.url = new URL(
        urlObj.pathname,
        global.config.profile.baseUrl
      ).toString();
      let featureFile = await writeFeatureFileForPage(featureSiteDir, testPage);
      global.features[featureFile] = testPage;
      console.log(featureFile);
    }
  }
  let argvCucumber = [process.argv[0], process.argv[1]];

  //for (let key of Object.keys(argv)) {
  //  if (['profile'].includes(key)) {
  //    argvCucumber.push(`--${key}`);
  //    argvCucumber.push(argv[key]);
  //  }
  //}

  await startCucumber({ argv: argvCucumber });
}

main();
