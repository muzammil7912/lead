import React, { useState, useEffect } from "react";

const NestedRow = ({ item, level, getNestedData }) => {
  const [expanded, setExpanded] = useState(false);
  const [nestedData, setNestedData] = useState([]);

  useEffect(() => {
    if (expanded) {
      getNestedData(item.cat_id).then((data) => setNestedData(data));
    }
  }, [expanded]);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <tr>
        <td className="width45">
          <i className="fa fa-folder"></i>
        </td>
        <td style={{ paddingLeft: level * 20 }}>
          <span className="folder-name">
            <a onClick={handleExpand} className="file-cat" data-filelead="1" data-file="1">
              {item.cat_name}
            </a>
          </span>
        </td>
        {/* Add other columns as needed */}
      </tr>
      {expanded &&
        nestedData.map((nestedItem) => (
          <NestedRow
            key={nestedItem.cat_id}
            item={nestedItem}
            level={level + 1}
            getNestedData={getNestedData}
          />
        ))}
    </>
  );
};
export default NestedRow
