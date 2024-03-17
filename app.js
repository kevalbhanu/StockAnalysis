const stockNameInput = document.getElementById('stock-name');
const dateRangeFromInput = document.getElementById('month-range-from');
const dateRangeToInput = document.getElementById('month-range-to');
const btn = document.getElementById('fetch-data-btn');

// Set the minimum selectable date for the "to" input to be the same as the "from" input
dateRangeFromInput.addEventListener('change', () => {
  dateRangeToInput.min = dateRangeFromInput.value;
  formatDateInput(dateRangeFromInput);
});

// Set the maximum selectable date for the "from" input to be the same as the "to" input
dateRangeToInput.addEventListener('change', () => {
  dateRangeFromInput.max = dateRangeToInput.value;
  formatDateInput(dateRangeToInput);
});

// Format the date input to include only the year and month
function formatDateInput(input) {
  const date = new Date(input.value);
  input.value = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // prevent form submission

  // Get the selected date range
  const startDate = new Date(dateRangeFromInput.value);
  const endDate = new Date(dateRangeToInput.value);

  // Set the end date to the last day of the selected month
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);

  // Format the selected date range as YYYY-MM
  const startDateStr = startDate.toISOString().split('T')[0];
  const endDateStr = endDate.toISOString().split('T')[0];
  console.log(startDateStr,endDateStr);

    // Extract year and month from the start and enddates
    const startYear = startDate.getFullYear();
    const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const endYear = endDate.getFullYear();
    const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0');
    console.log(startYear,startMonth,endYear,endMonth);

  // Construct the API URL with the selected date range
  const base_url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&";
  const api_key = "&apikey=KB1443T097SQLVNW";
  const stknameVal = stockNameInput.value; // replace with the actual stock name
  const url = `${base_url}symbol=${stknameVal}&apikey=${api_key}`;

  // Fetch the data from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
     // console.log(data);
      // do something with the data
      let monthlydata= data['Monthly Time Series'];
      console.log(monthlydata);
    })
    .catch((error) => {
      console.error("Stock Name not found:", error);
    });
});