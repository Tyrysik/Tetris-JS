export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.intervalID = null;
        this.isPlaying = false;

        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        this.view.renderStartScreen();
    }
    update() {
        this.game.movePieceDown();
        this.updateView();
    }
    play(){
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }
    pause(){
        this.isPlaying = false;
        this.stopTime();
        this.updateView();
    }
    reset(){
        this.game.reset();
        this.play();
    }

    updateView(){
        const state = this.game.getState();
        if(state.isGameOver){
            this.view.renderGameOverScreen(state)
        }else if(!this.isPlaying){
            this.view.renderPauseScreen();
        } else{
            this.view.render(this.game.getState());
        }
    }

    startTimer(){
        if(!this.intervalID){
            this.intervalID = setInterval(() => {
                this.update();
            },1000);
        }
    }
    stopTime(){
        if(this.intervalID){
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    }
    handleKeyDown(event) {
        const state = this.game.getState();

        switch (event.keyCode) {
            case 13: // ENTER
                if(state.isGameOver){
                    this.reset();
                }else if(this.isPlaying){
                    this.pause();
                }else {
                    this.play();
                }
                break;
            case 37 : //LEFT ARROW
                this.game.movePieceLeft();
                this.updateView();
                break;
            case 38: //UP ARROW
                this.game.rotetePiece();
                this.updateView();
                break;
            case 39: //RIGHT
                this.game.movePieceRight();
                this.updateView();
                break;
            case 40: //DOWN ARROW
                this.game.movePieceDown();
                this.stopTime();
                this.updateView();
                break;

        }
    }
    handleKeyUp(event){
        switch (event.keyCode) {
            case 40: //DOWN ARROW
                this.startTimer();
                break;
        }
    }
}