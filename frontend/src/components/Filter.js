import { React, useState } from 'react'
import { Form } from 'react-bootstrap'

const Filter = ({
    onNameFilter,
    onProvinceFilter,
    onGenderFilter,
}) => {
    const [filters, setFilters] = useState({
        name: "",
        Province: "",
        gender: "",
    });

    const handleInput = (field) => (event) => {
        const { value } = event.target;

        setFilters({
            ...filters,
            [field]: value,
        });

        switch (field) {
            case "name":
                onNameFilter(value);
                break;
            case "province":
                onProvinceFilter(value);
                break;
            case "gender":
                onGenderFilter(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="row my-5">
            <div className="col">
                <h4 className="border-bottom">Filters</h4>
            </div>
            <div className="col-sm-12 my-2">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={filters.name}
                    onChange={handleInput("name")}
                />
            </div>

            <div className="col-sm-12 my-2">
                <label htmlFor="province">Province</label>
                <select
                    className="form-control"
                    id="email"
                    onChange={handleInput("province")}
                >
                    <option>Select Province</option>
                    <option value="1">Central Java</option>
                    <option value="2">West Java</option>
                    <option value="3">East Java</option>
                    <option value="4">Yogyakarta</option>
                    <option value="4">Bali</option>
                </select>

            </div>
        </div>
    )

}

export default Filter
