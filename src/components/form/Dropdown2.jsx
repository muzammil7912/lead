import { Select } from 'antd';

const Dropdown2 = ({list,selected,changes}) => {
  const userData = Array.isArray(list) && list.map((item) => ({
    label: item?.Field ? (item?.Field.charAt(0).toUpperCase() + item.Field.slice(1)).replaceAll("_", " ") : (item?.name_slug.charAt(0).toUpperCase() + item.name_slug.slice(1)).replaceAll("_", " ") ,
    value: item?.Field ?? item?.name_slug,
    type:item.Type?item.Type:item.type,
  }));
    const onChange = (value,obj,v) => {
        changes(value,obj)
      };
      const onSearch = (value) => {
    };
    return (
 
  <Select
  showSearch
  placeholder={"Search"}
  style={{ width: "100%" ,height:'40px'}}
  onChange={onChange}
  onSearch={onSearch}
  defaultValue={selected && selected}
  options={userData}
  >

  </Select>
     )
};
export default Dropdown2;