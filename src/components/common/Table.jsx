import React from "react";
import { Link } from "react-router-dom";

function Table({ tableH, tableB, deleteite }) {
  const handleDelete = (item) => {
    deleteite(item);
  };
  return (
    <div className="table-responsive">
      <table className="table table-hover js-basic-example dataTable table_custom border-style spacing5 td-align-middle">
        <thead>
          <tr>
            {tableH.map((item, index) => {
              return <td key={index}>{item.label}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {tableB.map((item) => {
            console.log(item);
            return (
              <tr key={item.id}>
                <td>
                  <img src="" className="rounded img-fluid" width="45" />
                  <span className="c_name">{item?.f_name}</span>
                </td>
                <td>
                  <span>{item?.email}</span>
                </td>
                <td>
                  <span>Organization</span>
                  <div>
                    <small>
                      {item?.f_name} {item?.l_name}
                    </small>
                  </div>
                </td>
                <td>
                  <span>
                    {item?.f_name} {item?.l_name}
                  </span>
                </td>
                <td>
                  <span>
                    <i className="fa fa-map-envelope"></i>
                    {item.userstatus && item.userstatus == 1
                      ? "Active"
                      : "NonActive"}
                  </span>
                </td>
                <td>
                  {item.id != 1 && (
                    <div className="d-flex gap-1 align-item-center">
                      <Link
                        to={`/user/edit/${item.id}`}
                        className="btn btn-primary btn-sm"
                        title="Edit"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                      <a
                        href="./signature/glauco"
                        className="btn btn-outline-secondary btn-sm"
                        title="View Signature"
                        target="_blank"
                      >
                        <i className="fa fa-vcard"></i>
                      </a>
                      <button
                        data-id={item.id}
                        onClick={(item) => handleDelete(item)}
                        className="btn btn-danger btn-sm btn-smd"
                        title="Delete"
                      >
                        <i className="fa fa-trash-o"></i>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
