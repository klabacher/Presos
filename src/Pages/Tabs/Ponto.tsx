import React, { useState } from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Text, View, ProgressCircle, Button } from 'react-desktop/windows';
import { AxiosError, AxiosPromise } from 'axios';
import { instance } from '../../utils';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateAndTimePickers() {
  const classes = useStyles();
  const [timeinicio, setTimeinicio] = useState();
  const [timefim, setTimefim] = useState();
  const [step, setStep] = useState();
  const [pontoid, setPonto] = useState();

  const handleNext = () => {
    if (step === true) {
      setStep(false);
    } else {
      setStep(true);
      instance
        .post('/ponto/create', {
          FM_id: 2003,
          inicio: timeinicio,
        })
        .then(function (response) {
          setPonto(response.data.id)
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        });
    }
  };

  const handleSubmit = () => {
    instance
      .post('/ponto/edit', {
        FM_id: 2003,
        fim: timefim,
        ponto_id: pontoid
      })
      .then((response) => {
        console.warn('porra', response);
      })
      .catch((err) => {
        throw new Error('FUDEU', err);
      });
    console.warn(timefim, timeinicio);
  };

  return (
    <View
      layout="vertical"
      height="100%"
      margin="50px"
      background="#000000ad"
      style={{
        maxHeight: '700px',
        minHeight: '700px',
        padding: '100px',
      }}
      horizontalAlignment="center"
    >
      <View layout="vertical">
        {step === true ? (
          <View layout="vertical" padding="10px">
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="Fim"
                type="datetime-local"
                defaultValue="2021-04-20T14:08"
                InputLabelProps={{
                  shrink: true,
                }}
                value={timefim}
                onChange={(event) => {
                  console.log(event.target.value);
                  setTimefim(event.target.value);
                }}
              />
            </form>
          </View>
        ) : (
          <View layout="vertical" padding="10px">
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="Inicio"
                type="datetime-local"
                defaultValue="2021-04-20T14:08"
                InputLabelProps={{
                  shrink: true,
                }}
                value={timeinicio}
                onChange={(event) => {
                  console.log(event.target.value);
                  setTimeinicio(event.target.value);
                }}
              />
            </form>
          </View>
        )}
      </View>
      <View layout="vertical" style={{ margin: '20px' }}>
        {step === true ? (
          <Button onClick={handleSubmit} type="submit" color push>
            Enviar
          </Button>
        ) : (
          <Button onClick={handleNext} type="submit" color push>
            Próximo
          </Button>
        )}
      </View>
    </View>
  );
}
