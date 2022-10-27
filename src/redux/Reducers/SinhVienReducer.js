const stateDefault = {
    isSignUp: true,
    dsSinhVien: [
        {
            maSV: "1",
            hoTen: "Ngô Văn Quân",
            soDienThoai: "0888498092",
            email: "vq.2509.2003@gmail.com"

        }
    ],
    sinhVienUpdate: ""
}
export const SinhVienReducer = (state = stateDefault, action) => {
    const { type, payload } = action;
    let timViTriSinhVien = () => {
        let index = -1;
        let dsSinhVien = [...state.dsSinhVien];
        dsSinhVien.forEach((sv, i) => {
            if (sv.maSV == payload) {
                index = i;
            }
        })
        return index;
    }
    switch (type) {
        case "THEM_SINH_VIEN": {
            const dsSinhVien = [...state.dsSinhVien];
            //kiểm tra tài khoản trùng nhau
            const sinhVienNew = dsSinhVien.find(sinhVien => sinhVien.maSV == payload.sinhVien.maSV);
            if (sinhVienNew)
                alert("tài khoản đã tồn tại !");
            else
                dsSinhVien.push(payload.sinhVien);

            return { ...state, dsSinhVien };
        }
        case "XOA_SINH_VIEN": {
            let dsSinhVien = [...state.dsSinhVien];

            dsSinhVien = dsSinhVien.filter(sinhVien => sinhVien.maSV != payload);

            return { ...state, dsSinhVien };
        }
        case "LAY_SINH_VIEN": {
            let dsSinhVien = [...state.dsSinhVien];
            let sinhVienTam = dsSinhVien.find(sinhVien => sinhVien.maSV == payload);
            return { ...state, sinhVienUpdate: sinhVienTam, isSignUp: false };
        }
        case "CAP_NHAT_SINH_VIEN": {
            let dsSinhVien = [...state.dsSinhVien];
            let sinhVienTam = dsSinhVien.find(sinhVien => sinhVien.maSV)
            // console.log(sinhVienTam.maSV);
            let index = timViTriSinhVien(sinhVienTam.maSV)
            if (index !== -1) {
                dsSinhVien[index] = sinhVienTam
            }
            return { ...state, dsSinhVien, isSignUp: true, sinhVienUpdate: "" };
        }
        // case "TIM_KIEM_SINH_VIEN": {
        //     // const val = evt.target.value.toLowerCase();
        //     let dsHocSinhTimKiem = [];
        //     // console.log(this.props.dsSinhVien.map((sinhVien) => sinhVien.hoTen));
        //     let sinhVien = this.props.dsSinhVien.map((sinhVien) => sinhVien.hoTen);
        //     let sinhVienNew = sinhVien[0].toLowerCase();
        //     if (val == sinhVienNew) {
        //         dsHocSinhTimKiem.push(sinhVien);
        //     }
        //     console.log(dsHocSinhTimKiem);
        //     return { ...state, dsSinhVienNew }
        // }
        default:
            return { ...state };
    }
}