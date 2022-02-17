const inputbox = document.getElementById("inputvalue")
const addbtn = document.getElementById("addbtn")
const item_list = document.getElementById("item_list")
const clearbtn = document.getElementById("clearbtn")
// 如果"new todo"裡面沒資料就給一個空陣列 有資料就存進陣列裡
let listArray = JSON.parse(localStorage.getItem("new todo")) || []

//  增加函式
function AddItem() {

    //  抓取使用者在input上輸入的值
    const inputvalue = inputbox.value
    
    //  檢查是否為空值 如果空值 則直接返回
    if (inputvalue.trim() == 0) return
 
    // 設一個物件(item)裡放輸入的字和有無做完的狀態done
    const item = {
        inputvalue,
        done: false
    }

    //  從陣列前面開始加物件(item)進去
    listArray.unshift(item)

    ShowItem(listArray, item_list)
    //  把陣列裡的存放到localstorage "new todo" 裡面
    localStorage.setItem("new todo", JSON.stringify(listArray))
    // 輸入完 清空輸入的地方
    inputbox.value = ""
}

// 把值放入HTML裡 利用參數(事項陣列, 要把鎮列印出來的地方(ul(父節點))) 秀出函式
function ShowItem(itemarray = [], showitem) {
    // 利用map(key).join('')跑陣列 
    // 利用 data-index=${index} index參數用來抓取陣列位置 
    // ${element.done ? 'checked' : ''} 用來儲存事項是否做完的狀態
    showitem.innerHTML = itemarray.map((element, index) => {
        return `
        <li>
            <input type="checkbox" name="things" id="item${index}" data-index=${index} ${element.done ? 'checked' : ''}>
            <label for="item${index}">${element.inputvalue}</label>
            <button id="closebtn" class="closebtn" data-index=${index}>X</button>
        </li>
    `
    }).join('') 
}

// checkbox確認狀態和刪除函式 index抓位置
function toggleDone(e) {
    // 設一個變數 利用boolean值 來判斷事情有無做到 做到則ture 
    let save = false
    const key = e.target
    // data-index=""抓位置
    const index = key.dataset.index

    if(e.target.matches('input')) {
        // 利用true or false轉換狀態
        listArray[index].done = !listArray[index].done
        // 做完 save 就轉為true
        save = true
    }

    if(e.target.matches('button')) {
        // 利用splice(位置, 幾個)作刪除動作
        listArray.splice(index, 1)
        save = true
    }

    // 做到後則存進"new todo" 再秀出來
    if(save) {
        localStorage.setItem("new todo", JSON.stringify(listArray))
        ShowItem(listArray, item_list)
    }
}
    
//  按鈕增加資料
addbtn.addEventListener('click', AddItem)

//  enter增加資料
inputvalue.addEventListener('keypress', function (e) {
    //  enter對應鍵盤代碼
    if(e.which === 13) {
        AddItem()
    }
})

// checkbox按鈕狀態轉換 以及刪除動作
item_list.addEventListener('click', toggleDone)

//  清除全部item
clearbtn.addEventListener('click', function() {
    listArray = []
    localStorage.setItem("new todo", JSON.stringify(listArray))
    ShowItem(listArray, item_list)
})

//  秀出localstorage "new todo" 裡的資料
ShowItem(listArray, item_list)