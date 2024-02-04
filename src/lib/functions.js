export function formatNumber(number) {
    const 억 = Math.floor(number / 100000000);
    const 만 = Math.floor((number % 100000000) / 10000);
    const 나머지 = number % 10000;
    let result = '';
    
    억 > 0 && (result += 억 + '억');
    만 > 0 && (result += 만 + '만');
    나머지 > 0 && (result += 나머지);
    return result;
}

// , 정규식
export function formatStatValue(value) {
    return value?.stat_value ? value?.stat_value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : "-";
}