

class SpeedTyping{
    constructor(){
        this.input=null;
        this.word=null;
        this.randomWord=null;
        this.secondsRemain=null;
        this.result=null;
        this.timeleft=null;
        this.message=null;
        this.interval=0;
        this.score=0;
        this.time=0;
        this.levels={
            easy:6,
            medium:4,
            hard:3
        };
        this.initialize();
        this.addEventListeners();
        this.countdown();

    }
    initialize(){
        this.input=document.querySelector('[data-input]');
        this.secondsRemain=document.querySelector('[data-seconds]');
        this.word=document.querySelector('[data-api]');
        this.timeleft=document.querySelector('[data-timeleft]')
        this.result=document.querySelector('[data-resultscore]');
        this.message=document.querySelector('[data-message]');
        this.input.removeAttribute('disabled');
        this.time=this.levels.easy;
        this.clear();
        this.showResult();
        this.getRandomWord();
    }
    addEventListeners(){
        this.input.addEventListener('input',this.checkWord.bind(this));
    }
    showResult(){
        this.result.innerHTML=this.score;
    }
    clear(){
        this.input.value="";
        this.message.innerHTML="";
    }
    getRandomWord(){
        fetch("https://random-word-api.herokuapp.com/word?number=1")
            .then(response => response.json())
            .then(data => {
                const [wordData]=data;
                this.randomWord=wordData;
                this.setWord();
            })
            .catch(error => {
                console.error(error);
            })
    }
    countdown(){
        this.interval=setInterval(() => {
            this.time--;
            this.timeleft.innerHTML=this.time
            this.secondsRemain.innerHTML=this.time;
            if(this.time<=0){
                this.message.innerHTML=`Koniec gry! Twój wynik:${this.score}`
                this.input.setAttribute('disabled','true');
                clearInterval(this.interval);
            }
        },1000)
    }
    setWord(){
        this.word.innerHTML=this.randomWord;
    }
    checkWord(){
        if(this.input.value===this.randomWord){
            this.score++;
            this.initialize();
        }
    }
}

const start = document.querySelector('[data-start]');

start.addEventListener('click',() => {
    const speed = new SpeedTyping();
})

