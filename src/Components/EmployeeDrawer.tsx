import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router';
import { IconButton } from '@material-ui/core';
const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },

        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);
export default function EmployeeDrawer() {
    const classes = useStyles();
    const history = useHistory();
    const signOut = () => {
        localStorage.clear();
        history.push('/');
    }
    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button>
                    {
                        //@ts-ignore

                        <ListItemIcon > <IconButton color="inherit"
                            aria-label="Sign Out" edge="start"
                            onClick={ signOut}><ExitToAppIcon /> </IconButton></ListItemIcon>

                    }<ListItemText primary={"Sign Out"} />
                </ListItem>
            </List>

        </div>);
}