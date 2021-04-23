import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css"
import searchStyle from "../styles/search.module.css"

const Search = ({ panTo, isSignedIn }) => {
  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 41.8781,
        lng: () => -87.6298,
      },
      radius: 200 * 1000,
    },
  })

  return (
    <div className={searchStyle.searchBar}>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false)
          clearSuggestions()
          try {
            const results = await getGeocode({ address })
            const { lat, lng } = await getLatLng(results[0])
            panTo({ lat, lng })
          } catch (e) {
            console.log("error:", e)
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          disabled={!isSignedIn}
          placeholder={isSignedIn ? "Search for an area" : "Log in to use"}
        />
        <ComboboxPopover>
          {status === "OK" && (
            <ComboboxList>
              {data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} as="p" />
              ))}
            </ComboboxList>
          )}
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default Search
