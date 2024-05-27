import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import usePost from '../../customHooks/usePost';

const SelectSearch = ({ changess, selected, defaultValue, disabled }) => {
    const [resGet, apiMethodGet] = usePost();
    const [selectData, setselectData] = useState([])
    useEffect(() => {

        if (resGet.data) {
            setselectData(resGet.data)
        }

    }, [resGet])

    const onSearch = (value) => {
        let formdata = new FormData()
        formdata.append("userType", "typeSearchMember")
        formdata.append("uLead", "6")
        formdata.append("query", value)
        apiMethodGet("postSerchMember", formdata)

    };
    useEffect(() => onSearch('a'), [])

    return (
        <Select
            defaultValue={defaultValue}
            disabled={disabled}
            showSearch={true}
            filterOption={(input, option) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onSearch={
                (v) => {
                    onSearch(v);
                }
            }
            onChange={(v1, v2) => {
                changess(v1)
                console.log(v1, v2)

            }}


            style={{ width: "100%", height: 40 }}
            placeholder={'Search follower name'}
        >

            {
                selectData.length && selectData.map(({ uname, id, text }) => {
                    return (
                        <Select.Option value={id} key={id}>
                            {uname}
                        </Select.Option>
                    )
                })
            }
        </Select >)
};

export default SelectSearch;