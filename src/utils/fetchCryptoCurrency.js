const fetchCryptoCurrencies = async (currency, page) => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${page}&page=1&sparkline=false`);
        if (!response.ok) {
            throw new Error(`An error has occurred : ${response.status}`)
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error.message);
        return null;
    }
}

export default fetchCryptoCurrencies;