"use client";

import { useState, useEffect } from "react";

const OptionItem = ({ optionItem, onDelete, onSave }) => {

  const [option, setOption] = useState({
    ...optionItem,
    optionName: optionItem.name,
    pointNumber: optionItem.point,
    optionContent: optionItem.content,
  });
  const [tempOption, setTempOption] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOption((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDelete = () => {
    const confirmMessage = "このオプション項目を削除してもよろしいですか?";
    if (window.confirm(confirmMessage)) {
      onDelete(option.id);
    } else {
      return;
    }
  }

  const handleEdit = () => {
    setIsEdit(true);
    setTempOption(option);
  }

  const handleSave = () => {
    setIsEdit(false);
    onSave(option);
  }

  const handleCancel = () => {
    setIsEdit(false);
    setOption(tempOption);
  }

  return (
    <div className="row d-flex align-items-center py-4" style={{ borderBottom: '1px solid black' }}>
      <div className="col-lg-7 col-xl-7">
        <div className="form-group">
          <input type="text" className="form-control" id={`optionName-${option.id}`} placeholder="オプション名" name="optionName"
            readOnly={!isEdit} value={option.optionName} onChange={handleInputChange} />
        </div>
      </div>
      <div className="col-lg-5 col-xl-5">
        <div className="form-group d-flex align-items-center gap-2">
          <input type="text" className="form-control" id={`pointNumber-${option.id}`} placeholder="ポイント数" name="pointNumber"
            readOnly={!isEdit} value={option.pointNumber} onChange={handleInputChange} />
          <label htmlFor={`pointNumber-${option.id}`}>PT</label>
        </div>
      </div>
      <div className="col-12 mt-3">
        <div className="form-group d-flex align-items-center gap-2">
          <textarea className="form-control" id={`optionContent-${option.id}`} rows={5} placeholder="オプション説明文" name="optionContent"
            readOnly={!isEdit} value={option.optionContent} onChange={handleInputChange} ></textarea>
        </div>
      </div>
      {
        isEdit ? (
          <div className="row d-flex flex-row justify-content-end align-items-center gap-3 mt-3">
            <button className="btn btn-thm" style={{ width: '12rem' }} onClick={handleCancel}>
              キャンセル
            </button>
            <button
              className="btn btn-thm reservation-btn"
              onClick={handleSave}
              style={{ width: '12rem' }}
            >
              保存
            </button>
          </div>
        ) : (
          <div className="row d-flex flex-row justify-content-end align-items-center gap-3 mt-3">
            <button className="btn btn-thm" style={{ width: '12rem' }} onClick={handleDelete}>
              削除
            </button>
            <button
              className="btn btn-thm reservation-btn"
              style={{ width: '12rem' }}
              onClick={handleEdit}
            >
              編集
            </button>
          </div>
        )
      }
    </div>
  );
};

export default OptionItem;
