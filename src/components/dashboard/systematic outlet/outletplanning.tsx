  import React from "react";
  import { useAutocomplete } from "@mui/base";
  import CheckIcon from "@mui/icons-material/Check";
  import CloseIcon from "@mui/icons-material/Close";
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
  import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
  import IconButton from "@mui/material/IconButton";
  import { styled } from "@mui/material/styles";
  import { autocompleteClasses } from "@mui/material/Autocomplete";
  import SearchIcon from "@mui/icons-material/Search";
  import {
    Box,
    Button,
    TextField,
    ListSubheader,
    InputAdornment,
  } from "@mui/material";
  
  // Styling
  const Root = styled("div")(
    ({ theme }) => `
    color: ${
      theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
    };
    font-size: 14px;
  `
  );
  
  const InputWrapper = styled("div")(
    ({ theme }) => `
    width: 300px;
    border: 2px solid black;
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    border-radius: 5px;
    padding: 1px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  
    &:hover {
      border-color: black;
    }
  
    &.focused {
      border-color: black;
      box-shadow: none;
    }
  
    & input {
      background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
      color: ${
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.65)"
          : "rgba(0,0,0,.85)"
      };
      height: 30px;
      box-sizing: border-box;
      padding: 4px 6px;
      width: 0;
      min-width: 30px;
      flex-grow: 1;
      border: 0;
      margin: 0;
      outline: 0;
    }
  `
  );
  
  const StyledTag = styled("div")`
    display: flex;
    align-items: center;
    height: 24px;
    margin: 2px;
    line-height: 22px;
    background-color: #e2f2e5;
    border: 1px solid #e8e8e8;
    border-radius: 7px;
    box-sizing: content-box;
    padding: 0 5px 0 10px;
    overflow: hidden;
  
    & span {
      overflow: hidden;
      white-space: nowrap;
      font-size: 0.7rem;
    }
  
    & svg {
      font-size: 12px;
      cursor: pointer;
      padding: 4px;
    }
  `;
  
  const Listbox = styled("ul")(
    ({ theme }) => `
    width: 300px;
    margin: 2px 0 0;
    padding: 0;
    position: absolute;
    list-style: none;
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    overflow: auto;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  
    & li {
      padding: 5px 12px;
      display: flex;
  
      & span {
        flex-grow: 1;
      }
  
      & svg {
        color: transparent;
      }
    }
  
    & li[aria-selected='true'] {
      background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
      font-weight: 600;
  
      & svg {
        color: black;
      }
    }
  
    & li.${autocompleteClasses.focused} {
      background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
      cursor: pointer;
  
      & svg {
        color: violet;
      }
    }
  `
  );
  
  const optionsMap = {
    districts: [
      { title: "District 1" },
      { title: "District 2" },
      { title: "District 3" },
      { title: "District 4" },
    ],
    taluks: [{ title: "Taluk 1" }, { title: "Taluk 2" }, { title: "Taluk 3" }],
    villages: [
      { title: "Village 1" },
      { title: "Village 2" },
      { title: "Village 3" },
    ],
    areaTypes: [{ title: "Rural" }, { title: "Urban" }],
    states: [
      { title: "Andhra Pradesh" },
      { title: "Arunachal Pradesh" },
      { title: "Assam" },
      { title: "Bihar" },
      { title: "Chhattisgarh" },
      { title: "Goa" },
      { title: "Gujarat" },
      { title: "Haryana" },
      { title: "Himachal Pradesh" },
      { title: "Jharkhand" },
      { title: "Karnataka" },
      { title: "Kerala" },
      { title: "Madhya Pradesh" },
      { title: "Maharashtra" },
      { title: "Manipur" },
      { title: "Meghalaya" },
      { title: "Mizoram" },
      { title: "Nagaland" },
      { title: "Odisha" },
      { title: "Punjab" },
      { title: "Rajasthan" },
      { title: "Sikkim" },
      { title: "Tamil Nadu" },
      { title: "Telangana" },
      { title: "Tripura" },
      { title: "Uttar Pradesh" },
      { title: "Uttarakhand" },
      { title: "West Bengal" },
    ],
  };
  const options = {
    first: [
      { label: "Show All", value: "Show All" },
      { label: "Top 10", value: "Top 10" },
      { label: "Top 50", value: "Top 50" },
      { label: "Top 100", value: "Top 100" },
      { label: "Bottom 10", value: "Bottom 10" },
      { label: "Bottom 50", value: "Bottom 50" },
      { label: "Bottom 100", value: "Bottom 100" },
    ],
  };
  
  function CustomizedDropdown({ options, placeholder }) {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedOptions, setSelectedOptions] = React.useState([]);
  
    const {
      getRootProps,
      getInputProps,
      getTagProps,
      getListboxProps,
      getOptionProps,
      setAnchorEl,
    } = useAutocomplete({
      multiple: true,
      options,
      getOptionLabel: (option) => option.title,
      open: dropdownOpen,
      onOpen: () => setDropdownOpen(true),
      onClose: () => setDropdownOpen(false),
      value: selectedOptions,
      onChange: (event, newValue) => setSelectedOptions(newValue),
    });
  
    const filteredOptions = options.filter((option) =>
      option.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleSelectAll = () => setSelectedOptions(options);
    const handleDeselectAll = () => setSelectedOptions([]);
  
    return (
      <Root>
        <div {...getRootProps()}>
          <InputWrapper ref={setAnchorEl} className="focused">
            {selectedOptions.slice(0, 3).map((option, index) => (
              <StyledTag key={index} {...getTagProps({ index })}>
                <span>{option.title}</span>
                <CloseIcon
                  onClick={() =>
                    setSelectedOptions(
                      selectedOptions.filter((_, i) => i !== index)
                    )
                  }
                />
              </StyledTag>
            ))}
            {selectedOptions.length > 3 && (
              <StyledTag>
                <span>{`${selectedOptions.length - 3} more`}</span>
              </StyledTag>
            )}
            <input
              {...getInputProps()}
              placeholder={selectedOptions.length === 0 ? placeholder : ""}
            />
            <IconButton
              onClick={() => setDropdownOpen(!dropdownOpen)}
              size="small"
              sx={{ padding: 0 }}
            >
              {dropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          </InputWrapper>
        </div>
  
        {dropdownOpen && (
          <Listbox {...getListboxProps()}>
            <ListSubheader
              sx={{
                bgcolor: "background.paper",
                position: "sticky",
                top: 0,
                zIndex: 2,
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search options"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </ListSubheader>
  
            <Box>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <li key={index} {...getOptionProps({ option, index })}>
                    <span>{option.title}</span>
                    {selectedOptions.includes(option) && (
                      <CheckIcon fontSize="small" />
                    )}
                  </li>
                ))
              ) : (
                <li>No results found</li>
              )}
            </Box>
  
            <ListSubheader
              sx={{
                bgcolor: "background.paper",
                position: "sticky",
                bottom: 0,
                zIndex: 1,
                paddingY: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={handleSelectAll}
                sx={{
                  backgroundColor: "#fff",
                  color: "black",
                  marginRight: "10px",
                  border: 1,
                }}
              >
                Select All
              </Button>
              <Button
                onClick={handleDeselectAll}
                sx={{
                  backgroundColor: "#fff",
                  color: "black",
                  marginRight: "10px",
                  border: 1,
                }}
              >
                Deselect All
              </Button>
            </ListSubheader>
          </Listbox>
        )}
      </Root>
    );
  }
  
  const Staticmacoutlet: React.FC = () => {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <CustomizedDropdown
          options={optionsMap.states}
          placeholder="Select State"
        />
        <CustomizedDropdown
          options={optionsMap.districts}
          placeholder="Select District"
        />
        <CustomizedDropdown
          options={optionsMap.taluks}
          placeholder="Select Taluk"
        />
        <CustomizedDropdown
          options={optionsMap.villages}
          placeholder="Select Village"
        />
        <CustomizedDropdown
          options={optionsMap.areaTypes}
          placeholder="Select Rural/Urban"
        />
        {/* You can add other dropdowns similarly */}
      </Box>
    );
  }
  export default Staticmacoutlet;