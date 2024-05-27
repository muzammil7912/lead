import React from "react";
// import {} from "react-icons-fs";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Translation } from "./components/Translation";

export default function Allcustomfield({ translation }) {
  return (
    <div>
      <div className="card">
        <div className="card-header borderblue">
          <h3 className="card-title">
            {Translation(translation, "All Customer Field")}
          </h3>
          <div className="card-options">
            <a
              href="#"
              className="bg-primary p-2 rounded-2 text-white"
              //   style={{
              //     backgroundColor: "blue",
              //     padding: 4,
              //     borderRadius: 4,
              //     color: "white",
              //   }}
            >
              {Translation(translation, "change stage")}
            </a>
            <a
              href="#"
              className="btn-btn-primary btn-sm btn-new"
              data-toggle="tooltip"
              data-placeme
            >
              <FaSearch />
            </a>
            <a href="#">
              <FaPlus />
            </a>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-vcenter table-striped dataTable td-align-middle">
              <thead>
                <tr>
                  <th>{Translation(translation, "Name")}</th>
                  <th>{Translation(translation, "Type")}</th>
                  <th>{Translation(translation, "Level")}</th>
                  <th>{Translation(translation, "Stage")}</th>
                  <th>{Translation(translation, "Module")}</th>
                  <th>{Translation(translation, "Pipeline")}</th>
                  <th>{Translation(translation, "Required")}</th>
                  <th>{Translation(translation, "Action")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="c_name">
                      {Translation(translation, "Qualification")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "text")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "TAB")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Contacted")}{" "}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Lead")}
                    </span>
                  </td>

                  <td></td>

                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "No")}
                    </span>
                  </td>
                  <td>
                    <a
                      href="./edit_customfields.php?id=1"
                      className="btn btn-primary btn-sm mr-1"
                      title="Edit"
                    >
                      <i className="fa fa-edit"></i>
                    </a>

                    <a
                      href="./core/deletecustomfields.php?id=1"
                      className="btn btn-danger btn-sm btn-smd"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="c_name">
                      {Translation(translation, "Source")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "text")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "TAB")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "New")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Lead")}
                    </span>
                  </td>

                  <td></td>

                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "No")}
                    </span>
                  </td>
                  <td>
                    <a
                      href="./edit_customfields.php?id=2"
                      className="btn btn-primary btn-sm mr-1"
                      title="Edit"
                    >
                      <i className="fa fa-edit"></i>
                    </a>

                    <a
                      href="./core/deletecustomfields.php?id=2"
                      className="btn btn-danger btn-sm btn-smd"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="c_name">
                      {Translation(translation, "Contact")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "text")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "TAB")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Contacted")}{" "}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Lead")}
                    </span>
                  </td>

                  <td></td>

                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "No")}
                    </span>
                  </td>
                  <td>
                    <a
                      href="./edit_customfields.php?id=3"
                      className="btn btn-primary btn-sm mr-1"
                      title="Edit"
                    >
                      <i className="fa fa-edit"></i>
                    </a>

                    <a
                      href="./core/deletecustomfields.php?id=3"
                      className="btn btn-danger btn-sm btn-smd"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="c_name">
                      {Translation(translation, "Real Estate")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "text")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "TAB")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Qualified")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Lead")}
                    </span>
                  </td>

                  <td></td>

                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "No")}
                    </span>
                  </td>
                  <td>
                    <a
                      href="./edit_customfields.php?id=4"
                      className="btn btn-primary btn-sm mr-1"
                      title="Edit"
                    >
                      <i className="fa fa-edit"></i>
                    </a>

                    <a
                      href="./core/deletecustomfields.php?id=4"
                      className="btn btn-danger btn-sm btn-smd"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="c_name">
                      {Translation(translation, "Persona")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "text")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "TAB")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Qualified")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Lead")}
                    </span>
                  </td>

                  <td></td>

                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "No")}
                    </span>
                  </td>
                  <td>
                    <a
                      href="./edit_customfields.php?id=6"
                      className="btn btn-primary btn-sm mr-1"
                      title="Edit"
                    >
                      <i className="fa fa-edit"></i>
                    </a>

                    <a
                      href="./core/deletecustomfields.php?id=6"
                      className="btn btn-danger btn-sm btn-smd"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="c_name">
                      {Translation(translation, "Properties")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "text")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "TAB")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Qualified")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Lead")}
                    </span>
                  </td>

                  <td></td>

                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "No")}
                    </span>
                  </td>
                  <td>
                    <a
                      href="./edit_customfields.php?id=7"
                      className="btn btn-primary btn-sm mr-1"
                      title="Edit"
                    >
                      <i className="fa fa-edit"></i>
                    </a>

                    <a
                      href="./core/deletecustomfields.php?id=7"
                      className="btn btn-danger btn-sm btn-smd"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="c_name">
                      {Translation(translation, "Qualification")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "text")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Group")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Contacted")}{" "}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Lead")}
                    </span>
                  </td>

                  <td></td>

                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "No")}
                    </span>
                  </td>
                  <td>
                    <a
                      href="./edit_customfields.php?id=8"
                      className="btn btn-primary btn-sm mr-1"
                      title="Edit"
                    >
                      <i className="fa fa-edit"></i>
                    </a>

                    <a
                      href="./core/deletecustomfields.php?id=8"
                      className="btn btn-danger btn-sm btn-smd"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="c_name">
                      {Translation(translation, "Business Unit")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "text")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Group")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "New")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Lead")}
                    </span>
                  </td>

                  <td></td>

                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "No")}
                    </span>
                  </td>
                  <td>
                    <a
                      href="./edit_customfields.php?id=9"
                      className="btn btn-primary btn-sm mr-1"
                      title="Edit"
                    >
                      <i className="fa fa-edit"></i>
                    </a>

                    <a
                      href="./core/deletecustomfields.php?id=9"
                      className="btn btn-danger btn-sm btn-smd"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="c_name">
                      {Translation(translation, "Campaign")} &amp;{" "}
                      {Translation(translation, "Source")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "text")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Group")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "New")}
                    </span>
                  </td>
                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "Lead")}
                    </span>
                  </td>

                  <td></td>

                  <td>
                    <span>
                      <i className="fa fa-map-envelope"></i>
                      {Translation(translation, "No")}
                    </span>
                  </td>
                  <td>
                    <a
                      href="./edit_customfields.php?id=10"
                      className="btn btn-primary btn-sm mr-1"
                      title="Edit"
                    >
                      <i className="fa fa-edit"></i>
                    </a>

                    <a
                      href="./core/deletecustomfields.php?id=10"
                      className="btn btn-danger btn-sm btn-smd"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
