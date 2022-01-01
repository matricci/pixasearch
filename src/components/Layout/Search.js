import React, { useState, Fragment, useEffect } from "react";
import {
  Paper,
  IconButton,
  InputBase,
  AppBar,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Search as SearchIcon, Close, Settings } from "@material-ui/icons";
import { searchImages, searchText } from "../../actions/search";
import { useDispatch } from "react-redux";


//TODO: Styling - Add opacity and blur to background of the paper
const useStyles = makeStyles((theme) => ({
  divider: {
    height: "auto",
    marginTop: "6px",
    marginBottom: "6px",
    marginLeft: 0,
  },
  inputInput: {
    marginRight: "auto",
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  inputRoot: {
    color: "inherit",
  },
  search: {
    color: "inherit",
    boxShadow: "none",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchRoot: {
    position: "relative",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
}));

export default function Search() {
  const scrollTop = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#top"
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const classes = useStyles();
  const toggleChecked = () => {
    setChecked((prev) => !prev);
    console.log(checked);
  };
  useEffect(() => {
    var boolSafeSearch = /true/i.test(localStorage.getItem("safesearch"));
    setChecked(boolSafeSearch);
    console.log(boolSafeSearch);
  }, []);
  useEffect(() => {
    localStorage.setItem("safesearch", checked);
  }, [checked]);
  return (
    <Fragment>
      <AppBar style={{ alignContent: "center" }}>
        <Paper
          style={{
            display: "inline-flex",
            width: "-webkit-fill-available",
            position: "fixed",
            marginLeft: "2%",
            marginRight: "2%",
          }}
        >
          <IconButton
            onClick={(e) => {
              dispatch(searchImages(text.split(" ").join("+")));
              dispatch(searchText(text.split(" ").join("+")));
              scrollTop(e);
            }}
          >
            <SearchIcon />
          </IconButton>
          <Divider
            orientation="vertical"
            light
            className={classes.divider}
            variant="middle"
          />
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            fullWidth={true}
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            autoFocus={true}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                dispatch(searchImages(text.split(" ").join("+")));
                dispatch(searchText(text.split(" ").join("+")));
                scrollTop(event);
              }
            }}
          />
          {text ? (
            <IconButton
              onClick={(e) => {
                setText("");
                dispatch(searchImages(""));
                dispatch(searchText(""));
                scrollTop(e);
              }}
            >
              <Close />
            </IconButton>
          ) : (
            <Fragment>
              <IconButton onClick={() => setOpen(true)}>
                <Settings />
              </IconButton>
            </Fragment>
          )}
        </Paper>
      </AppBar>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Configuration</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={() => {
                    toggleChecked();
                  }}
                />
              }
              label="Safe Search"
              labelPlacement="start"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => {
              setOpen(false);
              location.reload();
            }}
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
