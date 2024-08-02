const fs = require('fs');
const { Op, where } = require("sequelize");

const { db, sequelize } = require('../database/config/database');

const { PrefectureList } = require("../utils/configInfo");

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

exports.getServicesBySearchType = async (req, res) => {
  try {
    const { searchType = 'ranking', category } = req.query;

    const offset = 0;
    const limit = 12;
    let orderInfo;

    switch (searchType) {
      case 'ranking':
        orderInfo = [['viewerCount', 'DESC']];
        break;
      case 'recent':
      case 'category':
        orderInfo = [['updatedAt', 'DESC']];
        break;
      default:
        orderInfo = [['updatedAt', 'DESC']];
        break;
    }

    let query = {
      status: 'open'
    };

    let queryCategory = {};

    if (searchType === 'category' && category) {
      queryCategory['main'] = category;
    }

    const services = await Service.findAll({
      // where: query,
      include: [
        ServiceLocation,
        {
          model: Category,
          where: queryCategory,
        },
        {
          model: ServiceDetail,
          as: 'DetailInfo'
        },
        Option,
        {
          model: ServiceImage,
          as: 'RelatedImages',
        },
        {
          model: FileRelatedService,
          as: 'RelatedFiles',
        },
        {
          model: User,
          as: 'BookmarkedUsers',
          through: {
            attributes: ['isView'],
          },
          attributes: ['uuid']
        },
        {
          model: User,
          as: 'Viewers',
          through: {
            attributes: []
          },
          attributes: [],
        },
      ],
      order: orderInfo,
      limit,
      offset,
    })

    let servicesObj = [];

    for (const service of services) {
      servicesObj.push(service.toJSON());
    }

    res.status(200).json({
      message: 'Retrieved all services successfully',
      result: {
        services: servicesObj,
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.getAllServicesList = async (req, res) => {
  try {
    const {
      page = 1,
      sortType = 'recent',
      keyword,
      prefecture,
      startDate,
      endDate,
      startHour,
      startMinute,
      endHour,
      endMinute,
      serviceType,
      mainCategory,
      paymethod = 'fixed',
      min_point,
      max_point,
      tags,
      limit = 10,
    } = req.query;

    const offset = (page - 1) * limit;

    let orderInfo;

    switch (sortType) {
      case 'recent':
        orderInfo = [['createdAt', 'DESC']];
        break;
      case 'popular':
        orderInfo = [['viewerCount', 'DESC']];
        break;
      default:
        orderInfo = [['createdAt', 'DESC']];
        break;
    }

    let mainQuery = {
      // status: 'open'
    };
    let locationQuery = {};
    let periodQuery = {};
    let catergoryQuery = {};

    if (keyword) {
      mainQuery['title'] = {
        [Op.like]: `%${keyword}%`
      }
    }

    if (serviceType) {
      mainQuery['type'] = serviceType;
    }

    if (tags) {
      if (Array.isArray(tags)) {
        mainQuery['tags'] = {
          [Op.and]: tags.map((item) => sequelize.literal(`JSON_CONTAINS(tags, '"${item}"')`))
        }
      } else {
        mainQuery['tags'] = sequelize.literal(`JSON_CONTAINS(tags, '"${tags}"')`)
      }
    }

    if (prefecture) {
      locationQuery['prefecture'] = PrefectureList.find(item => item.key === prefecture)?.value;
    }

    if (mainCategory) {
      catergoryQuery['main'] = mainCategory;
    }

    if (paymethod) {
      periodQuery['paymethod'] = paymethod;
    }

    if (startDate) {
      const date = new Date(startDate);
      if (startHour) {
        date.setHours(Number(startHour));
      }
      if (startMinute) {
        date.setMinutes(Number(startMinute));
      }
      periodQuery['startDate'] = {
        [Op.gte]: date
      }
    }

    if (endDate) {
      const date = new Date(endDate);
      if (endHour) {
        date.setHours(Number(endHour));
      }
      if (endMinute) {
        date.setMinutes(Number(endMinute));
      }
      periodQuery['endDate'] = {
        [Op.lte]: date
      }
    }

    if (min_point && max_point) {
      periodQuery['point'] = {
        [Op.between]: [Number(min_point), Number(max_point)]
      }
    } else {
      if (min_point) {
        periodQuery['point'] = {
          [Op.gte]: Number(min_point)
        }
      }

      if (max_point) {
        periodQuery['point'] = {
          [Op.lte]: Number(max_point)
        }
      }
    }

    const services = await Service.findAll({
      where: mainQuery,
      include: [
        {
          model: ServiceLocation,
          where: locationQuery
        },
        {
          model: Category,
          where: catergoryQuery,
        },
        {
          model: ServiceDetail,
          as: 'DetailInfo',
          where: periodQuery
        },
        {
          model: User,
          as: 'Viewers',
          through: {
            attributes: []
          },
          attributes: [],
        },
        Option,
        {
          model: ServiceImage,
          as: 'RelatedImages',
        },
        {
          model: FileRelatedService,
          as: 'RelatedFiles',
        },
        {
          model: User,
          as: 'BookmarkedUsers',
          through: {
            attributes: ['isView']
          },
          attributes: ['uuid']
        },
      ],
      limit: Number(limit),
      offset,
      order: orderInfo,
    })

    const allServiceCount = await Service.count({
      where: mainQuery,
      include: [
        {
          model: ServiceLocation,
          where: locationQuery
        },
        {
          model: Category,
          where: catergoryQuery,
        },
        {
          model: ServiceDetail,
          as: 'DetailInfo',
          where: periodQuery
        },
      ],
    })

    const allPages = Math.ceil(allServiceCount / limit);

    let servicesObj = [];

    for (const service of services) {
      servicesObj.push(service.toJSON());
    }

    res.status(200).json({
      message: 'Retrieved All Service info successfully',
      result: {
        services: servicesObj,
        allServiceCount,
        allPages,
        currentPage: page
      }
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.getServiceDetailInfo = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findOne({
      where: {
        uuid: serviceId
      },
      include: [
        {
          model: User,
          as: 'seller',
        },
        ServiceLocation,
        Category,
        {
          model: ServiceImage,
          as: 'RelatedImages',
        },
        {
          model: FileRelatedService,
          as: 'RelatedFiles',
        },
        {
          model: ServiceDetail,
          as: 'DetailInfo',
        },
        Option,
        {
          model: User,
          as: 'Viewers',
          through: {
            attributes: []
          }
        },
        {
          model: User,
          as: 'BookmarkedUsers',
          through: {
            attributes: ['isView']
          }
        }
      ]
    })

    const serviceViewersCount = await service.countViewers();

    res.status(200).json({
      message: 'Retrieved a service detail info successfully',
      result: {
        service: service.toJSON(),
        viewersCount: serviceViewersCount
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}
