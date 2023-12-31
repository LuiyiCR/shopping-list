const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearBtn = document.getElementById('clear');

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate Input
  if (newItem === '') {
    alert('ENTER ITEM!');
    return;
  }

  //Capitalize the first letter of each word
  const newItemCapitalized = newItem
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  //Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItemCapitalized));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //Add li to DOM
  itemList.appendChild(li);

  checkUI();

  itemInput.value = '';
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

//Focus-onBlur Item-Form
function onFocus(e) {
  itemInput.style.outlineStyle = 'solid';
  itemInput.style.outlineWidth = '1.5px';
  itemInput.style.outlineColor = 'red';
  itemInput.style.backgroundColor = 'white';
  itemInput.style.color = '#4750af';
}

function onBlur(e) {
  itemInput.style.outlineStyle = 'solid';
  itemInput.style.outlineWidth = '3px';
  itemInput.style.outlineColor = '#5c5d8d2e';
  itemInput.style.backgroundColor = '#fff9fa';
}

//Focus-onBlur Filter
function onFocusFilter(e) {
  itemFilter.style.borderBottom = '1px solid red';
}

function onBlurFilter(e) {
  itemFilter.style.borderBottom = '';
  itemFilter.style.backgroundColor = 'transparent';
}

//Remove Items (one by one)
function removeItem(e) {
  if (
    e.target.parentElement.classList.contains('items') ||
    e.target.parentElement.classList.contains('remove-item')
  ) {
    if (e.target.parentElement.classList.contains('remove-item')) {
      if (confirm('Delete?')) {
        e.target.parentElement.parentElement.remove();
      }
    } else if (confirm('Delete?')) {
      e.target.remove();

      checkUI();
    }
  }
}

//Clear All Items
function clearItems(e) {
  if (confirm('Delete All?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }

  checkUI();
}

//Clicking on the search icon focuses on the search filter
document.getElementById('searchIcon').addEventListener('click', function () {
  document.getElementById('filter').focus();
});

//Getting Rid of the Clear All Btn and Search Filter if there are no elements in the list
function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
    searchIcon.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
    searchIcon.style.display = 'block';
  }
}

//Event Listeners
itemForm.addEventListener('submit', addItem);
itemInput.addEventListener('focus', onFocus);
itemInput.addEventListener('blur', onBlur);
itemFilter.addEventListener('focus', onFocusFilter);
itemFilter.addEventListener('blur', onBlurFilter);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUI();
