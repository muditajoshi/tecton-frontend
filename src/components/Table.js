import React from "react";
// import "../css/table.css"
import { Table, Button } from "react-bootstrap";
import line3 from "../images/newshop/line3.png";
import line11 from "../images/newshop/line11.png";
import greencross from "../images/newshop/greencross.png";
import greentick from "../images/newshop/greentick.png";
import redcross from "../images/newshop/redcross.png";
import redtick from "../images/newshop/redtick.png";
import vsicon from "../images/newshop/vsicon.png";

import "../css/table.css";
function OptamizeTable() {
  return (
    <div className="main_div">
      <table className="main_table">
        <thead>
          <tr>
            <th></th>
            <th className="all_middle_col_style top_border normal_top_border middle_head_style table_head">
              TECTON’S <br />
              KETONES
            </th>
            <th className="third_sec_head table_head ">
              CARBS/
              <br />
              GLUCOSE
            </th>
          </tr>
        </thead>
        <tbody className="table_body">
          <tr className="table_row ">
            <td className="all_starting--col first_row_styling ">
              <div className="left_col_for_align_text">
                Energy created <br/>per molecule
              </div>
            </td>
            <td className="all_middle_col_style for_both_progress_bar">
              {" "}
              <div className="progress-bar1">
                <div className="progress-fill1" style={{ width: "91%" }}></div>
              </div>
            </td>
            <td className="for_both_progress_bar">
              <div className="progress-bar2">
                <div className="progress-fill2" style={{ width: "31%" }}></div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="all_starting--col">
              <div className="toggle_desktop left_col_for_align_text ">
                Energy (ATP) used <br/> to convert into  <br/>cellular energy
              </div>
              <div className="left_col_for_align_text toggle_mobile">
                Energy used to convert into cellular energy
              </div>
            </td>
            <td className="all_middle_col_style middle_sec_text">
              <div >ZERO ATP</div>
            </td>
            <td className="third_sec_text zero_and_4_ATP">4 ATP</td>
          </tr>
          <tr>
            <td className="all_starting--col">
              <div className="left_col_for_align_text">
                Unused calories <br/>from consumption
              </div>
            </td>
            <td className="all_middle_col_style middle_sec_text parent_vs">
              <div className="middle_col_for_align_text">
                KETONES UTILIZED OR  <br/>BODY EXCRETED
              </div>

              <span className="vs">
                <img className="iconstablevs" src={vsicon} />
              </span>
            </td>
            <td className="third_sec_text">
              <div className="right_col_for_align_text">
                CONVERT TO FAT <br/> IN THE BODY
              </div>
            </td>
          </tr>
          <tr>
            <td className="all_starting--col">
              <div className="left_col_for_align_text">
                By-Products of <br/>Energy Metabolism
              </div>
            </td>
            <td className="all_middle_col_style middle_sec_text">
              <div className="middle_col_for_align_text toggle_desktop">
                HARNESSING ENERGY <br/> TO ITS PUREST FORM
              </div>
              <div className="toggle_mobile">NO NASTY BY-PRODUCTS</div>
            </td>
            <td className="third_sec_text">
              <div className="right_col_for_align_text">
                LACTIC ACID, RANDOM <br/>OXIDATIVE SPECIES
              </div>
            </td>
          </tr>
          <tr>
            <td className="all_starting--col">
              <div className="left_col_for_align_text">
                Number of steps  <br/>to Metabolize
              </div>
            </td>
            <td className="all_middle_col_style ">
              <div className="middle_sec_text">
                <img src={line3} className="line3_img" />
              </div>
            </td>
            <td>
              <div>
                <img src={line11} className="line11_img" />
              </div>
            </td>
          </tr>
          <tr>
            <td className="all_starting--col">
              <div className="left_col_for_align_text">
                Appetite  <br/> Suppression
              </div>
            </td>
            <td className="all_middle_col_style ">
              <div className=" middle_sec_text">
                <img className="iconstable" src={greentick} />
              </div>
            </td>
            <td>
              <div className=" middle_sec_text">
                <img className="iconstable" src={redcross} />
              </div>
            </td>
          </tr>
          <tr>
            <td className="all_starting--col">
              <div className="left_col_for_align_text">
                Lactic Acid <br/> Production
              </div>
            </td>
            <td className="all_middle_col_style lower_border">
              <div className=" middle_sec_text">
                <img className="iconstable" src={greencross} />
              </div>
            </td>
            <td>
              <div className=" middle_sec_text">
                <img className="iconstable" src={redtick} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default OptamizeTable;
