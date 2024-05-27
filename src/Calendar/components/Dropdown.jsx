import { Select } from 'antd';

const Dropdown = ({changes,selected,data}) => {
    const onChange = (value) => {
        changes(value)
      };
      const onSearch = (value) => {
        console.log('search:', value);
      };
return (
  <Select
    showSearch
    style={{ width: "100%" ,height:'40px'}}
    onChange={onChange}
    onSearch={onSearch}
    defaultValue={selected && selected}
    options={data}
  />
);
}
export default Dropdown;