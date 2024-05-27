import { Select } from 'antd';
const Dropdown4 = ({list,selected,changes}) => {
 let userData = list.map((item) => ({
    label: (item.search_text),
    value: `${item.search_id}___${item.search_query}___${item.search_text}`
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
  style={{ width: "200px"}}
  onChange={onChange}
  onSearch={onSearch}
  value={selected && selected}
  options={userData}
  >
  </Select>
     )
};
export default Dropdown4;