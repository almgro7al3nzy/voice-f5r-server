/**
 * ACChessRes
 * 斗兽棋棋子资源
 */
const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu("AnimalChecker/page/ACChessRes")
export default class ACChessRes extends cc.Component {
    @property([cc.Float]) //item在未翻牌和翻牌后的锚点值
    public anchorYs: cc.Float[] = [];
    
    @property([cc.Integer]) //item在未翻牌和翻牌后的高度值
    public heights: cc.Integer[] = [];

    @property([cc.Color]) //颜色依次为红、蓝
    public colorCamp: cc.Color[] = [];

    @property([cc.SpriteFrame]) //棋底图依次为红、蓝
    public bgCamp: cc.SpriteFrame[] = [];
       
    @property([cc.SpriteFrame]) //箭头颜色依次为绿、红
    public arrowSPF: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame]) //动物图依次为鼠、猫、狗、狼、豹、虎、狮、象
    public animalSPF: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame]) //红方文字图依次为鼠、猫、狗、狼、豹、虎、狮、象
    public textSPFRed: cc.SpriteFrame[] = []; 

    @property([cc.SpriteFrame]) //蓝方文字图依次为鼠、猫、狗、狼、豹、虎、狮、象
    public textSPFBlue: cc.SpriteFrame[] = [];   
    
}
