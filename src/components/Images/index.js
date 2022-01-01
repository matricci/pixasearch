import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  Avatar,
  CardActions,
  IconButton,
  Link,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { FileCopyOutlined, SaveAlt, Public } from "@material-ui/icons";
import Pagination from "material-ui-flat-pagination";
import { searchImages } from "../../actions/search";
const electron = require('electron')
const ipcRenderer = electron.ipcRenderer;

function download(dataurl, filename) {
  var link = document.createElement("a");
  link.download = filename;
  link.href = dataurl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Images() {
  const scrollTop = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#top"
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const images = useSelector((state) => state.search.images.hits);
  const totalItems = useSelector((state) => state.search.images.totalHits);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [fSizeImg, setFSizeImg] = useState("");
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);

  useEffect(() => {
    console.log(images);
    console.log(totalItems);
  }, [images]);
  useEffect(() => {
    dispatch(searchImages(query, page));
  }, [page]);
  useEffect(() => {
    setOffset(0);
  }, [query]);
  return (
    <Fragment>
      {totalItems === 0 ? (
        <Grid item xs={12}>
          <Typography color="error" variant="h2">
            There are no results :(
          </Typography>
        </Grid>
      ) : (
        <Fragment />
      )}
      {images === undefined ? (
        <Fragment />
      ) : (
        <Fragment>
          {images.map((image) => (
            <Grid item xs={6} lg={4} xl={3} key={image.id}>
              <Card>
                <CardHeader
                  title={
                    <Link
                      style={{ fontWeight: "bold" }}
                      onClick={() =>
                        ipcRenderer.send(
                          "open-browser",
                          "https://pixabay.com/users/" + image.user
                        )
                      }
                    >
                      {image.user}
                    </Link>
                  }
                  avatar={<Avatar src={image.userImageURL} />}
                />
                <CardMedia
                  image={image.webformatURL}
                  style={{ paddingTop: "56%" }}
                  onClick={() => {
                    setOpen(true);
                    setFSizeImg(image.largeImageURL);
                  }}
                />
                <CardContent>
                  <Typography variant="caption">{image.tags}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() =>
                      ipcRenderer.send("copy-text", image.largeImageURL)
                    }
                  >
                    <FileCopyOutlined />
                  </IconButton>
                  <IconButton
                    onClick={() => download(image.largeImageURL, "image.jpg")}
                  >
                    <SaveAlt />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      ipcRenderer.send("open-browser", image.pageURL)
                    }
                  >
                    <Public />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Pagination
              style={{ textAlignLast: "center" }}
              offset={offset}
              limit={20}
              total={totalItems}
              onClick={(e, o, p) => {
                setOffset(o);
                scrollTop(e);
                setPage(p);
                console.log(e, o, p);
              }}
            />
          </Grid>
        </Fragment>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <img src={fSizeImg} style={{ width: "100%" }} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
