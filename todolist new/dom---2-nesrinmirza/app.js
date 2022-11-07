const todoInput = document.getElementById("todo-input-form"); 
const todoOutput = document.getElementById("todo-output");
const todoDeleteAll = document.getElementById("todo-delete-all");

const arr = JSON.parse(localStorage.getItem("arr")) ? JSON.parse(localStorage.getItem("arr")) : [];
console.log(arr)
todoDeleteAll.onclick = () => {
  todoOutput.innerHTML = '';
  localStorage.clear()
}

function textNode(str) {
  return document.createTextNode(str);
}

function createListItem(todoStr, check) {
  let li = document.createElement("li");
  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class","deletebtn")
  let checkBx = document.createElement("input");
  checkBx.setAttribute("class","checkbx")
  checkBx.type = "checkbox";
  checkBx.checked = check
  deleteBtn.innerHTML = "X";
  li.appendChild(textNode(todoStr));
  li.prepend(deleteBtn);
  li.prepend(checkBx);
  // events
  deleteBtn.onclick = () => {
    li.remove();
    
  }


  
  return li;
}

function createListAfterReload(){
  arr.map((item, index)=>{
    let li = createListItem(item.text, item.checked)
    todoOutput.append(li);
  })

  checkeditem()
}

createListAfterReload()

todoInput.addEventListener("submit", function (e) {
  e.preventDefault();
  let input = todoInput.querySelector("input");
  if (input.value === "") {
    return;
  }
  let li = createListItem(input.value, false);
  todoOutput.append(li);
  let obj = {}
  obj.text = input.value
  obj.checked = false
  arr.push(obj)
  localStorage.setItem("arr", JSON.stringify(arr))
  input.value = "";
  checkeditem()

});

function checkeditem (){
  let test = document.querySelectorAll(".checkbx")
  test.forEach((item, index)=>{
    item.addEventListener("click", (e)=>{
      let status = e.target.checked
      let obj = arr[index]
      obj.checked = status
      localStorage.setItem("arr", JSON.stringify(arr))
    })
  })
}