const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Directory where screenshots will be saved
const screenshotsDir = path.join(__dirname, './public/images/screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Path to the resources.yml file
const resourcesPath = path.resolve(__dirname, './src/data/resources.yml');

// Read the YAML file
let data;
try {
  data = yaml.load(fs.readFileSync(resourcesPath, 'utf8'));
  console.log(data);  // Log the data to check if it's parsed correctly
} catch (e) {
  console.error('Error reading YAML file:', e);
  return;
}

// Check if resources exist and are correctly structured
if (!data || !data.resources) {
  console.error('Error: resources is not present in YAML file');
  return;
}

const resourcesByCategory = data.resources;

// Launch Puppeteer to capture screenshots
async function captureScreenshot(url, filename) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the viewport to 16:9 aspect ratio (for example, 1920x1080)
  const viewportWidth = 1920;
  const viewportHeight = 1080;
  await page.setViewport({ width: viewportWidth, height: viewportHeight });

  await page.goto(url);

  // Capture the screenshot with the 16:9 aspect ratio
  await page.screenshot({
    path: filename,
    clip: {
      x: 0,
      y: 0,
      width: viewportWidth,
      height: viewportHeight,
    },
  });

  await browser.close();
}

// Process each resource, generate screenshot if necessary
async function generateScreenshots() {
  for (const category in resourcesByCategory) {
    const categoryResources = resourcesByCategory[category];

    // Process each resource in the category
    for (const resource of categoryResources) {
      // Skip resources that already have a screenshot
      if (resource.screenshot) continue;

      // Generate a screenshot filename based on the title (slugified)
      const screenshotFilename = `${resource.title.replace(/\s+/g, '-').toLowerCase()}.png`;
      const screenshotPath = path.join(screenshotsDir, screenshotFilename);

      // Capture the screenshot only if it doesn't already exist
      if (!fs.existsSync(screenshotPath)) {
        console.log(`Capturing screenshot for ${resource.title}`);
        await captureScreenshot(resource.url, screenshotPath);

        // Update the resource data with the screenshot filename
        resource.screenshot = `/images/screenshots/${screenshotFilename}`;
      }
    }
  }

  // Write the updated resources back to the YAML file
  try {
    fs.writeFileSync(resourcesPath, yaml.dump(data, { noRefs: true }));
    console.log('Updated resources.yml with new screenshot data.');
  } catch (e) {
    console.error('Error writing YAML file:', e);
  }
}

generateScreenshots().catch((error) => console.error('Error capturing screenshots:', error));
