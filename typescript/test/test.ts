interface IBase{
    do(i:number):Promise<any>;
}
class BaseClass implements IBase{
    async do(i:number):Promise<any>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve();
            },i);
        });
    }
}

class Aclass extends BaseClass{
    async run(i:number,s:string):Promise<void>{
        let j = 0;
        while(j<10){
            console.log(s+j);
            await this.do(i);
            j++;
        }
    }
}
function main(){
    
    let a = new Aclass();
    let b = new Aclass();
    
    a.run(2000,'aaaaa');
    b.run(3500,'bbbbb');
    
}

main();