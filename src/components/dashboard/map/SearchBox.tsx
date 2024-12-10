/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import "leaflet/dist/leaflet.css";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

interface Place {
  place_id: string;
  display_name: string;
  [key: string]: any;
}

export default function SearchBox(props: { selectPosition: any; setSelectPosition: any }) {
  const { setSelectPosition } = props;
  const [searchText, setSearchText] = useState<string>(""); // Declare searchText
  const [listPlace, setListPlace] = useState<Place[]>([]);

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: "1", // Convert number to string
      polygon_geojson: "0", // Convert number to string
    };
    const queryString = new URLSearchParams(params).toString();

    // Use queryString in a fetch call
    fetch(`${NOMINATIM_BASE_URL}${queryString}`)
      .then((response) => response.json())
      .then((result: Place[]) => {
        console.log(result);
        setListPlace(result);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <div>
        <List component="nav" aria-label="main mailbox folders">
          {listPlace.map((item) => (
            <div key={item.place_id}>
              <ListItem
                button
                onClick={() => {
                  setSelectPosition(item);
                }}
              >
                <ListItemIcon>
                  <img
                    src="../../../assets/images/svg/live-location-placeholder-pin-red-23395.png"
                    alt="Placeholder"
                    style={{ width: 38, height: 38 }}
                  />
                </ListItemIcon>
                <ListItemText primary={item.display_name} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}