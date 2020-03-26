import * as React from "react";

import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";

import LoginDialog from "./LoginDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    loginButton: {
      marginRight: theme.spacing(2)
    }
  })
);

const Header: React.FC<{}> = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState<"login" | "signup" | null>(null);

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Airbnb Demo
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setOpen("login");
              }}
              className={classes.loginButton}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setOpen("signup");
              }}
            >
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      <LoginDialog open={open} onClose={handleClose} />
    </>
  );
};

export default Header;
