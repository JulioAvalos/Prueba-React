import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        // marginTop: '2em',
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const Error = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} style={{marginTop: '3em'}}>
            <Grid 
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="h3">
                        Error - 404!
                    </Typography>
                    <Typography variant="h5">
                        No se ha encontrado el pokemon!
                    </Typography>
                </Grid>
                <Grid item style={{marginTop: '2em'}}>
                    <Button variant="contained" color="secondary" to="/" component={Link}>Volver</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Error;