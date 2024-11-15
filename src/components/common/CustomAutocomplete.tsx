import { useState } from "react";
import {
  TextField,
  FormLabel,
  Box,
  Button,
  Autocomplete,
  Chip,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import {
  sharedButtonStyles,
  ListboxComponent,
} from "../styles/CustomAutoComplete.styles";
import {
  LabelColor,
  PlaceholderColor,
  SelectAutoCompleteBorderColor,
} from "../styles/color.const";
import { TertiaryText } from "../styles/fontsize.const";

interface CustomAutocompleteProps {
  options: string[];
  placeholder?: string;
  onInputChange: (value: string[]) => void;
  noOptionsText?: string;
  label: string;
  value?: string[];
  sx?: React.CSSProperties;
  selectAllLabel?: string;
  deselectAllLabel?: string;
  insideplaceholder?: string;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  options,
  placeholder,
  onInputChange,
  noOptionsText,
  label,
  value = [],
  sx,
  selectAllLabel,
  deselectAllLabel,
  insideplaceholder,
}) => {
  const [autocompleteValue, setAutocompleteValue] = useState<string[]>(value);
  const [showAllTags, setShowAllTags] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    newValue: string[]
  ) => {
    setAutocompleteValue(newValue);
    onInputChange(newValue);
  };

  const handleSelectAll = () => {
    setAutocompleteValue(options);
    onInputChange(options);
  };

  const handleDeselectAll = () => {
    setAutocompleteValue([]);
    onInputChange([]);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const buttonStyles = {
    marginRight: 1,
    ...sharedButtonStyles,
  };

  return (
    <Box>
      <FormLabel
        sx={{
          color: LabelColor,
          fontSize: TertiaryText,
          "&.Mui-focused": {
            color: LabelColor,
          },
        }}
      >
        {label}
      </FormLabel>
      <Autocomplete
        multiple
        disableCloseOnSelect
        value={autocompleteValue}
        onChange={handleAutocompleteChange}
        options={filteredOptions}
        noOptionsText={noOptionsText}
        sx={{
          ...sx,
          "& .MuiOutlinedInput-root": {
            padding: "0px",
            paddingLeft: "10px",
            borderRadius: "8px",
            border: `1px solid ${SelectAutoCompleteBorderColor}`,
            "& .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${SelectAutoCompleteBorderColor}`,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${SelectAutoCompleteBorderColor}`,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${SelectAutoCompleteBorderColor}`,
            },
          },
        }}
        // noOptionsText={
        //   searchTerm && filteredOptions.length === 0
        //     ? noOptionsText
        //     : noOptionsText
        // }
        ListboxComponent={(props) => (
          <ListboxComponent {...props}>
            {/* <TextField
              fullWidth
              variant="outlined"
              placeholder="Search States"
              sx={{
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  "& input": {
                    padding: "4px 14px",
                  },
                },
              }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            /> */}
            {props.children}
            <Box className="select-buttons">
              <Button
                variant="outlined"
                onClick={handleSelectAll}
                sx={buttonStyles}
              >
                {selectAllLabel}
              </Button>
              <Button
                variant="outlined"
                onClick={handleDeselectAll}
                sx={sharedButtonStyles}
              >
                {deselectAllLabel}
              </Button>
            </Box>
          </ListboxComponent>
        )}
        renderTags={(value, getTagProps) => {
          const displayedTags = showAllTags ? value : value.slice(0, 2);
          const remainingCount = value.length - displayedTags.length;

          return (
            <Box
              sx={{
                maxHeight: 40,
                overflowY: "auto",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {displayedTags.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return <Chip key={option} label={option} {...tagProps} />;
              })}
              {remainingCount > 0 && !showAllTags && (
                <Chip
                  sx={{ marginTop: "3px" }}
                  label={`+${remainingCount}`}
                  onClick={() => setShowAllTags(true)}
                />
              )}
            </Box>
          );
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props} className={`option ${selected ? "selected" : ""}`}>
            <span>{option}</span>
            {selected && <DoneIcon sx={{ marginLeft: "auto" }} />}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder || insideplaceholder}
            sx={{
              "& input::placeholder": {
                color: PlaceholderColor,
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default CustomAutocomplete;
