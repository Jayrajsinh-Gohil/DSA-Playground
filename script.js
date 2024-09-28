// Function to change both the graph and code frames based on the selected algorithm
function changeContent(algorithm) {
    let graphSrc, codeSrc;

    // Determine which graph and code to load based on the algorithm selected
    switch (algorithm) {
        case 'bubble':
            graphSrc = '/jayraj/1.html';
            codeSrc = '/jayraj/1code.html';
            break;
        case 'selection':
            graphSrc = '/jayraj/2.html';
            codeSrc = '/jayraj/2code.html';
            break;
        case 'insertion':
            graphSrc = '/jayraj/3.html';
            codeSrc = '/jayraj/3code.html';
            break;
        case 'quick':
            graphSrc = '/jayraj/4.html';
            codeSrc = '/jayraj/4code.html';
            break;

        case 'radix':
            graphSrc = '/jayraj/5.html';
            codeSrc = '/jayraj/5code.html';
            break;

        case 'linear':
            graphSrc = '/jayraj/6.html';
            codeSrc = '/jayraj/6code.html';
            break;
        default:
            graphSrc = '/jayraj/1.html';
            codeSrc = '/jayraj/1code.html';
    }

    // Update the src attributes of the iframes
    document.getElementById('graphFrame').src = graphSrc;
    document.getElementById('codeFrame').src = codeSrc;
}

// Initialize first load
changeContent('bubble');


// function loadFile(filename) {
//     document.getElementById('contentFrame').src = filename;
//     document.getElementById('codeFrame').src = filename;
// }

let values = [];
let originalValues = [];
let bars = [];
let i = 0, j = 0, n = 0;
let interval;
let isPaused = false;
let manual = false;
let steps = [];
let isRunning = false;

function generateBars(values) {
    const container = document.getElementById('bar-container');
    container.innerHTML = '';
    const maxValue = Math.max(...values);
    values.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        const scaledHeight = (value / maxValue) * 300;  // Scale to the container's height
        bar.style.height = `${scaledHeight}px`;
        container.appendChild(bar);
    });
    bars = document.getElementsByClassName('bar');
}

function startSorting() {
    const inputValues = document.getElementById('inputValues').value;
    values = inputValues.split(',').map(Number);
    originalValues = [...values];
    n = values.length;
    generateBars(values);
    document.getElementById('explanation').innerText = "Bubble sort has started. In bubble sort, the largest unsorted value is moved to its correct position by repeatedly swapping adjacent elements if they are in the wrong order.";
    document.getElementById('status').innerText = "";
    i = 0;
    j = 0;
    manual = false;
    isPaused = false;
    isRunning = true;
    steps = [];
    document.getElementById('pauseResumeBtn').innerText = 'Pause';
    document.getElementById('pauseResumeBtn').disabled = false;
    runSorting();
}

function runSorting() {
    if (!isPaused && isRunning) {
        interval = setInterval(bubbleSortStep, 1000);
    }
}

function togglePauseResume() {
    const btn = document.getElementById('pauseResumeBtn');
    if (isPaused) {
        resumeSorting();
        btn.innerText = "Pause";
    } else {
        pauseSorting();
        btn.innerText = "Resume";
    }
}

function pauseSorting() {
    clearInterval(interval);
    isPaused = true;
    document.getElementById('status').innerText = "Sorting paused!";
}

function resumeSorting() {
    isPaused = false;
    document.getElementById('status').innerText = "Sorting resumed!";
    runSorting();
}

function bubbleSortStep() {
    if (i < n - 1) {
        if (j < n - 1 - i) {
            highlightBars(j, j + 1);

            if (values[j] > values[j + 1]) {
                document.getElementById('explanation').innerText =
                    `Comparing elements ${values[j]} and ${values[j + 1]}. Since ${values[j]} is greater than ${values[j + 1]}, we swap them.`;
                swap(j, j + 1);
                steps.push({ i, j, swapped: true });
            } else {
                document.getElementById('explanation').innerText =
                    `Comparing elements ${values[j]} and ${values[j + 1]}. No swap needed.`;
                steps.push({ i, j, swapped: false });
            }
            j++;
        } else {
            j = 0;
            i++;
            document.getElementById('explanation').innerText = `End of pass ${i}. The largest value in the unsorted section is now correctly placed. Continuing with the unsorted elements.`;
        }
    } else {
        clearInterval(interval);
        isRunning = false;
        document.getElementById('explanation').innerText = "Sorting complete! The array is now fully sorted.";
        document.getElementById('status').innerText = "";
        document.getElementById('pauseResumeBtn').disabled = true;
    }
}

function nextStep() {
    clearInterval(interval);
    manual = true;
    isPaused = true;
    document.getElementById('pauseResumeBtn').innerText = "Resume";
    bubbleSortStep();
}

function prevStep() {
    clearInterval(interval);
    manual = true;
    isPaused = true;
    document.getElementById('pauseResumeBtn').innerText = "Resume";

    if (steps.length > 0) {
        const lastStep = steps.pop();
        i = lastStep.i;
        j = lastStep.j;

        if (lastStep.swapped) {
            swap(j, j + 1);
        }

        highlightBars(j, j + 1);

        document.getElementById('explanation').innerText = lastStep.swapped
            ? `Reversed: Swapped elements ${values[j]} and ${values[j + 1]} back.`
            : `Reversed: Compared elements ${values[j]} and ${values[j + 1]}. No swap was needed.`;
    } else {
        values = [...originalValues];
        generateBars(values);
        i = 0;
        j = 0;
        document.getElementById('explanation').innerText = "Returned to the initial state.";
    }
}

function highlightBars(index1, index2) {
    resetHighlight();
    bars[index1].classList.add('highlight');
    bars[index2].classList.add('highlight');
}

function resetHighlight() {
    for (let bar of bars) {
        bar.classList.remove('highlight');
    }
}

function swap(i, j) {
    [values[i], values[j]] = [values[j], values[i]];
    const maxValue = Math.max(...values);
    bars[i].style.height = `${(values[i] / maxValue) * 300}px`;
    bars[j].style.height = `${(values[j] / maxValue) * 300}px`;
}


