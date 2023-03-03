

function sortArray() {
    quickSort(0, arr.length - 1);
}

function quickSort(low, high) {
    if (low >= high || low < 0) {
        return;
    }
    let pivot = partition(low, high);
    quickSort(low, pivot - 1);
    quickSort(pivot + 1, high);
}

function partition(low, high) {
    let pivot = arr[high];

    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(i, j);
        }
    }
    i++;
    swap(i, high);
    return i;
}

function swap(i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
