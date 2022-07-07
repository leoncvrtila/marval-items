import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useStore } from "../../../store/store";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Input } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import { ItemDetailsInterface } from "../../../core/interfaces/components/item-details";

const ItemDetails: FunctionComponent<ItemDetailsInterface> = ({
  item,
  setIsSplitView,
}) => {
  const form = useStore((state) => state.form);
  const getForm = useStore((state) => state.getForm);

  const [knownError, setKnownError] = useState("");
  const [status, setStatus] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    getForm();
  }, []);

  useEffect(() => {
    if (item) {
      setKnownError(item?.type.name);
      setStatus(item?.status.name);
      setIsPrivate(item?.isPrivate);
      setSummary(item?.summary);
    }
  }, [item]);

  const handleClose = () => {
    setIsSplitView(false);
  };

  const handleSelectChange = (event: SelectChangeEvent, fieldName: string) => {
    if (fieldName === "Status") {
      setStatus(event.target.value);
      return;
    }
    setKnownError(event.target.value);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setIsPrivate(event.target.checked);
  };

  const handleTextChange = (event: any, fieldName: string) => {
    setSummary(event.target.value);
  };

  const renderFields = useCallback(() => {
    const fields = form.fieldsets && form?.fieldsets[0]?.fields;

    return fields?.map((field: Field) => {
      return (
        <Box sx={{ m: 1, minWidth: 120 }} key={field.displayName}>
          <FormControl fullWidth>
            {field.type === "select" ? (
              <Fragment>
                <InputLabel id={field.name}>{field.displayName}</InputLabel>
                <Select
                  labelId={field.name}
                  id={field.name}
                  value={field.name === "Status" ? status : knownError}
                  label={field.displayName}
                  onChange={(e) => handleSelectChange(e, field.name)}
                  data-testid={field.name}
                >
                  {field["x-options"]?.map((option: Option) => {
                    return (
                      <MenuItem key={option.value} value={option.text}>
                        {option.text}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Fragment>
            ) : (
              <Fragment>
                {field.type === "checkbox" ? (
                  <div className="item-details__checkbox">
                    <Checkbox
                      id={field.name}
                      checked={isPrivate}
                      value={"field.name"}
                      data-testid={field.name}
                      onChange={(e) => handleCheckboxChange(e, field.name)}
                    />
                    <label htmlFor={field.name}>{field.displayName}</label>
                  </div>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    value={summary}
                    data-testid={field.name}
                    onChange={(e) => handleTextChange(e, field.name)}
                  />
                )}
              </Fragment>
            )}
          </FormControl>
        </Box>
      );
    });
  }, [form, item, knownError, knownError, status, isPrivate, summary]);

  return (
    <div className="item-details">
      <IconButton aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <h2>{form?.displayName}</h2>
      {renderFields()}
    </div>
  );
};

export default ItemDetails;
