const inputwaktu = document.querySelector('input[name="waktu"]');
const display = document.querySelector('.display');
const playbtn = document.querySelector('.play');
const pauseresumebt = document.querySelector('.pause-resume');
const resetbtn = document.querySelector('.reset');
const suara = document.querySelector('.suara');

let waktu = 0;
let timer = null;
let ispaused = false;

inputwaktu.addEventListener('input', () => {
    const i = parseInt(inputwaktu.value);
    if (isNaN(i) || i <= 0 ) {
        playbtn.disabled = true;
    } else {
        playbtn.disabled = false;
    }
});

function updatedisplay(waktu) {
    const jam = Math.floor(waktu / 3600);
    const sisaDetik = waktu % 3600;
    const menit = Math.floor(sisaDetik / 60);
    const detik = sisaDetik % 60;

    if (jam > 0) {
        display.textContent = `${jam.toString().padStart(2, '0')}:${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
    } else {
        display.textContent = `${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
    }
}

playbtn.addEventListener('click', () => {
    waktu = parseInt(inputwaktu.value) * 60;
    updatedisplay(waktu);

    playbtn.disabled = true;
    inputwaktu.disabled = true;

    timer = setInterval(() => {
        if(!ispaused) {
            waktu--
            updatedisplay(waktu);

            if (waktu <= 0) {
                clearInterval(timer);
                let count = 0;
                const repeatSound = setInterval(() => {
                    suara.currentTime = 0; 
                    suara.play();
                    count++;
                    if (count >= 3) {
                        clearInterval(repeatSound);
                    }
                }, 2500);
            }

        }
    }, 1000);
});

pauseresumebt.addEventListener('click', () => {
    if(!timer) return;
    
    if(!ispaused) {
        ispaused = true;
        pauseresumebt.textContent = 'resume';
    } else {
        ispaused = false;
        pauseresumebt.textContent = 'pause';

    }
});

resetbtn.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    ispaused = false;

    updatedisplay(0);
    inputwaktu.value = '';
    playbtn.disabled = false;
    inputwaktu.disabled = false;
    pauseresumebt.textContent = 'pause';
});