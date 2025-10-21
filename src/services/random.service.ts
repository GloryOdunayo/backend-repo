class Random {
    constructor(){}

    public randomCode(size: number) {
        const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
        let i = -1;
        let random: Array<string> = [];

        while(++i <size){
            random.push(
                pool.charAt(Math.floor(Math.random() * pool.length))
            )
        } 
        return random.join('')
    }
    public randomAlpha(size: number) {
        const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let i = -1;
        let random: Array<string> = [];

        while(++i <size){
            random.push(
                pool.charAt(Math.floor(Math.random() * pool.length))
            )
        } 
        return random.join('')
    }
    public randomNum(size: number) {
        const pool = '0123456789';
        let i = -1;
        let random: Array<string> = [];

        while(++i <size){
            random.push(
                pool.charAt(Math.floor(Math.random() * pool.length))
            )
        } 

        return random.join('')
    }
}

export default new Random()