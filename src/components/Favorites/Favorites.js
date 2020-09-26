import React from 'react';

import FavoriteList from './FavoriteList';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Favorite = () => {

    return (
        <React.Fragment>
            <Grid container justify="center" alignItem="center">
                <Grid item>
                    <Typography variant="h4">Pokemon Favoritos</Typography>
                </Grid>
            </Grid>
            <FavoriteList />
        </React.Fragment>
    );
}

export default Favorite;