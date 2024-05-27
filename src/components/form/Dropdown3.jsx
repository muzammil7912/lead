import { Select } from 'antd';

const Dropdown3 = ({changes,selected,dropdown_list}) => {
    const onChange = (value) => {
        changes(value)
      };
      const onSearch = (value) => {
        console.log('search:', value);
      };
return (
  <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    style={{ width: "100%" ,height:'40px'}}
    onChange={onChange}
    onSearch={onSearch}
    value={selected && selected}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={dropdown_list}
  />
);
}
export default Dropdown3;