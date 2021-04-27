import axios from 'axios';

function fixlabel(label: string) {
  return label.replaceAll(' ', '_');
}

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export { fixlabel, instance };
