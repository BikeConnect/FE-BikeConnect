import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import './SearchBar.css'

const SearchBar = () => {
    return (
        <div className="search-bar">
            <div className="grid">
                <div className="flex">
                    <MapPin className="text-gray-400" size={20} />
                    <div className="flex-grow ml-4">
                        <label className="text-gray-600">Địa điểm</label>
                        <select className="select-box">
                            <option>Chọn địa điểm</option>
                        </select>
                    </div>
                </div>

                <div className="flex">
                    <Clock className="text-gray-400" size={20} />
                    <div className="flex-grow ml-4">
                        <label className="text-gray-600">Thời gian</label>
                        <select className="select-box">
                            <option>Chọn thời gian</option>
                        </select>
                    </div>
                </div>

                <button className="btn-search">
                    Tìm xe
                </button>
            </div>
        </div>
    );
};

export default SearchBar;