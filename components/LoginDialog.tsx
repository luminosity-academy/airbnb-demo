import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { IUser } from "../models/User";

const LoginDialog: React.FC<{ open: boolean; onClose(): void }> = ({
  open,
  onClose
}) => {
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleRegister = async () => {
    try {
      const newUser: IUser = { email, password, name };

      const user = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(newUser)
      });

      const json = await user.json();

      console.log(json);
    } catch (e) {
      console.error(e);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To register to this website, please enter your email address and
          password here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          onChange={e => setName(e.target.value)}
        />
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
        <Button onClick={handleRegister} color="primary">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
