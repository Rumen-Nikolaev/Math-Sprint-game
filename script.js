// Initialize variables for timer, time limit, scores, and high score
let timer;
let time = 20;
let score = 0;
let highScore = 0;

// Function to start the game
function startGame() {
    resetGame(); // Reset game state
    generateProblem(); // Generate the first math problem
    generateOptions(); // Generate answer options
    timer = setInterval(updateTimer, 1000); // Start the timer
    document.getElementById('highScoreValue').innerText = highScore; // Display current high score
}

// Function to reset game state
function resetGame() {
    clearInterval(timer); // Clear any existing timer
    time = 20; // Reset time limit
    score = 0; // Reset score
    document.getElementById('time').innerText = time; // Display initial time
    document.getElementById('result').innerText = ''; // Clear result message
    document.getElementById('currentScore').innerText = score; // Display initial score
    document.getElementById('options').innerHTML = ''; // Clear answer options
    document.getElementById('problem').innerText = ''; // Clear current problem
    document.getElementById('highScoreValue').innerText = '0'; // Display initial high score
}

// Function to update the timer every second
function updateTimer() {
    time--;
    document.getElementById('time').innerText = time;
    if (time === 0) {
        endGame(); // End the game when time runs out
    }
}

// Function to generate a random math problem
function generateProblem() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operation = getRandomOperation();

    let problem;

    switch (operation) {
        case '+':
            problem = `${num1} + ${num2}`;
            break;
        case '-':
            problem = `${num1} - ${num2}`;
            break;
        case '*':
            problem = `${num1} * ${num2}`;
            break;
        case '/':
            // Ensure a non-zero divisor
            const divisor = num2 !== 0 ? num2 : 1;
            const result = (num1 / divisor).toFixed(2);
            problem = `${num1} / ${divisor}`;
            break;
        default:
            problem = ''; // Handle unexpected operations
    }

    document.getElementById('problem').innerText = problem;
}

// Function to randomly select a math operation
function getRandomOperation() {
    const operations = ['+', '-', '*', '/'];
    const randomIndex = Math.floor(Math.random() * operations.length);
    return operations[randomIndex];
}

// Function to generate answer options
function generateOptions() {
    const problemText = document.getElementById('problem').innerText;
    const correctAnswer = eval(problemText); // Calculate the correct answer

    // Initialize options array with correct answer
    const options = [correctAnswer];

    // Determine if the problem involves division or multiplication
    const isDivision = problemText.includes('/');
    const isMultiplication = problemText.includes('*');

    // Generate three additional random options
    while (options.length < 4) {
        let option;
        if (isDivision || isMultiplication) {
            // For division and multiplication, generate options with 2 decimal places
            option = correctAnswer + (Math.random() * 20 - 10);
            option = parseFloat(option.toFixed(2));
        } else {
            // For other operations, generate options as before
            option = correctAnswer + Math.floor(Math.random() * 10) - 5;
        }

        if (!options.includes(option)) {
            options.push(option);
        }
    }

    options.sort(() => Math.random() - 0.5); // Shuffle options randomly

    // Display each option as a button in the HTML
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.innerText = option.toFixed(2); // Format option to two decimal places
        button.onclick = () => selectOption(option, correctAnswer); // Assign click handler to each button
        optionsContainer.appendChild(button);
    });
}

// Function to handle option selection
function selectOption(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        document.getElementById('result').innerHTML = '<span class="correct">Correct!</span>';
        score++; // Increment score on correct answer
        document.getElementById('currentScore').innerText = score; // Display updated score
        generateProblem(); // Generate next problem
        generateOptions(); // Generate new options
    } else {
        document.getElementById('result').innerHTML = '<span class="incorrect">Incorrect. Try again.</span>';
    }
}

// Function to end the game
function endGame() {
    clearInterval(timer); // Stop the timer
    document.getElementById('result').innerText = 'Time is up! Game over.'; // Display game over message
    document.getElementById('options').innerHTML = ''; // Clear answer options
    document.getElementById('problem').innerText = ''; // Clear current problem
    updateHighScore(); // Update the high score if necessary
}

// Function to update the high score
function updateHighScore() {
    if (score > highScore) {
        highScore = score; // Update high score if current score is higher
        document.getElementById('highScoreValue').innerText = highScore; // Display updated high score
    }
}
