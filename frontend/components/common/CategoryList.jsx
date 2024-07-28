"use client";

import { AllMainCategories } from "@/utils/configInfo";

const CategoryList = ({ category, setCategory }) => {

    const viewedCategoryList = [
        {
            key: 'luxury_hotel',
            name: '高級ホテル'
        },
        {
            key: 'boutique_hotel',
            name: 'ブティックホテル'
        },
        {
            key: 'budget_hotel',
            name: '格安ホテル'
        },
        {
            key: 'engineering',
            name: 'エンジニアリング'
        },
    ]

    return (
        <div className="row d-flex align-items-center justify-content-center gap-3">
            {
                viewedCategoryList.map((item, index) => (
                    <button key={index} className="col-6 cols-sm-3 col-md-2 border rounded d-flex align-items-center justify-content-center p-2"
                        style={{
                            backgroundColor: item.key === category && 'var(--color-primary)',
                            color: item.key === category && 'white',
                        }}
                        onClick={() => setCategory(item.key)}>
                        {
                            item.name
                        }
                    </button>
                ))
            }
        </div>
    );
};

export default CategoryList;