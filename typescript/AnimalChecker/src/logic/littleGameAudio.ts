import { AudioPlay } from "../../../../../framework/src/tools/audio";
/**
 * 小游戏音乐
 */
class Audio{
    private static _instance:Audio = null;
    public static getInstance():Audio{
        if (Audio._instance === null)
            Audio._instance = new Audio();
        return Audio._instance;
    };
    public playVoice(vocieName){
        AudioPlay.playAudio("games/AnimalChecker/res/sounds/"+vocieName);
    };
    // 胜利
    public youWin() {
        Audio._instance.playVoice("success.mp3");
    };
    // 失败
    public youFail() {
        Audio._instance.playVoice("fail.mp3");
    };
    // 平局
    public youPing() {
        Audio._instance.playVoice("ping.mp3");
    };
    // 移动
    public move() {
        Audio._instance.playVoice("move.mp3");
    };
    // 吃
    public eat() {
        Audio._instance.playVoice("eat.mp3");
    };
    // 动物叫声
    // animalNum: 数字8-1表示 象>狮>虎>豹>狼>狗>猫>鼠
    public animalSpeak(animalNum) {
        let name = "";
        switch (animalNum) {
            case 1:
                name = "mouse.mp3";
                break;
            case 2:
                name = "cat.mp3";
                break;
            case 3:
                name = "dog.mp3";
                break;
            case 4:
                name = "wolf.mp3";
                break;
            case 5:
                name = "leopard.mp3";
                break;
            case 6:
                name = "tiger.mp3";
                break;
            case 7:
                name = "lion.mp3";
                break;
            case 8:
                name = "elephant.mp3";
                break;
            default:
                break;
        }
        Audio._instance.playVoice(name);
    };
};
export const LGAudio:Audio = Audio.getInstance();