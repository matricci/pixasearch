import React, { Fragment, useState } from 'react'
import { Grid, Card, CardContent, TextField, Button, CardActions, Typography, Link } from '@material-ui/core'
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


export default function GetKey() {
    const [key, setKey] = useState('')
    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <TextField variant="outlined" value={key} onChange={e => setKey(e.target.value)} label="Your Key" style={{marginBottom: '12px'}}/>
                    <Typography>
                        If you don't have one, take a look at the <Link color="primary" onClick={() => ipcRenderer.send('open-browser', 'https://pixabay.com/api/docs/')} >Documentation</Link>
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={() => {
                        localStorage.setItem('key', key)
                        ipcRenderer.send('store-key')
                    }}>Enter your key</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
