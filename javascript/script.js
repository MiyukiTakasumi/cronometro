//PRINCIPAIS VARIÁVEIS
const timerEl = document.getElementById('timer');
const marksList = document.getElementById('marks-list');
let intervalId = 0;
let timer = 0;//VAI ARMAGENAR O TEMPO DECORRIDO
let marks = [];

//FUNÇÃO P/FORMATAR O TEMPO
const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
}
//FUNÇÃO PARA FUNCIONAR QDO CLICAR NO BOTÃO
const toggleTimer = () => {
    const button = document.getElementById('power');
    const action = button.getAttribute('action');

    clearInterval(intervalId);

    if (action == 'start' || action == 'continue') {
        intervalId = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
        button.setAttribute('action', 'pause');
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else if (action == 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}
//FUNÇÃO PARA SETAR O TIME E MOSTRAR NA TELA
const setTimer = (time) => {
    timerEl.innerText = formatTime(time);
}
//FUNÇÃO DE ADICIONAR MARCAÇÃO
const addMarkToList = (markIndex, markTime) => { 
    marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
}
//FUNÇÃO P/CONTAR AS MARCAÇÕES DE TEMPO
const markTime = () => {
    marks.push(timer);
    addMarkToList(marks.length, timer);
}
//FUNÇÃO RESET TIME
const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTimer(timer);
    marksList.innerHTML = ''; 
    const button = document.getElementById('power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';

}
//ADICIONAR EVENTO DO CLICK
document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);