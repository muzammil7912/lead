import { Select } from 'antd';
const Dropdown6 = ({ list, value, changes }) => {
    let userData = list && list?.map((item) => ({
        label: (item?.label),
        value: (item?.value)
    }));
    const onChange = (value) => {
        changes(value)
    };
    const onSearch = (value) => {
    };
    return (

        <Select
            showSearch
            placeholder="Select from saved Search"
            style={{ width: "100%" }}
            className="basic-multi-select"
            onChange={onChange}
            onSearch={onSearch}
            value={value && value}
            options={userData}
        >
        </Select>
    )
};
export default Dropdown6;