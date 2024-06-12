const RequestForm = () => {
    return(
       <div className="row">
            <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                <label htmlFor="priceAmout">交換ポイント数</label>
                <input type="number" className="form-control" id="priceAmout" placeholder="500" min={500}/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="my_profile_setting_input form-group">
                    <label htmlFor="priceAmout">金融機関情報</label>
                    <input type="text" className="form-control mb-2" id="priceAmout" placeholder="銀行名"/>
                    <input type="text" className="form-control mb-2" id="priceAmout" placeholder="支店名"/>
                    <input type="text" className="form-control mb-2" id="priceAmout" placeholder="口座番号"/>
                    <input type="text" className="form-control mb-2" id="priceAmout" placeholder="名義(カタカナ)"/>
                    </div>
                </div>
            </div>
            <div className="col-xl-12">
                <div className="my_profile_setting_input">
                    <button className="btn btn2 float-end">申請</button>
                </div>
            </div>
       </div>
    )
}

export default RequestForm;
