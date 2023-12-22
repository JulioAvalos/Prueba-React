import {Grid, Typography} from "@mui/material";

export default function NotMatchesFound() {
    return <Grid container item alignContent="center" justifyContent="center" sx={{mt: 4}}>
        <Typography variant="h6">
            No se encontraron coincidencias
        </Typography>
    </Grid>
}
