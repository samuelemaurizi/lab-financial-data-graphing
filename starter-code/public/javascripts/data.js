// GET THE INPUT
const inputFrom = document.getElementById("start-date");
const inputTo = document.getElementById("end-date");
const currency = document.getElementById("currency");

// GET THE API DATA
document.getElementById("submit").onclick = () => {
  // console.log(inputFrom.value);
  // console.log(inputTo.value);
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json
      ?start=${inputFrom.value}
      &end=${inputTo.value}
      &currency=${currency.value}`
    )
    .then(result => {
      const dates = Object.keys(result.data.bpi);
      const resultArr = [];
      dates.map(e => resultArr.push(result.data.bpi[e]));
      generateChart(dates, resultArr);

      document.getElementById("max-value").innerText =
        Math.max.apply(null, Object.values(result.data.bpi)) +
        `${currency.value}`;
      document.getElementById("min-value").innerText =
        Math.min.apply(null, Object.values(result.data.bpi)) +
        `${currency.value}`;
    })
    .catch(err => {
      throw err;
    });
};

// DISPLAY THE CHART
let generateChart = (dates, data) => {
  let ctx = document.getElementById("myChart");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Bitcoin price",
          data: data,
          borderColor: "rgb(255,99,132)"
        }
      ]
    }
  });
};
