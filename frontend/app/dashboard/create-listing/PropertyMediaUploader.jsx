'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import _ from "lodash";

import selectedFiles from "../../../utils/selectedFiles";
import { frontendAxiosInstance } from "@/utils/http-common";

const PropertyMediaUploader = ({ service, setService }) => {

  const [propertySelectedImgs, setPropertySelectedImgs] = useState([]);
  const [propertySelectedFiles, setPropertySelectedFiles] = useState([]);
  const [alreadyStoredImages, setAlreadyStoredImages] = useState([]);
  const [alreadyStoredFiles, setAlreadyStoredFiles] = useState([]);

  useEffect(() => {
    setAlreadyStoredImages(_.get(service, 'RelatedImages', []));
    setAlreadyStoredFiles(_.get(service, 'RelatedFiles', []));
  }, [service])

  const multipleImage = (e) => {
    const isExist = propertySelectedImgs?.some((file1) =>
      selectedFiles(e)?.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      const prevImages = [...propertySelectedImgs];
      setPropertySelectedImgs([...prevImages, ...selectedFiles(e)]);
    } else {
      window.alert("You have selected some images already!");
    }
  };

  const deleteImage = (name) => {
    const deleted = propertySelectedImgs?.filter((file) => file.name !== name);
    setPropertySelectedImgs(deleted);
  };

  const deleteAlreadyStoredImage = (index) => {
    const prevImages = [...alreadyStoredImages];
    prevImages.splice(index, 1);
    setAlreadyStoredImages(prevImages);
  }

  const deleteAlreadyStoredFiles = (index) => {
    const prevFiles = [...alreadyStoredFiles];
    prevFiles.splice(index, 1);
    setAlreadyStoredFiles(prevFiles);
  }

  const multipleFiles = (e) => {
    const isExist = propertySelectedFiles.some((file1) =>
      selectedFiles(e).some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      const prevSelectedFiles = [...propertySelectedFiles];
      setPropertySelectedFiles([...prevSelectedFiles, ...selectedFiles(e)]);
    } else {
      window.alert("You have selected some files already!");
    }
  }

  const handleDeleteFile = (index) => {
    const prevSelectedFiles = [...propertySelectedFiles];
    prevSelectedFiles.splice(index, 1);
    setPropertySelectedFiles(prevSelectedFiles);
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      if (service) {
        formData.append('serviceId', service.uuid);
      }
      for (const image of propertySelectedImgs) {
        formData.append('images', image);
      }
      for (const file of propertySelectedFiles) {
        formData.append('files', file, encodeURIComponent(file.name));
      }
      for (const image of alreadyStoredImages) {
        formData.append('alreadyImages', JSON.stringify(image));
      }
      for (const file of alreadyStoredFiles) {
        formData.append('alreadyFiles', JSON.stringify(file));
      }

      const res = await frontendAxiosInstance.post('service/related-images-files', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      setService(res.data.result.service);
      setPropertySelectedImgs([]);
      setPropertySelectedFiles([]);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <ul className="mb-0">
          {
            alreadyStoredImages.map((item, index) => (
              <li key={index} className="list-inline-item">
                <div className="portfolio_item">
                  <img
                    width={200}
                    height={200}
                    className="img-fluid cover"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.path}`}
                    alt="fp1.jpg"
                  />
                  <div
                    className="edu_stats_list"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete"
                    data-original-title="Delete"
                  >
                    <a onClick={() => deleteAlreadyStoredImage(index)}>
                      <span className="flaticon-garbage"></span>
                    </a>
                  </div>
                </div>
              </li>
            ))
          }
          {propertySelectedImgs.length > 0
            ? propertySelectedImgs?.map((item, index) => (
              <li key={index} className="list-inline-item">
                <div className="portfolio_item">
                  <Image
                    width={200}
                    height={200}
                    className="img-fluid cover"
                    src={URL.createObjectURL(item)}
                    alt="fp1.jpg"
                  />
                  <div
                    className="edu_stats_list"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete"
                    data-original-title="Delete"
                  >
                    <a onClick={() => deleteImage(item.name)}>
                      <span className="flaticon-garbage"></span>
                    </a>
                  </div>
                </div>
              </li>
            ))
            : undefined}
        </ul>
      </div>
      <div className="col-lg-12">
        <div className="portfolio_upload">
          <input
            type="file"
            onChange={multipleImage}
            multiple
            accept="image/png, image/gif, image/jpeg, image/webp"
          />
          <div className="icon">
            <span className="flaticon-download"></span>
          </div>
          <p>ここに画像をドラッグ＆ドロップする</p>
        </div>
      </div>
      <div className="col-lg-12 d-flex flex-row flex-wrap gap-1">
        {
          alreadyStoredFiles.map((file, index) => (
            <div key={index} className="d-flex flex-row align-items-center p-2 gap-2" style={{
              maxWidth: '20rem',
              border: '1px solid black',
              borderRadius: '5px'
            }}>
              <p style={{ fontSize: '1rem', whiteSpace: 'nowrap' }} className="flex-grow-1">{file.name}</p>
              <button onClick={() => deleteAlreadyStoredFiles(index)} style={{ border: '0px', backgroundColor: 'white' }}>
                <span className="flaticon-garbage"></span>
              </button>
            </div>
          ))
        }
        {
          propertySelectedFiles.map((file, index) => (
            <div key={index} className="d-flex flex-row align-items-center p-2 gap-2" style={{
              maxWidth: '20rem',
              border: '1px solid black',
              borderRadius: '5px'
            }}>
              <p style={{ fontSize: '1rem', whiteSpace: 'nowrap' }} className="flex-grow-1">{file.name}</p>
              <button onClick={() => handleDeleteFile(index)} style={{ border: '0px', backgroundColor: 'white' }}>
                <span className="flaticon-garbage"></span>
              </button>
            </div>
          ))
        }
      </div>
      <div className="col-xl-6">
        <div className="resume_uploader mb30">
          <h3>アタッチメント</h3>
          <form className="form-inline d-flex flex-wrap wrap">
            <label className="upload">
              <input type="file" onChange={multipleFiles}
                multiple
                accept=".pdf, .txt" />
              アタッチメントを選択
            </label>
          </form>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start">Back</button>
          <button className="btn btn2 float-end" onClick={handleSubmit}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyMediaUploader;
