import React, { useState, Fragment } from 'react'
import { Paper, IconButton, InputBase, AppBar, Divider, Icon } from '@material-ui/core'
import { Search as SearchIcon, Close } from '@material-ui/icons'
import { makeStyles, fade } from '@material-ui/core/styles';
import { searchImages, searchText } from '../../actions/search'
import { useDispatch } from 'react-redux'


const useStyles = makeStyles(theme => ({
    divider: {
        height: 'auto',
        marginTop: '6px',
        marginBottom: '6px',
        marginLeft: 0
    },
    inputInput: {
        marginRight: 'auto',
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    search: {
        color: "inherit",
        boxShadow: 'none',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchRoot: {
        position: 'relative',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    }
}))

export default function Search() {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const classes = useStyles()
    return (
        <AppBar>
            <Paper style={{ display: 'inline-flex', width: '100%',  position: 'fixed', borderRadius: 50}}>
                <IconButton onClick={() => {
                    dispatch(searchImages(text.split(' ').join('+')))
                    dispatch(searchText(text.split(' ').join('+')))
                    
                    }}>
                    <SearchIcon />
                </IconButton>
                <Divider orientation="vertical" light className={classes.divider} variant="middle"/> 
                <InputBase classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }} fullWidth={true} onChange={e => {
                    setText(e.target.value)
                    }} value={text}/>
            {text ? (
                <IconButton onClick={() => {
                    setText('')
                    dispatch(searchImages(''))  
                    dispatch(searchText(''))

                }}>
                    <Close />
                </IconButton>
            ) : (
                <Fragment />
            )}
            </Paper>
        </AppBar>
    )
}
