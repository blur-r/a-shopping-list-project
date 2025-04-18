const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById("filter")
const formBtn = itemForm.querySelector("button")
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage()
  itemsFromStorage.forEach((item) => 
    addItemToDom(item))
  checkUI()
  
}

function onAddItemSubmit(e) {
 e.preventDefault();
 const newItem = itemInput.value;

//  validation 
 if(newItem === '') {
   alert('Add an item');
   return
 } 

 if(isEditMode) {
  const itemsToEdit = itemList.querySelector(".edit-mode")
  removeItemFromStorage(itemsToEdit.textContent)
  itemsToEdit.classList.remove("edit-mode")
  itemsToEdit.remove()
  isEditMode = false
 } else{
  if(checkIfItemExists(newItem)) {
    alert("Item already exists")
    return
  }
 }

addItemToDom(newItem)

addItemToStorage(newItem)

checkUI()



itemInput.value = ""
}

function addItemToDom(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red")
  li.appendChild(button);
  itemList.appendChild(li)
}

function addItemToStorage(item) {
  let itemsFromStorage = getItemsFromStorage()
 
  itemsFromStorage.push(item)

  localStorage.setItem('items', JSON.stringify(itemsFromStorage))

}

function getItemsFromStorage() {
  if(localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }
  return itemsFromStorage
}




// create button 
function createButton(classes) {
const button = document.createElement("button")
button.className = classes
const icon = createIcon("fa-solid fa-xmark")
button.appendChild(icon)
return button

}

// create icon
function createIcon(classes) {
    const icon = document.createElement("i")
    icon.className = classes
    return icon 


}

function onClickItem(e) {
  if(e.target.parentElement.classList.contains("remove-item")) {
    removeItem( e.target.parentElement.parentElement)
  } else {
    setItemsToEdit(e.target)
  }

}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage()
 return itemsFromStorage.includes(item)
}

function setItemsToEdit(item) { 
  isEditMode = true
  item.classList.add("edit-mode")
  formBtn.innerHTML = `<i class = "fa-solid fa-pen" ></i> Update item`
  itemInput.value = item.textContent
}


// function to remove items

function removeItem(item) {
  if(confirm("Are you sure?")) {
    item.remove()
    removeItemFromStorage(item.textContent)
    checkUI()

  }
}

function removeItemFromStorage(item){
  let itemsFromStorage = getItemsFromStorage()
  itemsFromStorage = itemsFromStorage.filter((i)=>i !== item)
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}
// function to clear list
function clearList() {
  while(itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }
  localStorage.removeItem('items')
checkUI()

}

// function to filter items
function filterItems(e) {
  const items = document.querySelectorAll("li") 
  const text = e.target.value.toLowerCase() 
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase()
    if(itemName.indexOf(text) !== -1) {
      item.style.display = "flex"
    } else {
      item.style.display = "none"
    }
  })
}


// function to check if the list is empty
function checkUI() {
  itemInput.value = ""
const items = document.querySelectorAll("li") 
  if(items.length === 0) {
    clearBtn.style.display = "none"
    filter.style.display = "none"
  } else {
    clearBtn.style.display = "block"
    filter.style.display = "block"
  }

  formBtn.innerHTML = `<i class = "fa-solid fa-plus" ></i> Add item`

  isEditMode = false
}
  


// eventListeners

itemForm.addEventListener("submit", onAddItemSubmit)
itemList.addEventListener("click", onClickItem)
clearBtn.addEventListener("click", clearList)
filter.addEventListener("input", filterItems)
document.addEventListener("DOMContentLoaded", displayItems)

checkUI()


