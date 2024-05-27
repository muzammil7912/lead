import React from 'react'
import { Select } from 'antd';


const AvailabilityComponent = () => {


    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div>
            <div className='mb-3'>
                <Select
                    showSearch
                    style={{
                        width: 160,
                    }}
                    onChange={handleChange}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    options={[
                        {
                            value: 'Sun',
                            label: 'Sun',
                        },
                        {
                            value: 'Mon',
                            label: 'Mon',
                        },
                        {
                            value: 'Tue',
                            label: 'Tue',
                        },
                        {
                            value: 'Wed',
                            label: 'Wed',
                        },
                        {
                            value: 'Thu',
                            label: 'Thu',
                        },
                        {
                            value: 'Fri',
                            label: 'Fri',
                        },
                        {
                            value: 'Sat',
                            label: 'Sat',
                        },
                    ]}
                />
            </div>
        </div>
    )
}

const CancelButton = () => {
    return (
        <div className="col-lg-1 col-md-2">
            <div>
                <button type="button" className="btn btn-danger Availabilityrebtn">
                    {" "}
                    <i className="fa fa-times" />
                </button>
            </div>
        </div>

    )
}


export { AvailabilityComponent, CancelButton}