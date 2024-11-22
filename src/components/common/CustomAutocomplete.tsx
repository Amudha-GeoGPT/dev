import { useEffect, useState } from "react";
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
import { SecondayText } from "../styles/fontsize.const";

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
  ChipValueStyles?: React.CSSProperties;
  ChipNumberStyles?: React.CSSProperties;
  AutocompleteTextfieldStyles?: React.CSSProperties;
  DoneIconStyles?: React.CSSProperties;
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
  ChipValueStyles,
  ChipNumberStyles,
  AutocompleteTextfieldStyles,
  DoneIconStyles,
}) => {
  const [autocompleteValue, setAutocompleteValue] = useState<string[]>(value);
  const [selectedCount, setSelectedCount] = useState<number>(value.length); // Initialize with length of `value`
  const [showAllTags, setShowAllTags] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Update selectedCount whenever autocompleteValue changes
  useEffect(() => {
    setSelectedCount(autocompleteValue.length);
    if (autocompleteValue.length <= 2 && showAllTags) {
      setShowAllTags(false);
    }
  }, [autocompleteValue, showAllTags]);

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

  const ListboxComponent = styled("ul")(() => ({
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
        clearIcon={null}
        sx={{
          ...sx,
          "& .MuiOutlinedInput-root": {
            padding: "0px",
            borderRadius: "8px",
            border: `1.8px solid ${SelectAutoCompleteBorderColor}`,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: `none`,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: `none`,
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
          const displayedTags = showAllTags ? value : value.slice(0, 3);
          const remainingCount = selectedCount - displayedTags.length;
        
          // Custom SVG as a React component
          const CustomDeleteIcon = ({ onClick }: { onClick: () => void }) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              focusable="false"
              aria-hidden="true"
              onClick={onClick} // Trigger onDelete when clicked
              style={{
                width: "12px", // Adjust size
                height: "12px", // Adjust size
                fill: "black", // Default color
                cursor: "pointer", // Pointer cursor for hover
              }}
            >
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          );
        
          return (
            <Box
              sx={{
                ...AutocompleteTextfieldStyles,
                display: "flex",
                gap: "8px", // Space between chips
                flexWrap: "nowrap", // Prevent wrapping
                overflowX: showAllTags ? "auto" : "hidden", 
                maxWidth: "100%", 
                whiteSpace: "nowrap",
                "&::-webkit-scrollbar": {
                  height: "0px", 
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(0, 0, 0, 0.3)",
                  borderRadius: "1px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "rgba(0, 0, 0, 0.5)",
                },
                "&::-webkit-scrollbar-track": {
                  background: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                },
              }}
            >
              {displayedTags.map((option, index) => {
                const { onDelete, ...tagProps } = getTagProps({ index });
        
                return (
                  <Chip
                    key={option}
                    label={option}
                    {...tagProps}
                    onDelete={onDelete} // Ensure delete functionality
                    deleteIcon={<CustomDeleteIcon onClick={onDelete} />} // Use custom SVG with delete logic
                    sx={{
                      ...ChipValueStyles,
                      "& .MuiChip-deleteIcon": {
                        margin: "0", // Remove any extra spacing
                      },
                    }}
                  />
                );
              })}
              {remainingCount > 0 && !showAllTags && (
                <Chip
                  sx={ChipNumberStyles}
                  label={`${remainingCount} more`}
                  onClick={() => setShowAllTags(true)} // Expand tags on click
                />
              )}
              {showAllTags && (
                <Chip
                  sx={ChipNumberStyles}
                  label="Show Less" // Collapse tags on click
                  onClick={() => setShowAllTags(false)}
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
            {selected && <DoneIcon sx={DoneIconStyles} />}
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

