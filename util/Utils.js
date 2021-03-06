module.exports = Utils = {
    getDate : (date) => {
        // 1. 현재 시간(Locale)
        const curr = date||new Date();

        // 2. UTC 시간 계산
        const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);

        // 3. UTC to KST (UTC + 9시간)
        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        const kr_curr = new Date(utc + (KR_TIME_DIFF));

        return kr_curr;
    },
    
    convertYMD : (date) => {
        
        date.setMonth(date.getMonth()+1);

        const yy = date.getFullYear();
        const mm = date.getMonth() >= 10 ? date.getMonth() : `0${date.getMonth()}`;

        const dd = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;

        return `${yy}-${mm}-${dd}`;
    }
}