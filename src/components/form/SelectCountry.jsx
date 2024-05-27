import { Select ,Avatar} from 'antd';
import config from "../../services/config.json";
import isoCountries from '../../Data/country';

// import flags from '../../Assets/images/flags/'




let flags =`${config.baseurl}assets/flags/`;

const SelectSearch = ({selectedVal,defaultval}) => {
    const onChange = (value,option) => {
      selectedVal(option.id)  
    };
    const onSearch = (value) => {
    };
  
    const { Option } = Select;
  
    let  items=isoCountries
  
    return (
      <div className="App">
          <Select
         
          showSearch
            placeholder="Please select store"
            value={defaultval&&defaultval}
            style={{ width: "100%" ,height:'30px'}}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.children.props.children[2] ?? '').toLowerCase().includes(input.toLowerCase()
              )
            }
            >
            {items.map(item => (
              <Option key={item.id} value={item.id}>
                <div>
                <span size="small" style={{height:'20px',width:'20px', borderRadius:'10px'}}>
                    <img src={`${flags}${item.id}`} alt='img' style={{height:'20px',width:'20px', borderRadius:'10px'}}/>
                  </span>
               
                  {item.text}
                </div>
              </Option>
            ))}
          </Select>
          <br />
          <br />
         
        </div>)
  };

  export default SelectSearch;