const multer = require('multer');
const fs = require('fs');

const { db } = require("../database/config/database");

const User = db['User'];
const Service = db['Service'];

exports.userAvatarStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    if (!file) return cb(null, "");
    const user_uuid = req.user.uuid;
    const dirPath = `uploads/user/${user_uuid}/avatar`;
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    cb(null, dirPath);
  },
  filename: async (req, file, cb) => {
    if (!file) return cb(null, "");
    const originalname = decodeURIComponent(file.originalname);
    const filename = Date.now() + '_' + originalname;
    cb(null, filename);
  }
})

exports.imageAndFileStorageRelatedService = multer.diskStorage({
  destination: async (req, file, cb) => {
    if (!file) return cb(null, "");
    const { serviceId: service_uuid } = req.body;
    const user_uuid = req.user.uuid;
    let serviceId = service_uuid;
    if (!service_uuid) {
      const newService = await Service.create({
        user_uuid
      })
      req.body = {
        ...req.body,
        serviceId: newService.uuid
      }
      serviceId = newService.uuid;
    }
    const directoryName = file.fieldname === 'images' ? 'relatedImages' : 'relatedFiles';
    const dirPath = `uploads/service/${serviceId}/${directoryName}`;
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    cb(null, dirPath);
  },
  filename: async (req, file, cb) => {
    if (!file) return cb(null, "");
    const originalname = decodeURIComponent(file.originalname);
    const filename = Date.now() + '_' + originalname;
    cb(null, filename);
  }
})
