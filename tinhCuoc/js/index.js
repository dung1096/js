/*
    input: loại xe, số km, thời gian chờ 
    process:
        1. km, tg: getElementById().value
        2. loại xe: getElementById().checked
        3. công thức tính tiền:
        UberX(8000,12000,10000,2000)
            <=1km: 8000 + 2000*tg
            <=20km: 8000 + 12000*(km-1) + 2000*tg
            >20km: 8000 + 12000*19 + 10000*(km-20) + 2000*tg
        UberSUV(9000,14000,12000,3000)
        UberBlack(10000,16000,14000,4000)
        4. switch case
            switch(loại xe)
                case: UberX
                    if(km<=1)
                    if(km>1 && km<=20)
                    else
                case: UberUV
                ...
    output: tiền
*/

const checkedType = () => {
    let uberXChecked = document.getElementById("uberX").checked;
    let uberSUVChecked = document.getElementById("uberSUV").checked;
    let uberBlackChecked = document.getElementById("uberBlack").checked;
    if (uberXChecked) {
        return "uberX";
    }
    if (uberSUVChecked) {
        return "uberSUV";
    }
    if (uberBlackChecked) {
        return "uberBlack";
    }
}

const validation = (km, waitingTime, uberType) => {
    if (!km) {
        alert("Vui lòng nhập số km!")
    }
    if (!waitingTime) {
        alert("Vui lòng nhập thời gian chờ!")
    }
    if (!uberType) {
        alert("Vui lòng chọn loại xe!")
    }
}

//Tính tổng tiền
const calcTotal = (km, waitingTime, firstLevelPrice,
    secondLevelPrice,
    thirdLevelPrice,
    waitingPrice) => {
    if (km <= 1)
        console.log((total = firstLevelPrice + waitingTime * waitingPrice));
    else if (km > 1 && km <= 20)
        console.log(
            (total =
                firstLevelPrice +
                secondLevelPrice * (km - 1) +
                waitingTime * waitingPrice)
        );
    else
        console.log(
            (total =
                firstLevelPrice +
                secondLevelPrice * 19 +
                thirdLevelPrice * (km - 20) +
                waitingTime * waitingPrice)
        );
    //show thành tiền
    document.getElementById("priceTotal").style.visibility = "initial";
    document.getElementById("priceTotal").style.color = "red";

    //hien thi gia tri total trong the span
    document.getElementById("price").innerHTML = total + " VND";
}

const main = () => {
    let km = parseInt(document.getElementById("km").value);
    let waitingTime = parseInt(document.getElementById("waitingTime").value);
    let uberType = checkedType();
    validation(km, waitingTime, uberType);
    console.log(km, waitingTime, uberType);
    switch (uberType) {
        case "uberX":
            calcTotal(km, waitingTime, 8000, 12000, 10000, 2000);
            break;
        case "uberSUV":
            calcTotal(km, waitingTime, 9000, 14000, 12000, 3000);
            break;
        case "uberBlack":
            calcTotal(km, waitingTime, 10000, 16000, 14000, 4000);
            break;
        default:
            ;
    }
}