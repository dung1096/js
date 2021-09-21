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
            <button class="btn btn-danger" onClick="handleDelete('${product.id}')">Delete</button>
            <button class="btn btn-info" onClick="handleSelect('${product.id}')">Update</button>
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
    renderProduct(list);
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
    renderProduct(list);
}

//Xử lý sắp xếp
const handleSort = (list) => {
    document.addEventListener("change", () => {
        if (document.getElementById("selectSort").value === "1") {
            increaseSort(list);
        } else if (document.getElementById("selectSort").value === "2") {
            decreaseSort(list);
        }
    })
}

//Lọc
const handleFilter = (list) => {
    document.addEventListener("change", () => {
        let content = document.getElementById("selectFilter");
        let newArray = new Array();
        let key = content.options[content.selectedIndex].text;
        if (content.value === "0") {
            return;
        }
        for (let product of list) {
            if (product.type.toLowerCase() === key.toLowerCase()) {
                newArray.push(product);
            }
        }
        renderProduct(newArray);
    })
}
//--------------------------------------------
//Thêm

const handleAdd = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const img = document.getElementById("img").value;
    // const img = document.getElementById("img").onloadeddata;
    const desc = document.getElementById("desc").value;
    const price = document.getElementById("price").value;
    const screen = document.getElementById("screen").value;
    const backCamera = document.getElementById("backCamera").value;
    const frontCamera = document.getElementById("frontCamera").value;
    const type = document.getElementById("type").options[document.getElementById("type").selectedIndex].text;

    const newProduct = new Product(
        id,
        name,
        img,
        desc,
        price,
        screen,
        backCamera,
        frontCamera,
        type
    );

    let validation = new Validation();
    let valid =
        validation.checkSpace(id, ".idError") &&
        validation.checkNum(id, ".id-numError") &&
        validation.checkLength(id, 2, 6, ".id-lengthError") &&
        validation.checkSpace(name, ".nameError") &&
        validation.checkSpace(price, ".priceError") && 
        validation.checkNum(price, ".price-numError") &&
        validation.checkSelect(document.getElementById("type").value, ".typeError");
    if (!valid) {
        return;
    }

    axios({
        url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
        method: "POST",
        data: newProduct,
    }).then((res)=>{
        console.log(res);
        fetchProduct();
    }).catch((err)=>{
        console.log(err);
    })
}

//Xóa
const handleDelete = (id) => {
    axios({
        url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
        method: "DELETE",
    }).then((res)=>{
        console.log(res);
        fetchProduct();
    }).catch((err)=>{
        console.log(err);
    })
}

//Cập nhật
const handleSelect = (id) => {
    axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
    method: "GET",
    }).then((res)=>{
        console.log(res);
        showProduct(res.data);
    }).catch((err)=>{
        console.log(err);
    })

    showProduct = (product) => {
        document.getElementById("id").value = product.id;
        document.getElementById("name").value = product.name;
        document.getElementById("img").value = product.img;
        document.getElementById("desc").value = product.desc;
        document.getElementById("price").value = product.price;
        document.getElementById("screen").value = product.screen;
        document.getElementById("backCamera").value = product.backCamera;
        document.getElementById("frontCamera").value = product.frontCamera;

        //disable id
        document.getElementById("id").setAttribute("disabled", true);
        document.getElementById("id").classList.add("disabled");
        document.getElementById("id").style.opacity = "0.5";
        
        //show update button
        document.getElementById("btnAdd").style.display = "none";
        document.getElementById("btnUpdate").style.display = "block";
        document.getElementById("btnReset").style.display = "none";
    }
}

const handleUpdate = () => {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const img = document.getElementById("img").value;
    // const img = document.getElementById("img").onloadeddata;
    const desc = document.getElementById("desc").value;
    const price = document.getElementById("price").value;
    const screen = document.getElementById("screen").value;
    const backCamera = document.getElementById("backCamera").value;
    const frontCamera = document.getElementById("frontCamera").value;
    const type = document.getElementById("type").options[document.getElementById("type").selectedIndex].text;

    const updatedProduct = new Product(
        id,
        name,
        img,
        desc,
        price,
        screen,
        backCamera,
        frontCamera,
        type
    );
    axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
    method: "PUT",
    data: updatedProduct,
    }).then((res)=>{
        console.log(res);
        fetchProduct();
    }).catch((err)=>{
        console.log(err);
    })

    //trigger reset button
    document.getElementById("btnReset").click();
}

fetchProduct();