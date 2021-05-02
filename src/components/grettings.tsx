import React, { useState, useEffect } from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './grettings.scss';

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

import Icon from '../../assets/iconpma.png';

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
  }, []);

  return (
    <View
      style={{
        background: 'azure',
        borderRadius: '15px',
        backgroundSize: 'auto',
      }}
    >
      <View>
        <View className="Login" id="main">
          <View className="Login" id="box">
            <View layout="horizontal">
              <View className="name">
                Bem vindo, {vault.getUser.username}
                <img alt="icon" src={Icon} />
              </View>
            </View>
            <View className="Login" id="forms" />
            <View layout="vertical">
              <button type="submit" className="Deter" color push>
                Deter
              </button>
              <button type="submit" className="Prender" color push>
                Prender
              </button>
              <button type="submit" className="Multar" color push>
                Multar
              </button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

// {ponto !== [] ? (
//   <View>
//     {ponto.map((e) => {
//       return (
//         <View>
//             {e.inicio}
//         </View>
//       );
//     })}
//   </View>
// ) : (
//   <View>Carregando</View>
// )}
