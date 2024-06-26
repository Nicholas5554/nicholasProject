let difficulty;

function randomNum(min, max) {
    let ranOne = Math.floor(Math.random() * (max - min + 1)) + min;
    let ranTwo = Math.floor(Math.random() * (max - min + 1)) + min;

    let operators = ['+', '-', '*', '/'];
    let operator = operators[Math.floor(Math.random() * operators.length)];

    let result = `${ranOne} ${operator} ${ranTwo}`;

    if (Number.isInteger(eval(result)) == false || eval(result) < 0) {
        randomNum();
    }

    document.getElementById('problem-area').innerHTML = result;
    return result;
}

const isAnswerRight = (answer, mathProblem) => {
    let rightAnswer = eval(mathProblem);
    return parseFloat(answer) === rightAnswer;
}

let points = 0;

function checkUser() {
    let answer = document.getElementById('answer-area').value;
    let mathProblem = document.getElementById('problem-area').innerHTML;

    if (document.getElementById('answer-area').value == ' ') {
        document.getElementById('score').innerHTML = `answer requaired`;
    }

    if (isAnswerRight(answer, mathProblem)) {
        points++;
        document.getElementById('score').innerHTML = `you got a point!, nice you have ${points} points`;
    }

    else if (isAnswerRight(answer, mathProblem) == false) {
        document.getElementById('score').innerHTML = `not the right one try again, you have ${points} points`;
    }

    document.getElementById('answer-area').value = ' ';

    exerciseHistory(answer, mathProblem);

    return randomNum(updatedMath());
}

const updatedMath = () => {
    let min, max;
    if (difficulty == 'level-1') {
        min = 1;
        max = 10;
        return randomNum(1, 10);
    } else if (difficulty == 'level-2') {
        min = 1;
        max = 100;
        return randomNum(1, 100);
    } else if (difficulty == 'level-3') {
        min = 1;
        max = 1000;
        return randomNum(1, 1000);
    }
    randomNum(min, max);
}

const difficultyPicker = () => {
    let level_1 = document.getElementById('level-1');
    let level_2 = document.getElementById('level-2');
    let level_3 = document.getElementById('level-3');

    level_1.addEventListener('click', () => {
        difficulty = 'level-1';
        updatedMath('level-1');
    });

    level_2.addEventListener('click', () => {
        difficulty = 'level-2';
        updatedMath('level-2');
    });

    level_3.addEventListener('click', () => {
        difficulty = 'level-3';
        updatedMath('level-3');
    });
}

function exerciseHistory(answer, mathProblem) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow(0);
    const exercise = row.insertCell(0);
    const correctAnswer = row.insertCell(1);
    const userAnswer = row.insertCell(2);
    const userPoints = row.insertCell(3);

    exercise.textContent = mathProblem;
    correctAnswer.textContent = eval(mathProblem);
    userAnswer.textContent = answer;
    userPoints.textContent = points;
}

difficultyPicker();