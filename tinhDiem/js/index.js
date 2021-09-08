//   @input maSV tenSV, loaiSV, diemToan, diemLy, diemHoa, diemRenluyen
//   @process
//   1. Lấy dữ liệu từ các ô input
//   2. Bắt sự kiện
//   3. Tạo object để lưu các thuộc tính,phương thức
//   1. Lấy thông tin từ object hiển thỉ màn hình
//   @output object sv

const render = () => {
    let id = document.getElementById("txtID").value;
    let name = document.getElementById("txtName").value;
    let type = document.getElementById("txtType").value;
    let math = document.getElementById("txtMath").value;
    let physic = document.getElementById("txtPhysic").value;
    let chemistry = document.getElementById("txtChemistry").value;

    let student = {
        id: id,
        name: name,
        type: type,
        math: +math,
        physic: +physic,
        chemistry: +chemistry,
        average: function() {
            return (this.math + this.physic + this.chemistry) / 3;
        },
        rank: function() {
            if (this.average() >= 8) {
                return "Giỏi";
            }
            if (this.average() >= 6) {
                return "Khá";
            }
            if (this.average() >= 4) {
                return "Trung bình";
            }
            if (this.average() >= 2) {
                return "Yếu";
            } else {
                return "Kém";
            }
        },
    }

    document.getElementById("tableContent").innerHTML = `
    <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.type}</td>
        <td>${student.average()}</td>
        <td>${student.rank()}</td>
    </tr>`
}