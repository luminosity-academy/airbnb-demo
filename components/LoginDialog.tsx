import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { IUser } from "../models/User";

const LoginDialog: React.FC<{
  open: "login" | "signup" | null;
  onClose(): void;
}> = ({ open, onClose }) => {
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleSubmit = async () => {
    try {
      if (open === "signup") {
        const newUser: IUser = { email, password, name };

        const user = await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify(newUser)
        });

        const json = await user.json();

        console.log(json);
      } else {
        const newUser: IUser = { email, password };

        const user = await fetch("/api/authenticate", {
          method: "POST",
          body: JSON.stringify(newUser)
        });

        const json = await user.json();

        console.log(json);
      }
    } catch (e) {
      console.error(e);
    }

    onClose();
  };

  return (
    <Dialog open={Boolean(open)} onClose={onClose}>
      <DialogTitle id="form-dialog-title">
        {open === "login" ? "Login" : "Register"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To {open === "login" ? "log in to" : "sign up for"} this website,
          please enter your email address and password here.
        </DialogContentText>
        {open === "signup" && (
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            onChange={e => setName(e.target.value)}
          />
        )}
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
          onChange={e => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {open === "login" ? "Login" : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
