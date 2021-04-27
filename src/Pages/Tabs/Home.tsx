import React, { useState, useEffect } from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  Text,
  View,
  ProgressCircle,
  Button,
  Checkbox,
  TextInput,
} from 'react-desktop/windows';
import swal from 'sweetalert';

import Vault from '../../vault';

import Icon from '../../../assets/iconpma.png';

import Grettings from '../../components/grettings';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loader, showLoader] = useState(true);
  const [home, showHome] = useState(false);

  useEffect(() => {
    console.log('atualizou', Vault.getToken, Vault.getUser);
  }, [home]);

  const poslogin = async (data: any) => {
    showLoader(true);
    Vault.setToken = data.data.token;
    await Vault.userdata().then(() => {
      showHome(true);
    })
    swal({
      icon: 'success',
      button: 'Continuar',
    });
  };

  const poserror = (err) => {
    showLoader(true);
    swal({
      icon: 'error',
      text: 'Houve um erro',
      button: 'Tentar Novamente',
    });
  };

  return (
    <View>
      {Vault.getToken !== undefined ? (
        <Grettings />
      ) : (
        <View className="Login" id="main">
          <View className="Login" id="box">
            <View>
              <img alt="icon" src={Icon} />
            </View>
            <View className="Login" id="forms">
              <form noValidate autoComplete="off">
                <TextField
                  className={classes.root}
                  id="filled-basic"
                  label="Usuario: "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="filled"
                />
                <TextField
                  className={classes.root}
                  id="filled-basic"
                  type="password"
                  label="Senha: "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                />
              </form>
            </View>
            <View>
              <ProgressCircle
                size={32}
                hidden={loader}
                style={{ marginRight: '20px' }}
              />
              <Button
                type="submit"
                onClick={(e) => {
                  showLoader(false);
                  Vault.login(username, password, poslogin, poserror);
                }}
                className="btnSubmit"
                color
                push
              >
                Entrar
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
