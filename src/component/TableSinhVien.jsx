import React, { Component } from "react";
import { connect } from "react-redux";

class TableSinhVien extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 p-2 bg-dark">
          <span className="text-white font-bold">Danh sách</span>
        </div>
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th>Tài khoản</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.dsSinhVien.map((sinhVien, index) => {
                return (
                  <tr key={index}>
                    <td>{sinhVien.maSV}</td>
                    <td>{sinhVien.hoTen}</td>
                    <td>{sinhVien.email}</td>
                    <td>{sinhVien.soDienThoai}</td>
                    <td>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() =>
                          this.props.dispatch({
                            type: "LAY_SINH_VIEN",
                            payload: sinhVien.maSV,
                          })
                        }
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          this.props.dispatch({
                            type: "XOA_SINH_VIEN",
                            payload: sinhVien.maSV,
                          })
                        }
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dsSinhVien: state.SinhVienReducer.dsSinhVien,
  };
};

export default connect(mapStateToProps, null)(TableSinhVien);
