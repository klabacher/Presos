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
import { instance } from '../utils';
import vault from '../vault';

export default function Grettings() {
  let a;
  const [ponto, setPonto] = useState([]);
  const getPontos = async () => {
    await instance
      .post('/ponto/list', {
        FM_id: vault.getUser.FM_id,
      })
      .then(async (response) => {
        console.log(typeof ponto);
        setPonto(response.data);
        return response;
      });
  };

  useEffect(async () => {
    await getPontos();
  });

  return (
    <View>
      Bem vindo, {vault.getUser.username}
      <View>
        {ponto !== [] ? (
          <View>
            {ponto.map((e) => {
              return <View>{e.id}</View>;
            })}
          </View>
        ) : (
          <View>Carregando</View>
        )}
      </View>
    </View>
  );
}
