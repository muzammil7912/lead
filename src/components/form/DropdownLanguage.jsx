import { Select ,Avatar} from 'antd';
import config from "../../services/config.json";
let flags =`${config.baseurl}assets/flags/`;

const DropdownLanguage = ({list,selectedVal,defaultval}) => {

    const onChange = (value,option) => {
      selectedVal(value)
    };
    const onSearch = (value) => {
    };
  
    const { Option } = Select;
  
    return (
      <div className="App">
          <Select
          showSearch
            placeholder="Select Language"
            defaultValue={defaultval&&defaultval}
            style={{ width: "100%" ,height:'30px'}}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.children.props.children[2] ?? '').toLowerCase().includes(input.toLowerCase()
              )
            }
            >
            {list && list.map(item => (
              <Option key={item.lang_id} value={item.lang_id} label={item.lang_name}>
                <div>
                <span size="small" style={{height:'20px',width:'20px', borderRadius:'10px'}}>
                    <img src={`${flags}${item.lang_image}`} className="mr-2" alt='img' style={{height:'20px',width:'20px', borderRadius:'10px',}}/>
                  </span>
               
                  {item.lang_name}
                </div>
              </Option>
            ))}
          </Select>
          <br />
          <br />
         
        </div>)
  };

  export default DropdownLanguage;