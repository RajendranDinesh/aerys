const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .command('generate <name>')
  .description('Generate files and code for a new feature')
  .action((name) => {
    name = name.toLowerCase();
    generateFeature(name);
    updateAppJs(name);
  });

program.parse(process.argv);

function generateFeature(name) {
  const featureDir = path.join(__dirname, 'src', capitalize(name));
  const controllerPath = path.join(featureDir, 'controller.js');
  const indexPath = path.join(featureDir, 'index.js');
  const modelPath = path.join(featureDir, 'model.js');

  // Create directory
  fs.mkdirSync(featureDir, { recursive: true });

  // Generate controller file
  fs.writeFileSync(controllerPath, generateControllerCode(name));

  // Generate index file
  fs.writeFileSync(indexPath, generateIndexCode(name));

  // Generate model file
  fs.writeFileSync(modelPath, generateModelCode(name));

  console.log(`Feature '${name}' generated successfully!`);
}

function generateControllerCode(name) {
  return `const ${capitalize(name)} = require('./model');

// Controller logic goes here

exports.create${capitalize(name)} = async (req, res) => {
  // Implementation for creating ${name}
};

exports.get${capitalize(name)} = async (req, res) => {
  // Implementation for getting ${name}
};

// Add more controller methods as needed
`;
}

function generateIndexCode(name) {
  return `const express = require('express');
const ${name}Controller = require('./controller');

const router = express.Router();

router.post('/', ${name}Controller.create${capitalize(name)});
router.get('/', ${name}Controller.get${capitalize(name)});

module.exports = router;
`;
}

function generateModelCode(name) {
  return `const mongoose = require('mongoose');

const ${capitalize(name)}Schema = new mongoose.Schema({
  // Define schema fields for ${name}
});

const ${capitalize(name)} = mongoose.model('${name}s', ${capitalize(name)}Schema);

module.exports = ${capitalize(name)};
`;
}

function updateAppJs(name) {
  const appJsPath = path.join(__dirname, '/src/app.js');
  const routeDeclaration = `const ${name}Routes = require('./${capitalize(name)}');`;

  // Read app.js contents
  fs.readFile(appJsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading app.js:', err);
      return;
    }

    // Check if routes are already declared
    if (data.includes(routeDeclaration)) {
      console.log('Routes already declared in app.js');
      return;
    }

    // Add route declaration
    let newData = data.replace('// Add new routes here', `${routeDeclaration}\n// Add new routes here`);

    // Add app.use statement
    newData = newData.replace('// Add app.use statements here', `app.use('/${name}', ${name}Routes);\n// Add app.use statements here`);

    // Write updated content back to app.js
    fs.writeFile(appJsPath, newData, (err) => {
      if (err) {
        console.error('Error updating app.js:', err);
        return;
      }
      console.log('Routes added to app.js');
    });
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
