const fs = require('fs');

const { db, sequelize } = require('../database/config/database');

const { ServiceHourList } = require("../utils/configInfo");

const User = db['User'];
const Service = db['Service'];
const ServiceLocation = db['ServiceLocation'];
const Category = db['Category'];
const ServiceImage = db['ServiceImage'];
const FileRelatedService = db['FileRelatedService'];
const ServiceDetail = db['ServiceDetail'];
const Option = db['Option'];
const OptionTemplate = db['OptionTemplate'];
const ServiceViewer = db['ServiceViewer'];

exports.getServiceList = async (req, res) => {
  try {
    const user = req.user;
    const { userId } = req.params;
    const { page = 1, sortType = 'recent', status, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    let orderInfo;
    switch (sortType) {
      case 'featured_first':
        orderInfo = [[sequelize.literal('viewerCount'), 'DESC']];
        break;
      case 'recent':
        orderInfo = [['createdAt', 'DESC']];
        break;
      case 'old_review':
        orderInfo = [['createdAt', 'DESC']];
        break;
      default:
        orderInfo = [['createdAt', 'DESC']];
        break;
    }

    let query = {
      user_uuid: user.uuid
    };

    if (status) {
      query['status'] = status;
    }

    const services = await Service.findAll({
      where: query,
      include: [
        ServiceLocation,
        Category,
        {
          model: ServiceDetail,
          as: 'DetailInfo'
        },
        {
          model: User,
          as: 'Viewers',
          through: {
            attributes: []
          },
          attributes: [],
        }
      ],
      attributes: {
        include: [[sequelize.fn('COUNT', sequelize.col('Viewers.ServiceViewer.user_uuid')), 'viewerCount']]
      },
      group: ['Service.uuid'],
      order: orderInfo,
      limit: Number(limit),
      offset,
      subQuery: false,
    })

    let servicesObj = [];

    for (const service of services) {
      const relatedImages = await service.getRelatedImages();
      const relatedFiles = await service.getRelatedFiles();
      const options = await service.getOptions();
      const serviceObj = service.toJSON();
      serviceObj['Options'] = options;
      serviceObj['RelatedImages'] = relatedImages;
      serviceObj['RelatedFiles'] = relatedFiles;
      // serviceObj['viewerCount'] = serviceObj['viewerCount'] / 8;
      servicesObj.push(serviceObj);
    }

    const allServicesCount = await Service.count({
      where: query,
    })

    const maxPage = Math.ceil(allServicesCount / limit);

    res.status(200).json({
      message: 'Retrieved all services successfully',
      result: {
        services: servicesObj,
        currentPage: Number(page),
        maxPage
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.createServiceMainData = async (req, res) => {
  try {
    const user = req.user;
    const { serviceId: service_uuid, ...mainData } = req.body;
    let service;
    if (!service_uuid) {
      const newService = await Service.create({
        user_uuid: user.uuid,
        ...mainData
      });
      service = newService;
    } else {
      await Service.update(mainData,
        {
          where: {
            uuid: service_uuid
          }
        });
      service = await Service.findOne({
        where: {
          uuid: service_uuid
        }
      });
    }

    const resultService = await Service.findOne({
      where: {
        uuid: service.uuid
      },
      include: [
        {
          model: ServiceLocation
        },
        {
          model: Category
        },
        {
          model: ServiceImage,
          as: 'RelatedImages'
        },
        {
          model: FileRelatedService,
          as: 'RelatedFiles'
        },
        {
          model: ServiceDetail,
          as: 'DetailInfo'
        },
        {
          model: Option
        }
      ]
    })

    res.status(200).json({
      message: 'Created service main data successfully',
      result: {
        service: resultService.toJSON()
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.createServiceLocation = async (req, res) => {
  try {
    const user = req.user;
    const { serviceId: service_uuid, ...locationInfo } = req.body;

    let service;

    if (!service_uuid) {
      const newService = await Service.create({
        user_uuid: user.uuid,
        ServiceLocation: locationInfo
      }, {
        include: [ServiceLocation]
      })
      service = newService;
    } else {
      const presentService = await Service.findOne({
        where: {
          uuid: service_uuid
        }
      })

      if (!presentService) {
        return res.status(404).json({
          message: 'Service not found'
        })
      }
      const location = await presentService.getServiceLocation();
      if (location) {
        await ServiceLocation.update(locationInfo, {
          where: {
            id: location.id
          }
        })
      } else {
        await presentService.createServiceLocation(locationInfo);
      }
      service = presentService;
    }

    const resultService = await Service.findOne({
      where: {
        uuid: service.uuid
      },
      include: [
        {
          model: ServiceLocation
        },
        {
          model: Category
        },
        {
          model: ServiceImage,
          as: 'RelatedImages'
        },
        {
          model: FileRelatedService,
          as: 'RelatedFiles'
        },
        {
          model: ServiceDetail,
          as: 'DetailInfo'
        },
        {
          model: Option
        }
      ]
    })

    res.status(200).json({
      message: 'Created service location info successfully',
      result: {
        service: resultService.toJSON()
      }
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.createServiceCategoryAndTags = async (req, res) => {
  try {
    const user = req.user;
    const { serviceId: service_uuid, tags, ...categoryInfo } = req.body;

    let service;

    if (!service_uuid) {
      const newService = await Service.create({
        user_uuid: user.uuid,
        tags,
        Category: {
          main: categoryInfo.mainCategory,
          sub: categoryInfo.subCategory
        }
      }, {
        include: [Category]
      })
      service = newService;
    } else {
      const presentService = await Service.findOne({
        where: {
          uuid: service_uuid
        }
      })

      if (!presentService) {
        return res.status(404).json({
          message: 'Service not found'
        })
      }

      const category = await presentService.getCategory();
      if (category) {
        await Category.update(
          {
            main: categoryInfo.mainCategory,
            sub: categoryInfo.subCategory
          },
          {
            where: {
              id: category.id
            }
          })
      } else {
        await presentService.createCategory({
          main: categoryInfo.mainCategory,
          sub: categoryInfo.subCategory
        });
      }

      presentService.tags = tags;
      await presentService.save();
      service = presentService;
    }

    const resultService = await Service.findOne({
      where: {
        uuid: service.uuid
      },
      include: [
        {
          model: ServiceLocation
        },
        {
          model: Category
        },
        {
          model: ServiceImage,
          as: 'RelatedImages'
        },
        {
          model: FileRelatedService,
          as: 'RelatedFiles'
        },
        {
          model: ServiceDetail,
          as: 'DetailInfo'
        },
        {
          model: Option
        }
      ]
    })

    res.status(200).json({
      message: 'Created service category and tags successfully',
      result: {
        service: resultService.toJSON()
      }
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.createRelatedImagesAndFiles = async (req, res) => {
  try {
    const { serviceId: service_uuid } = req.body;
    const user = req.user;

    const images = req.files['images'] || [];
    const files = req.files['files'] || [];

    const presentService = await Service.findOne({
      where: {
        uuid: service_uuid
      }
    })

    if (!presentService) {
      return res.status(404).json({
        message: 'Service Not Found'
      })
    }

    const presentImages = await presentService.getRelatedImages();
    const presentFiles = await presentService.getRelatedFiles();

    for (const image of presentImages) {
      fs.unlinkSync(image.path);
      await ServiceImage.destroy({
        where: {
          id: image.id
        }
      })
    }
    for (const file of presentFiles) {
      fs.unlinkSync(file.path);
      await FileRelatedService.destroy({
        where: {
          id: file.id
        }
      })
    }

    for (const image of images) {
      const path = image.path;
      await presentService.createRelatedImage({
        path
      })
    }
    for (const file of files) {
      const path = file.path;
      const name = decodeURIComponent(file.originalname);
      await presentService.createRelatedFile({
        path,
        name,
      })
    }

    const resultService = await Service.findOne({
      where: {
        uuid: presentService.uuid
      },
      include: [
        {
          model: ServiceLocation
        },
        {
          model: Category
        },
        {
          model: ServiceImage,
          as: 'RelatedImages'
        },
        {
          model: FileRelatedService,
          as: 'RelatedFiles'
        },
        {
          model: ServiceDetail,
          as: 'DetailInfo'
        },
        {
          model: Option
        }
      ]
    })

    res.status(200).json({
      message: 'Created or updated images and files successfully',
      result: {
        service: resultService.toJSON()
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.createDetailInfo = async (req, res) => {
  try {
    const user = req.user;
    const { serviceId: service_uuid, ...detailInfo } = req.body;

    if (detailInfo.service_hours) {
      const serviceMiuntes = ServiceHourList.find(detailInfo.service_hours)?.value || 0;
      const date = (new Date(detailInfo.startDate)).getTime() + serviceMiuntes * 60 * 1000;
      const endDate = (new Date(date)).toString();
      detailInfo['endDate'] = endDate;
    }

    let service;

    if (!service_uuid) {
      const newService = await Service.create({
        user_uuid: user.uuid,
        DetailInfo: detailInfo
      }, {
        include: [
          {
            model: ServiceDetail,
            as: 'DetailInfo'
          }
        ]
      })
      service = newService;
    } else {
      const presentService = await Service.findOne({
        where: {
          uuid: service_uuid
        }
      })

      if (!presentService) {
        return res.status(404).json({
          message: 'Service not found'
        })
      }
      const presentDetailInfo = await presentService.getDetailInfo();
      if (presentDetailInfo) {
        await ServiceDetail.update(detailInfo, {
          where: {
            id: presentDetailInfo.id
          }
        })
      } else {
        await presentService.createDetailInfo(detailInfo);
      }
      service = presentService;
    }

    const resultService = await Service.findOne({
      where: {
        uuid: service.uuid
      },
      include: [
        {
          model: ServiceLocation
        },
        {
          model: Category
        },
        {
          model: ServiceImage,
          as: 'RelatedImages'
        },
        {
          model: FileRelatedService,
          as: 'RelatedFiles'
        },
        {
          model: ServiceDetail,
          as: 'DetailInfo'
        },
        {
          model: Option
        }
      ]
    })

    res.status(200).json({
      message: 'Created service detail info successfully',
      result: {
        service: resultService.toJSON()
      }
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.addServiceOption = async (req, res) => {
  try {
    const { serviceId: service_uuid, ...optionInfo } = req.body;

    let service;
    if (!service_uuid) {
      const newService = await Service.create({
        user_uuid: req.user.uuid,
        Options: [{
          name: optionInfo.optionName,
          point: Number(optionInfo.pointNumber),
          content: optionInfo.optionContent,
        }],
      }, {
        include: [Option]
      })
      service = newService;
    } else {
      const presentService = await Service.findOne({
        where: {
          uuid: service_uuid
        }
      })

      if (!presentService) {
        return res.status(404).json({
          message: 'Service not found'
        })
      }

      const newOption = await presentService.createOption({
        name: optionInfo.optionName,
        point: Number(optionInfo.pointNumber),
        content: optionInfo.optionContent,
      });
      service = presentService;
    }

    const resultService = await Service.findOne({
      where: {
        uuid: service.uuid
      },
      include: [
        {
          model: ServiceLocation
        },
        {
          model: Category
        },
        {
          model: ServiceImage,
          as: 'RelatedImages'
        },
        {
          model: FileRelatedService,
          as: 'RelatedFiles'
        },
        {
          model: ServiceDetail,
          as: 'DetailInfo'
        },
        {
          model: Option
        }
      ]
    })

    res.status(200).json({
      message: 'Adding new option successfully',
      result: {
        service: resultService.toJSON()
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.updateServiceOption = async (req, res) => {
  try {
    const { id: optionId } = req.params;
    const optionInfo = req.body;

    const option = await Option.findByPk(optionId);

    if (!option) {
      return res.status(404).json({
        message: 'Option not found'
      })
    }

    option.name = optionInfo.optionName;
    option.point = optionInfo.pointNumber;
    option.content = optionInfo.optionContent;

    option.save();

    res.status(200).json({
      message: 'Updated option successfully',
      result: {
        option
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.deleteServiceOption = async (req, res) => {
  try {
    const { id: optionId } = req.params;

    const isDeleted = await Option.destroy({
      where: {
        id: optionId
      }
    });

    if (!isDeleted) {
      return res.status(400).json({
        message: 'Deleting option failed'
      })
    }

    res.status(200).json({
      message: 'Deleted option successfully',
      result: {
        deletedId: optionId
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.getAService = async (req, res) => {
  try {
    const { id: serviceId, userId } = req.params;
    const user = req.user;
    if (user.uuid !== userId) {
      return res.status(401).json({
        message: 'No authenticate to access this data'
      })
    }

    const service = await Service.findOne({
      where: {
        uuid: serviceId
      },
      include: [
        ServiceLocation,
        Category,
        {
          model: ServiceImage,
          as: 'RelatedImages'
        },
        {
          model: FileRelatedService,
          as: 'RelatedFiles'
        },
        {
          model: ServiceDetail,
          as: 'DetailInfo'
        },
        Option,
      ]
    })

    res.status(200).json({
      message: 'Retrieved Service Info Successfully',
      result: {
        service: service.toJSON()
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}
