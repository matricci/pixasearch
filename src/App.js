import React, { Fragment } from "reactn";
import { hot } from "react-hot-loader";
import Search from './components/Layout/Search'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { lightGreen } from '@material-ui/core/colors'
import { Container, Grid, Typography } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from './components/Layout/AppBar'
import { Provider } from 'react-redux'
import store from './store'
import Images from './components/Images'
import Getkey from './components/GetKey'

const key = localStorage.getItem('key')
const primary = lightGreen[200]

function App() {
    const muitheme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                light: primary,
                main: primary
            },
        }
    })
    return (
        <Provider store={store}>
            <CssBaseline />
            <ThemeProvider theme={muitheme}>
                <Search />
                <div style={{ marginTop: "64px" }} />
                <Container>
                    <Grid container spacing={3}>
                        <Images />
                        {key ? (
                            <Fragment />
                        ) : (
                                <Getkey />
                            )}
                    </Grid>
                </Container>
                <AppBar />
            </ThemeProvider>
        </Provider>
    );
}

export default hot(module)(App); 
