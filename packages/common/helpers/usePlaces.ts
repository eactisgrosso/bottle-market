import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export class Suggestion {
  id: string;
  description: string;
}

export function usePlaces(): any {
  const {
    ready,
    value,
    suggestions,
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      radius: 100000,
      location: {
        lat: () => -34.603722,
        lng: () => -58.381592,
        equals: (e) => null,
        toJSON: () => null,
        toUrlValue: () => null,
      },
    },
    debounce: 300,
    callbackName: "initMap",
  });

  return {
    placeSearch: value,
    setPlaceSearch: setValue,
    suggestions: suggestions.data
      ? suggestions.data.map((s) => {
          const suggestion = new Suggestion();
          suggestion.id = s.id;
          suggestion.description = s.description
            .replace("Provincia de", "")
            .replace(", Argentina", "");
          return suggestion;
        })
      : [],
    status: suggestions.status,
    clear: clearSuggestions,
    getGeocode,
    getLatLng,
  };
}
