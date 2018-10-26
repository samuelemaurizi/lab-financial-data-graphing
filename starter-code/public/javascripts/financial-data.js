const bitcoin = axios.create({
  baseURL: " https://api.coindesk.com/v1/bpi/historical/close.json"
});

document.getElementById("submit").onclick = () => {
  let start = "?start=" + document.getElementById("start-date").value;
  let end = "&end=" + document.getElementById("end-date").value;
  let currencies = document.getElementById("currency").value;
  let currency = "currency=" + currencies;
  let query = start + end;

  bitcoin
    .get("")
    .then(response => {
      // console.log(res.data.bpi);
      generateChart(response.data);
      console.log(response.data);
      document.getElementById("max-value").innerText =
        Math.max.apply(null, Object.values(response.data.bpi)).toFixed(3) +
        `${currencies}`;
      document.getElementById("min-value").innerText =
        Math.min.apply(null, Object.values(response.data.bpi)).toFixed(3) +
        `${currencies}`;
    })
    .catch(err => {
      throw err;
    });
};

function generateChart(data) {
  let coinDate = Object.keys(data.bpi);
  let coinPrice = Object.values(data.bpi);
  let ctx = document.getElementById("myChart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: coinDate,
      datasets: [
        {
          label: "Bitcoin Chart",
          data: coinPrice,
          // backgroundColor: "rgb(255, 99, 132)"
          borderColor: "rgb(255,99,132)"
        }
      ]
    }
  });
}
