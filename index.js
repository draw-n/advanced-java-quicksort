let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 5;
let maxRange = 99;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  //console.log(numOfBars);
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bar.innerText = array[i];
    bar.style.alignSelf = "flex-end";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function partition(arr, low, high) {
  let bars = document.getElementsByClassName("bar");
  let pivot = arr[high];
  bars[high].style.backgroundColor = "red";
  for (let i = 0; i < bars.length; i++) {
    if (i != high) {
      bars[i].style.backgroundColor = "aqua";
    }
  }
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      await swap(arr, i, j, bars);
    }
  }
  i++;
await swap(arr, i, high, bars);
  return i;
}

async function quickSort(arr, low, high) {
  let bars = document.getElementsByClassName("bar");
    if (low >= high || low < 0) {
        return arr;
    }
    let pivot = await partition(arr, low, high);
    await quickSort(arr, low, pivot - 1);
    await quickSort(arr, pivot + 1, high);
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "aqua";
      }
  /*if (arr.length > 1) {
    let pivot = await partition(arr, low, high);
    if (low < index - 1) {
      if (low < pivot - 1) {
        //more elements on the low side of the pivot
        await quickSort(arr, low, pivot - 1);
      }
      if (pivot + 1 < high) {
        //more elements on the high side of the pivot
        await quickSort(arr, pivot + 1, high);
      }
    }
  }*/


  //return arr;
  /*var index;
  if (arr.length > 1) {
    index = await partition(arr, low, high); //index returned from partition
    if (low < index - 1) {
      //more elements on the low side of the pivot
      
    }
    if (index < high) {
      //more elements on the high side of the pivot
      await quickSort(arr, index, high);
    }
  }*/
}

// sort_btn.addEventListener("click", function () {
//   let sorted_array = quickSort(unsorted_array, 0, numOfBars - 1);
//   console.log(sorted_array);
// });

async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "red";
  bars[j].style.backgroundColor = "red";
  await sleep(speedFactor);

  for (let k = 0; k < bars.length; k++) {
    if (k != i && k != j) {
      bars[k].style.backgroundColor = "aqua";
    }
  }
  bars[i].innerText = array[i];
  bars[j].innerText = array[j];
  return array;
}

sort_btn.addEventListener("click", function () {
  quickSort(unsorted_array, 0, unsorted_array.length - 1);
});
