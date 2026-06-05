async function predictPrice() {

    const data = {
        OverallQual: Number(document.getElementById("OverallQual").value),
        GrLivArea: Number(document.getElementById("GrLivArea").value),
        GarageCars: Number(document.getElementById("GarageCars").value),
        GarageArea: Number(document.getElementById("GarageArea").value),
        TotalBsmtSF: Number(document.getElementById("TotalBsmtSF").value),
        "1stFlrSF": Number(document.getElementById("1stFlrSF").value),
        FullBath: Number(document.getElementById("FullBath").value),
        TotRmsAbvGrd: Number(document.getElementById("TotRmsAbvGrd").value),

        MSZoning: document.getElementById("MSZoning").value,
        Utilities: document.getElementById("Utilities").value,
        BldgType: document.getElementById("BldgType").value,
        Heating: document.getElementById("Heating").value,
        KitchenQual: document.getElementById("KitchenQual").value,
        SaleCondition: document.getElementById("SaleCondition").value,
        LandSlope: document.getElementById("LandSlope").value
    };

    const response = await fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    document.getElementById("result").innerHTML =
        "Predicted Price: $" + result.predicted_price;
}