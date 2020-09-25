import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Pagination = (props) => {
    return (
        <Grid 
            container 
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
        >
            {props.goToPrevPage && 
                <Grid item> 
                    <Button variant="contained" onClick={props.goToPrevPage}>
                        Anterior
                    </Button>
                </Grid>
            }
            {props.goToNextPage && 
                <Grid item> 
                    <Button variant="contained" onClick={props.goToNextPage}>
                        Siguiente
                    </Button> 
                </Grid>
            }
        </Grid>
    );
}

export default Pagination;
 