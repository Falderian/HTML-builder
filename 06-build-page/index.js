const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const pathTo = path.join(__dirname, 'components');
const pathToAssets = path.join(__dirname, 'assets');
const pathToCss = path.join(__dirname, 'styles');
const pathToTemplateHtml = path.join(__dirname, 'template.html');

const pathToNewFolder = path.join(__dirname, 'project-dist');
const pathToNewAssets = path.join(pathToNewFolder, 'assets');
const pathToNewCss = path.join(pathToNewFolder, 'style.css');
const pathToNewHtml = path.join(pathToNewFolder, 'index.html');

async function createFolder(inputPath) {
  fs.access(pathToNewFolder, (error) => {
    if (error) {
      fsPromises.mkdir(inputPath);
    }
  });
}

async function createFile(inputPath, content) {
  return await fsPromises.writeFile(inputPath, content);
}

async function mergeFiles() {
  let arrayStyles = [];
  const ArrayOfNamesStyles = await fsPromises.readdir(pathToCss, { withFileTypes: true });

  for (let item of ArrayOfNamesStyles) {
    const pathToCurrentFile = path.join(pathToCss, item.name);
    const fileType = path.extname(pathToCurrentFile);

    if (fileType === '.css') {
      const cssContent = await fsPromises.readFile(pathToCurrentFile, 'utf8');
      arrayStyles.push(`${cssContent}\n\n`);
    }
  }
  createFile(pathToNewCss, arrayStyles);
}

async function copyDir(fromPath, toPath) {
  await fsPromises.rm(toPath, { force: true, recursive: true });
  await fsPromises.mkdir(toPath, { recursive: true });

  const ArrayOfNamesStyles = await fsPromises.readdir(fromPath, { withFileTypes: true });

  for (let item of ArrayOfNamesStyles) {
    const currentItemPath = path.join(fromPath, item.name);
    const copyItemPath = path.join(toPath, item.name);

    if (item.isDirectory()) {
      await fsPromises.mkdir(copyItemPath, { recursive: true });
      await copyDir(currentItemPath, copyItemPath);

    } else if (item.isFile()) {
      await fsPromises.copyFile(currentItemPath, copyItemPath);
    }
  }
}

async function pasteComponents() {
  let htmlBase = await fsPromises.readFile(pathToTemplateHtml, 'utf-8');
  const ArrayOfNamesStyles = await fsPromises.readdir(pathTo, { withFileTypes: true });

  for (let item of ArrayOfNamesStyles) {
    const componentContent = await fsPromises.readFile(path.join(pathTo, `${item.name}`), 'utf-8');
    const regExp = new RegExp(`{{${(item.name).split('.')[0]}}}`, 'g');
    htmlBase = htmlBase.replace(regExp, componentContent);
  }
  createFile(pathToNewHtml, htmlBase);
}

async function buildPage() {
  createFolder(pathToNewFolder);
  mergeFiles();
  copyDir(pathToAssets, pathToNewAssets);
  pasteComponents();
}
buildPage();
