const multer = require('multer');
const filestorage = require('../utils/storage');

const upload = multer({
  storage: (req, file, cb) => {
    if (file.fieldname === 'images') {
      cb(null, filestorage.imageStorageRelatedService);
    } else if (file.fieldname === 'files') {
      cb(null, filestorage.fileStorageRelatedService);
    } else {
      // cb(new Error('Unknown field'));
    }
  }
})

module.exports = upload;
