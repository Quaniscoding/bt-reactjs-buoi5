import React, { Component } from "react";
import { connect } from "react-redux";

class FormThongTin extends Component {
  state = {
    sinhVien: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
    error: {
      maSV: "",
      hoTen: "",
      soDienThoai: "",
      email: "",
    },
  };

  static getDerivedStateFromProps(newProps, currentState) {
    if (
      newProps.sinhVienUpdate != "" &&
      newProps.sinhVienUpdate.maSV != currentState.sinhVien.maSV
    )
      return { ...currentState, sinhVien: newProps.sinhVienUpdate }; //this.setState({})
  }
  reset() {
    // Always set the initial state in its own function, so that
    // you can trivially reset your components at any point.
    this.state = {
      inputValue: "",
    };
  }
  changeValue = (event) => {
    const { sinhVien, error } = this.state;
    const { value, name, title } = event.target;
    //kiểm tra validation
    // kiểm tra rỗng
    if (value == "") {
      error[name] = `${title} không được rỗng !`;
    } else {
      error[name] = "";
    }

    const dataType = event.target.getAttribute("data-type");
    // xử lý validation theo trường hợp đặc biệt
    if (dataType == "email") {
      let regexEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (regexEmail.test(value) == false) {
        error[name] = `${title} không đúng định dạng !`;
      } else {
        error[name] = "";
      }
    }
    if (dataType == "number") {
      let regetNumber = /^[0-9]+$/;
      if (regetNumber.test(value) == false) {
        error[name] = `Không nhập chữ và để trống`;
      }
      if (value.length > 10) {
        error[name] = `Không nhập quá 10 kí tự`;
      }
    }
    if (dataType == "maSV") {
      let regetNumber = /^[0-9]+$/;
      if (regetNumber.test(value) == false) {
        error[name] = `Không nhập chữ và không để trống`;
      }
      if (value.length > 4) {
        error[name] = `Không nhập quá 4 kí tự`;
      }
    }
    if (dataType == "hoTen") {
      let regetNumber = /^[0-9]+$/;
      if (regetNumber.test(value) == true) {
        error[name] = `không nhập số`;
      }
    }
    sinhVien[name] = value;
    this.setState({
      sinhVien,
      error,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let { maSV, hoTen, email, soDienThoai } = this.state.sinhVien;
    let maSVErr = this.state.error.maSV;
    let hoTenErr = this.state.error.hoTen;
    let emailErr = this.state.error.email;
    let soDienThoaiErr = this.state.error.soDienThoai;
    if (
      maSV != "" &&
      hoTen != "" &&
      email != "" &&
      soDienThoai != "" &&
      maSVErr == "" &&
      hoTenErr == "" &&
      emailErr == "" &&
      soDienThoaiErr == ""
    ) {
      if (this.props.isSignUp) {
        this.props.dispatch({
          type: "THEM_SINH_VIEN",
          payload: {
            sinhVien: this.state.sinhVien,
          },
        });
      } else {
        this.props.dispatch({
          type: "CAP_NHAT_SINH_VIEN",
          payload: {
            sinhVien: this.state.sinhVien.maSV,
          },
        });
      }
      this.setState({
        sinhVien: {
          maSV: "",
          hoTen: "",
          soDienThoai: "",
          email: "",
        },
      });
    }
  };
  render() {
    const { maSV, hoTen, email, soDienThoai } = this.state.error;
    return (
      <div className="row ">
        <div className="col-12 p-2 bg-dark">
          <span className="text-white font-bold">Form đăng ký</span>
        </div>
        <div className="input-group col-2 pl-5">
          <input
            placeholder="Tìm Kiếm"
            value={this.state.inputValue}
            onChange={(evt) => this.updateInputValue(evt)}
          />
        </div>
        <form className="col-12 row" onSubmit={this.onSubmit}>
          <div className="col-6">
            <label>Mã SV</label>
            <input
              id="maSV"
              data-type="maSV"
              title="Mã SV"
              value={this.state.sinhVien.maSV}
              name="maSV"
              className="form-control"
              onChange={this.changeValue}
            />
            <small className="text-danger">{maSV}</small>
          </div>

          <div className="col-6">
            <label>Họ tên</label>
            <input
              title="Họ tên"
              value={this.state.sinhVien.hoTen}
              name="hoTen"
              data-type="hoTen"
              className="form-control"
              onChange={this.changeValue}
            />
            <small className="text-danger">{hoTen}</small>
          </div>
          <div className="col-6">
            <label>Số điện thoại</label>
            <input
              data-type="number"
              value={this.state.sinhVien.soDienThoai}
              name="soDienThoai"
              className="form-control"
              onChange={this.changeValue}
            />
            <small className="text-danger">{soDienThoai}</small>
          </div>
          <div className="col-6">
            <label>Email</label>
            <input
              title="email"
              value={this.state.sinhVien.email}
              data-type="email"
              name="email"
              className="form-control"
              onChange={this.changeValue}
            />
            <small className="text-danger">{email}</small>
          </div>
          {this.props.isSignUp ? (
            <button className="btn btn-success m-2">Thêm sinh viên</button>
          ) : (
            <button className="btn btn-primary m-2">Cập nhật sinh viên</button>
          )}
        </form>
      </div>
    );
  }
  updateInputValue(evt) {
    // this.setState({
    //   inputValue: val,
    // });
    this.props.dispatch({
      type: "TIM_KIEM_SINH_VIEN",
      payload: "",
    });
  }
}

const mapStateToProps = (state) => {
  return {
    dsSinhVien: state.SinhVienReducer.dsSinhVien,
    sinhVienUpdate: state.SinhVienReducer.sinhVienUpdate,
    isSignUp: state.SinhVienReducer.isSignUp,
  };
};

export default connect(mapStateToProps, null)(FormThongTin);
