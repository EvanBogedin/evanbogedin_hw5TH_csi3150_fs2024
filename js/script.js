const filterForm = document.getElementById("filter-form");
const result = document.getElementById("result");

let formData = null;
let formDataExists = false;

function load() {
    showResults(buildResults());
}

filterForm.addEventListener("submit", handleFilter);

function handleFilter(e) {
  e.preventDefault();
  formData = new FormData(filterForm);
  formDataExists = true;
  clearResults();
  load();
}

function filterAllows(car) {
  const { year, make, model, mileage, price, color } = car;

  if (!(formData.get("min-year") <= year && formData.get("max-year") >= year)) {
    console.log(year, make, model, mileage, price, color);
    return false;
  }

  if (formData.get(make) == null) {
    console.log(year, make, model, mileage, price, color);
    return false;
  }

  if (!(formData.get("max-mileage") >= mileage)) {
    console.log(year, make, model, mileage, price, color);
    return false;
  }

  if (
    !(formData.get("min-price") <= price && formData.get("max-price") >= price)
  ) {
    console.log(year, make, model, mileage, price, color);
    return false;
  }

  if (formData.get(color) == null) {
    console.log(year, make, model, mileage, price, color);
    return false;
  }

  return true;
}

function createCard(car) {
  const { year, make, model, mileage, price, color, gasMileage } = car;
  const cardTemplate = `
    <div class="card">
      <div class="img-container">

      </div>
      <p>Year: ${year} </p>
      <p>Make: ${make}</p>
      <p>Model: ${model}</p>
      <p>Mileage: ${mileage}</p>
      <p>Price: ${price}</p>
      <p>Color: ${color}</p>
      <p>GasMileage: ${gasMileage}</p>
    </div>
  `;

  return cardTemplate;
}

function clearResults() {
  result.innerHTML = "";
}

function buildResults() {
  let filteredResult = "";
  for (i in usedCars) {
    let car = usedCars[i];
    if (!formDataExists || filterAllows(car)) {
      filteredResult += createCard(car);
    }
  }
  return filteredResult;
}

function showResults(item) {
  const newContent = item;
  result.innerHTML +=
    newContent ||
    "<div class='no-result-container'><p>No car from the dataset matches the filter criteria, please adjust the filter and try again.</p></div>";
}
