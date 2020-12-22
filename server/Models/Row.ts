export class Row{
    public Duration:number;
    public IP:string;
    public Time:Date;
	constructor(duration:number,ip:string,time:Date) {
        this.Duration = duration;
        this.IP = ip;
        this.Time = time;
	}   

    toString(){
        return JSON.stringify(this);
    }

}