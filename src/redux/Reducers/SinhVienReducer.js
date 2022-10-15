const stateDefault = {
    isSignUp: true,
    dsSinhVien: [],
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

            return { ...state, dsSinhVien, isSignUp: true };
        }
        default:
            return { ...state };
    }
}