A View of the International Space Station's position over eath.
This project involved refactoring some initially supplied code:

## Was:
```
function requestISSLocation() {
    var apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log('Data :', data);

            // once we have the new ISS location, update the page
            updateISSLocation(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
```

## Now:

```
async function requestISSLocation() {
var apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";

    try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();

      // once we have the new ISS location, update the page
      updateISSLocation(data);
    }
  } catch (error) {
    console.error(("Error is:" + error);
  }
}
```

Then continue having an experiment with manipulating data obtained from 3rd
party APIs; in this case, [The International Spacestation](https://wheretheiss.at/) and also [LeafletJS open source Javascript library for interactive maps](https://leafletjs.com/).
