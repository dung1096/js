class Validation {
    constructor() {
        this.checkSpace = (value, selectorErr) => {
            if(value.trim() === "") {
                document.querySelector(selectorErr).innerHTML = "Không được bỏ trống!";
                return false;
            }
            document.querySelector(selectorErr).innerHTML = "";
            return true;
        }
        this.checkNum = (value, selectorErr) => {
            let regexNumber = /^[0-9]+$/;
            if (value.match(regexNumber)) {
                document.querySelector(selectorErr).innerHTML = "";
                return true;
            }
            document.querySelector(selectorErr).innerHTML = "Tất cả phải là số!";
            return false;
        };

        this.checkLength = (value, minLength, maxLength, selectorErr) => {
            if (value.trim().length < minLength || value.trim().length > maxLength) {
                document.querySelector(selectorErr).innerHTML =
                    "Độ dài từ " + minLength + " đến " + maxLength;
                return false;
            }
            document.querySelector(selectorErr).innerHTML = "";
            return true;
        };

        this.checkSelect = (value, selectorErr) => {
            if(value === "0") {
                document.querySelector(selectorErr).innerHTML = "Chọn type";
                return false;
            }
            document.querySelector(selectorErr).innerHTML = "";
            return true;
        }
    }
}