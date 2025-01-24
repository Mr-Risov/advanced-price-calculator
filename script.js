document.getElementById("calculate-button").addEventListener("click", function () {
  const weight = parseFloat(document.getElementById("weight").value);
  const weightUnit = document.getElementById("weight-unit").value;
  const price = parseFloat(document.getElementById("price").value);
  const calculationType = document.getElementById("calculation-type").value;
  const inputValue = parseFloat(document.getElementById("input-value").value);
  const inputUnit = document.getElementById("input-unit").value;
  const resultDiv = document.getElementById("result");

  if (isNaN(weight) || isNaN(price) || isNaN(inputValue)) {
    resultDiv.innerText = "Please enter valid inputs.";
    return;
  }

  // Convert weight to grams if necessary
  const totalWeightInGrams = weightUnit === "kg" ? weight * 1000 : weight;
  const pricePerGram = price / totalWeightInGrams;
  let result, explanation;

  if (calculationType === "price-per-quantity") {
    // Input value is weight (kg or grams)
    const inputWeightInGrams =
      inputUnit === "kg" ? inputValue * 1000 : inputValue;

    result = inputWeightInGrams * pricePerGram;
    explanation = `If ${weight}${weightUnit} costs ₹${price}, then the cost for ${inputValue} ${inputUnit} is ₹${result.toFixed(
      2
    )}.`;
  } else if (calculationType === "quantity-per-price") {
    // Input value is price
    if (inputUnit !== "price") {
      resultDiv.innerText =
        "For weight calculation, the input unit must be set to price.";
      return;
    }

    const gramsForPrice = inputValue / pricePerGram;
    const kgForPrice = gramsForPrice / 1000;

    explanation = `If ${weight}${weightUnit} costs ₹${price}, then for ₹${inputValue}, you will get ${kgForPrice.toFixed(
      3
    )} kg (${gramsForPrice.toFixed(0)} g).`;
  }

  resultDiv.innerText = explanation;
});
      
