function init() {
  const autoCompleteInput = document.querySelector("#autocomplete");
  const options = {
    componentRestrictions: { country: "sg" }
  };
  const autocomplete = new google.maps.places.Autocomplete(
    autoCompleteInput,
    options
  );
}

google.maps.event.addDomListener(window, "load", init);
