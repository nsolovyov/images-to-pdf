const imagesToPdfConverter = require('images-to-pdf');
const isImage = require('is-image');
const { readdir } = require('fs');
const { join } = require('path')


const inputDir = 'images/';
const outputDir = 'pdf/';


(async function () {
  try {
    const paths = await getImagesPaths(inputDir);
    const outputPath = await imagesToPdfConverter(paths, join(outputDir, getPdfFilename()));
    console.log('Conversation successful. File: ' + outputPath);
  } catch (error) {
    console.error('Conversation failed');
    console.error(error);
  }
})();


async function getImagesPaths(targetCatalog) {
  return new Promise((resolve, reject) => {
    readdir(targetCatalog, (err, items) => {
      if (err) {
        reject(err);
      }
      resolve(items.filter(i => isImage(i)).map(i => join(targetCatalog, i)));
    });
  });
}


function getPdfFilename() {
  const UTCDateString = new Date().toISOString().replace(/:/g, '-');
  return UTCDateString.substring(0, UTCDateString.indexOf('.')) + '.pdf';
}
