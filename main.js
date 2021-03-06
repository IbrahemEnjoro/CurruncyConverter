new Vue({
    el: '#app',
    data: {
        currencies: {},
        amount: 0,
        from: 'EUR',
        to: 'USD',
        result:null,
        loading:false
    },
    mounted() {
        this.getCurrencies();
    },
    computed: {
        formattedCurrencies() {
            return Object.values(this.currencies);
        },
        calculateResult(){
            return (Number(this.amount) * this.result).toFixed(3)
        },
        isDisabled(){
            return this.amount === 0 || !this.amount || this.loading;
        }
    },
    methods: {
        getCurrencies() {
            const currencies = localStorage.getItem('currencies')
            if (currencies) {
                this.currencies = JSON.parse(currencies);
                return;
            }
            axios.get('https://free.currencyconverterapi.com/api/v6/currencies?apiKey=sample-api-key')
                .then(response => {
                    this.currencies = response.data.results;
                    localStorage.setItem('currencies', JSON.stringify(response.data.results))
                });
        },
        convertCurrencies() {
            this.loading=true;
            axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${this.from}_${this.to}&compact=ultra&apiKey=a36b77fdce2c7587dbd0`)
                .then((response) => {
                    this.loading=false;
                console.log(response.data[`${this.from}_${this.to}`]);
               this.result =response.data[`${this.from}_${this.to}`]; 
            })
        }
    },
    watch: {
        from(){
            this.result = 0
        },
        to(){
            this.result = 0
        }
    },
})