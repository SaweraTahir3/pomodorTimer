" use strict"

let bStart = document.getElementById('start')
let  barra = document.getElementById('progress')
let  btModal = document.getElementById('bt-modal')
let containerModal = document.getElementById('modal-container')

let minutesSec = 1476
let minutes = 24
let seconds = 60
let rodando = 0

let  tempoTotal = minutesSec

let time = 1000
let cronometer

function isRunning() {
    let  rodando = 0
    if(rodando == 0){
        return bStart.disabled = false
    }
}

bStart.addEventListener('click', function start() {
    if(rodando == 0){
        cronometer = setInterval( () => { timer() }, time)
        rodando++
    }else if(rodando == 1){
        bStart.disabled = true
    }
})

function stop() {
    clearInterval(cronometer)
    rodando = 0
    isRunning()
}

function reset() {
    clearInterval(cronometer)
    minutes = 24
    seconds = 60
    rodando = 0
    minutesSec = tempoTotal
    isRunning()
    document.getElementById('contagem').innerHTML ='25:00'
    document.title = "25:00 | Pomodoro-Timer"
    barra.style.width = 100 + '%'
}

console.log(rodando)

function timer() {
    seconds--
    minutesSec--

    if(seconds == 0){
        seconds= 59
        minutes --
    }

    if(minutes == 0 && seconds == 1){
        seconds = 0
        rodando = 0
        bStart.disabled = true
        clearInterval(cronometer)
    }

    let format = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    document.getElementById('contagem').innerHTML = format
    
    let tempoRestante = minutesSec
    let tempPercent = (tempoRestante*100) / tempoTotal

    barra.style.width = tempPercent + '%'

    document.title = format + " | Pomodoro-Timer"
    
    if(window.Notification&&Notification.permission!=='denied'){
        Notification.requestPermission(function(status){
            if(minutes == 0 && seconds == 0){
                let n = new Notification('O TEMPO ACABOU!', {
                    body: "00:00 Descanse por 5 minutos e reinicie o timer",
                    icon: 'icons/timer.png'
                })
            }
            
        })
    }

}

let info = document.getElementById('info-button')

info.addEventListener('click', () => {
    containerModal.style.display = 'initial'
})

btModal.addEventListener('click', () => {
    containerModal.style.display = 'none'
})
