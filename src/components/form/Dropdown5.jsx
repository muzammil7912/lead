import { Select } from 'antd';
const Dropdown5 = ({ list, selected, changes, disabled }) => {
    let userData = Array.isArray(list) && list.map((item) => ({
        label: (item.label),
        value: (item.value)
    }));
    const onChange = (value) => {
        changes(value)
    };
    return (

        <Select
            showSearch
            placeholder="Search"
            style={{ width: "100%", marginTop: "6px" }}
            className="basic-multi-select"
            onChange={onChange}
            value={selected && selected}
            options={userData && userData}
            disabled={disabled}
        >
        </Select>
    )
};
export default Dropdown5;