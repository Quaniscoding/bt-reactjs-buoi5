import React, { Component } from "react";
import FormThongTin from "./FormThongTin";
import TableSinhVien from "./TableSinhVien";

export default class QuanLySinhVien extends Component {
  render() {
    return (
      <div>
        <FormThongTin />
        <TableSinhVien />
      </div>
    );
  }
}
