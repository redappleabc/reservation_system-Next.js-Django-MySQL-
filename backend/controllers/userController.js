const bcrypt = require("bcryptjs");
const fs = require('fs');

const { db, sequelize } = require("../database/config/database");

const User = db['User'];
const Profile = db['Profile'];
const SocialLink = db['SocialLink'];
const Service = db['Service'];
const ServiceLocation = db['ServiceLocation'];
const Category = db['Category'];
const ServiceImage = db['ServiceImage'];
const FileRelatedService = db['FileRelatedService'];
const ServiceDetail = db['ServiceDetail'];
const Option = db['Option'];
const OptionTemplate = db['OptionTemplate'];
const ServiceViewer = db['ServiceViewer'];
const ServiceBookmarkedUser = db['ServiceBookmarkedUser'];

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.user.email
      },
      include: Profile,
    });

    res.status(200).json({
      message: 'Retrieved User profile data successfully',
      result: {
        user
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.updateUserProfile = async (req, res) => {
  try {
    const { display_name, ...profile_info } = req.body;
    if (req.file) {
      const avatarPath = req.file.path;
      profile_info.avatar = avatarPath;
    }

    const user = await User.findOne({
      where: {
        email: req.user.email
      }
    })

    user.display_name = display_name;
    await user.save();

    const profile = await user.getProfile();

    if (!profile) {
      await Profile.create({
        user_uuid: user.uuid,
        ...profile_info
      });
    } else {
      if (req.file && profile.avatar) {
        const prevFilePath = profile.avatar;
        fs.unlinkSync(prevFilePath);
      }
      await Profile.update(
        profile_info,
        {
          where: {
            id: profile.id
          }
        }
      )
    }

    const updatedUser = await User.findOne({
      where: {
        uuid: user.uuid
      },
      include: Profile
    })

    res.status(200).json({
      message: "Updated User profile successfully",
      result: {
        user: updatedUser
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.getUserSocialLink = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.user.uuid
      },
      include: SocialLink
    })

    res.status(200).json({
      message: 'Retrieved user socail link info successfully',
      result: {
        user
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.updateUserSocailLink = async (req, res) => {
  try {
    const user = req.user;
    const { ...socialLink_info } = req.body;

    const socialLink = await user.getSocialLink();

    if (!socialLink) {
      await SocialLink.create({
        user_uuid: user.uuid,
        ...socialLink_info
      });
    } else {
      await SocialLink.update(
        socialLink_info,
        {
          where: {
            id: socialLink.id
          }
        }
      )
    }

    const updatedUser = await User.findOne({
      where: {
        uuid: user.uuid
      },
      include: SocialLink
    })

    res.status(200).json({
      message: 'Updated Social Link info successfully',
      result: {
        user: updatedUser
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.updatePassword = async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Password is incorrect'
      })
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: 'Updated password successfully',
      result: {
        user,
        isUpdated: true
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.createBookmarkedService = async (req, res) => {
  try {
    const user = req.user;
    const { serviceId } = req.params;

    const service = await Service.findOne({
      where: {
        uuid: serviceId
      }
    })

    if (!service) {
      return res.status(404).json({
        message: 'Service Not Found'
      })
    }

    const bookmarkedInfo = await ServiceBookmarkedUser.create({
      service_uuid: service.uuid,
      user_uuid: user.uuid
    })

    res.status(200).json({
      message: 'Create bookmarked service successfully',
      result: {
        service: bookmarkedInfo
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.updateViewStatusBookmarkedService = async (req, res) => {
  try {
    const user = req.user;
    const { serviceId } = req.params;

    const service = await Service.findOne({
      where: {
        uuid: serviceId
      }
    })

    if (!service) {
      return res.status(404).json({
        message: 'Service Not Found'
      })
    }

    const isUpdated = await ServiceBookmarkedUser.update({
      isView: true
    }, {
      where: {
        service_uuid: serviceId,
        user_uuid: user.uuid
      }
    })

    if (!isUpdated) {
      return res.status(400).json({
        message: 'Updating Viewed Status Failed'
      })
    }

    res.status(200).json({
      message: 'Updated Viewed Status Successfully',
      result: {
        updatedServiceId: serviceId,
        isUpdated: true
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

exports.removeBookmarkedService = async (req, res) => {
  try {
    const user = req.user;
    const { serviceId } = req.params;

    const service = await Service.findOne({
      where: {
        uuid: serviceId
      }
    })

    if (!service) {
      return res.status(404).json({
        message: 'Service Not Found'
      })
    }

    const isDeleted = await ServiceBookmarkedUser.destroy({
      where: {
        service_uuid: serviceId,
        user_uuid: user.uuid
      }
    })

    if (!isDeleted) {
      return res.status(400).json({
        message: 'Updating Viewed Status Failed'
      })
    }

    res.status(200).json({
      message: 'Updated Viewed Status Successfully',
      result: {
        deletedBookmarkedServiceId: serviceId,
        isDeleted: true
      }
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}
