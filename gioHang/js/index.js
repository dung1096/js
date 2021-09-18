//Lấy dssp
const fetchProduct = () => {
    axios({
        url:"https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
        method:"GET",
    }).then((res) => {
        console.log(res);
        renderProduct(res.data);
        handleSort(res.data);
        handleFilter(res.data);
    }).catch((err) => {
        console.log(err);
    })
}

//hiển thị dssp
const renderProduct = (data) => {
    let content = "";
    data.map((product, index) => {
        return content += (`
        <div class="col-4 p-5" key=${index}>
            <img src="${product.img}" class="img-fluid mb-3"/>
            <p>Name: ${product.name}</p>
            <p>Description: ${product.desc}</p>
            <p>Screen: ${product.screen}</p>
            <p>Back Camera: ${product.backCamera}</p>
            <p>Front Camera: ${product.frontCamera}</p>
            <p>Price: ${product.price}</p>
            <p>Type: ${product.type}</p>
            <button class="btn btn-success" onClick="">Add to Cart</button>
        </div>
        `)
    })
    //DOM đến div productList
    document.getElementById("productList").innerHTML = content;
}
//-------------------------------------------------------------------
//Sắp xếp tăng
const increaseSort = (list) => {
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i].name > list[j].name) {
                let temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    }
}

//Sắp xếp giảm
const decreaseSort = (list) => {
    for (let i = 0; i < list.length - 1; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i].name < list[j].name) {
                let temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }
    }
}

//Xử lý sắp xếp
const handleSort = (list) => {
    document.addEventListener("change", () => {
        if (document.getElementById("selectSort").value === "1") {
            increaseSort(list);
            renderProduct(list);
        } else if (document.getElementById("selectSort").value === "2") {
            decreaseSort(list);
            renderProduct(list);
        }
    })
}

//Lọc
const handleFilter = (list) => {
    document.addEventListener("change", () => {
        let content = document.getElementById("selectFilter");
       if (content.value === 0) {
           return;
       }

       let key = content.options[content.selectedIndex].text;
       let newArray = new Array();
       for (let product of list) {
           if (product.type.toLowerCase() === key.toLowerCase()) {
               newArray.push(product);
           }
       }
       renderProduct(newArray);
    })
}

fetchProduct();
