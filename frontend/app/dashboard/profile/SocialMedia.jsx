"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { frontendAxiosInstance } from "@/utils/http-common";
import { toastOption } from "@/utils/toastOption";

const SocialMedia = () => {
  const [formData, setFormData] = useState({
    skype: "",
    website: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    googleplus: "",
    youtube: "",
    pinterest: "",
    vimeo: "",
  })

  const [isNullFormData, setIsNullFormData] = useState(true);

  useEffect(() => {
    setIsNullFormData(Object.values(formData).every(item => item));
  }, [formData])

  const fetchData = async () => {
    try {
      const res = await frontendAxiosInstance.get('user/social-link', {
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = res.data.result;

      const prevFormData = { ...formData }
      if (data.user.SocialLink) {
        Object.entries(data.user.SocialLink).forEach(([key, value]) => {
          if (key === 'portfolio_url') key = 'website';
          prevFormData[key] = value || "";
        })
      }
      setFormData(prevFormData);
    } catch (err) {
      toast.error(err.response.data.error, toastOption);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'website') key = 'portfolio_url';
        submitData[key] = value;
      })
      const res = await frontendAxiosInstance.put('user/social-link', submitData, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = res.data.result;

      const prevFormData = { ...formData }
      if (data.user.SocialLink) {
        Object.entries(data.user.SocialLink).forEach(([key, value]) => {
          if (key === 'portfolio_url') key = 'website';
          prevFormData[key] = value || "";
        })
      }
      setFormData(prevFormData);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleSkype">Skype</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleSkype"
              placeholder="alitfn"
              name="skype"
              value={formData.skype}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleWebsite">Website</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleWebsite"
              placeholder="creativelayers@gmail.com"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleFaceBook">Facebook</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleFaceBook"
              name="facebook"
              value={formData.facebook}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleTwitter">Twitter</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleTwitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleLinkedin">Linkedin</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleLinkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInstagram">Instagram</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInstagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleGooglePlus">Google Plus</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleGooglePlus"
              name="googleplus"
              value={formData.googleplus}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleYoutube">Youtube</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleYoutube"
              name="youtube"
              value={formData.youtube}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExamplePinterest">Pinterest</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExamplePinterest"
              name="pinterest"
              value={formData.pinterest}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleVimeo">Vimeo</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleVimeo"
              name="vimeo"
              value={formData.vimeo}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-xl-12 text-right">
          <div className="my_profile_setting_input">
            <button type="submit" className="btn btn2" disabled={isNullFormData}>保存する</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SocialMedia;
