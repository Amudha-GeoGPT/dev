import { useState } from "react";
import {
  TextField,
  FormLabel,
  Box,
  Button,
  Autocomplete,
  Chip,
  styled,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

import {
  LabelColor,
  PlaceholderColor,
  SelectAutoCompleteBorderColor,
} from "../styles/color.const";
import { ExtraSmallText, SecondayText } from "../styles/fontsize.const";

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
  optionFontSize?: string;
  SelectDeselectButtonStyles?: React.CSSProperties;
  OverallButtonStyles?: React.CSSProperties;
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
  optionFontSize,
  SelectDeselectButtonStyles,
  OverallButtonStyles,
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
  const ListboxComponent = styled("ul")(({}) => ({
    // border: "1px solid red",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(0, 0, 0, 0.3)",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "rgba(0, 0, 0, 0.5)",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    },
    "& .option": {
      display: "flex",
      alignItems: "center",
      padding: "6px",
      cursor: "pointer",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      "&.selected": {
        backgroundColor: "#f0f0f0",
      },
    },
  }));
  return (
    <Box>
      <FormLabel
        sx={{
          color: LabelColor,
          fontSize: SecondayText,
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
        ListboxComponent={(props) => (
          <>
            <ListboxComponent {...props}>
              {props.children}

              <Box sx={{ ...OverallButtonStyles }}>
                <Button
                  variant="outlined"
                  onClick={handleSelectAll}
                  sx={SelectDeselectButtonStyles}
                >
                  {selectAllLabel}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleDeselectAll}
                  sx={SelectDeselectButtonStyles}
                >
                  {deselectAllLabel}
                </Button>
              </Box>
            </ListboxComponent>
          </>
        )}
        renderTags={(value, getTagProps) => {
          const displayedTags = showAllTags ? value : value.slice(0, 2);
          const remainingCount = value.length - displayedTags.length;

          return (
            <Box
              sx={{
                maxHeight: 40,
                // overflowY: "hidden",
                overflowY: "auto",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {displayedTags.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    key={option}
                    label={option}
                    {...tagProps}
                    sx={{
                      fontSize: ExtraSmallText,
                      height: "24px",
                      padding: "0px",
                      // margin: "2px",
                      borderRadius: "6px",
                      backgroundColor: "#e2f2e5",
                    }}
                  />
                );
              })}
              {remainingCount > 0 && !showAllTags && (
                <Chip
                  sx={{
                    // marginTop: "3px",
                    backgroundColor: "#e2f2e5",
                    fontSize: ExtraSmallText,
                    height: "24px",
                    borderRadius: "6px",
                  }}
                  label={`+${remainingCount}`}
                  onClick={() => setShowAllTags(true)}
                />
              )}
            </Box>
          );
        }}
        renderOption={(props, option, { selected }) => (
          <li
            {...props}
            className={`option ${selected ? "selected" : ""}`}
            style={{ fontSize: optionFontSize }}
          >
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
                fontSize: SecondayText,
                opacity: 1,
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default CustomAutocomplete;
