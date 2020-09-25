import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Loader = () => {
    return (
        <Grid 
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        spacing={3}
    >    
        <Grid item xs={12}>
            <Typography variant="h4">
                Cargando...
            </Typography>
        </Grid>    
        <Grid item xs={12}>
            <CircularProgress/>
        </Grid>
    </Grid>
    );
}

export default Loader;
