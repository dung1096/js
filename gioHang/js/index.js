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
            <button class="btn btn-success" onClick="fetchCart('${product.id}')">Add to Cart</button>
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
//--------------------------------------------------
//Show giỏ hàng
let cartList = new Array();
const fetchCart = (id) => {
    axios({
        url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
        method: "GET",
    }).then((res) => {
        console.log(res);
        pushCart(id, res.data)
    }).catch((err) => {
        console.log(err);
    });
}

//Kiểm tra cart
const checkCart = (id) => {
    for (let product of cartList) {
      //Nếu đã có thì tăng số lượng
      if (product.id === id) {
        return product.quantity++;
      }
    }
    return false;
}
//Thêm vào cart
const pushCart = (id, products) => {
    products.map((product) => {
        let pdCart = new Cart(product);
        if(pdCart.id===id) {
            console.log(pdCart.id,id);
            if(!checkCart(pdCart.id) || cartList.length === 0){
               cartList.push(pdCart);
            }
        } 
        return;
    })
    renderCart(cartList);
    //Gọi hàm lưu dữ liệu vào local
    saveDataToLocal();
}

//-----------------------------------------------------
//Tăng số lượng
const incNumber = (id) => {
  for (let product of cartList) {
    if (product.id === id) {
      product.quantity++;
    }
  }
  renderCart(cartList);
  saveDataToLocal();
};

//Giảm số lượng
const decNumber = (id) => {
  for (let product of cartList) {
    if (product.id === id && product.quantity !== 1) {
      product.quantity--;
    }
  }
  renderCart(cartList);
  saveDataToLocal();
};


//--------------------------------------------------
//Show giỏ hàng
const renderCart = (cartList) => {
    let content = "";
    let total = 0;

    cartList.map((product) => {
        let sum = product.price * product.quantity;
        total += sum;
        return content += `
        <tr>
            <td>
                <img src="${product.img}" class="img-fluid"/>
            </td>

            <td><p>${product.name}</p></td> 

            <td><p>${product.price}</p></td>

            <td>
                <button class="btn btn-info btn-dec" onclick="decNumber('${product.id}')">-</button>
                <span>${product.quantity}</span>
                <button class="btn btn-info btn-inc" onclick="incNumber('${product.id}')">+</button>
            </td>

            <td>
              <p>${sum}</p>
            </td>

            <td>
               <button class="btn btn-success" onclick="handleDeleteCart('${product.id}')">Xóa</button>
            </td>
        </tr>       
         `;
    })

    //DOM 
    document.getElementById("cart").innerHTML = content;
    //Hiện tổng tiền
    document.getElementById("total").innerHTML = total;
};

//------------------------------------------
//Xóa sản phẩm ra khỏi giỏ hàng
const handleDeleteCart = (id) => {
    for (let i in cartList) {
        if (cartList[i].id === id) {
        cartList.splice(i, 1);
        }
    }
  renderCart(cartList);
  saveDataToLocal();
};

//--------------------------------------------------
//Lưu data vào bộ nhớ local storage của trình duyệt(chỉ được lưu chuỗi)
const saveDataToLocal = () => {
  localStorage.setItem("cartData", JSON.stringify(cartList));
};

//Lấy data từ bộ nhớ local storage của trình duyệt
const getDataFormLocal = () => {
  const cartListFormLocal = localStorage.getItem("cartData");
  if (cartListFormLocal) {
    cartList = JSON.parse(cartListFormLocal);
    renderCart(cartList);
  }
};

fetchProduct();
getDataFormLocal();
