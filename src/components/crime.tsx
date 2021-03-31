import React from 'react';
import { Checkbox, TextInput } from 'react-desktop/windows';
import CrimesJson from '../Pages/Tabs/stepsCon.json';
import { fixlabel } from '../utils';

export default function crime({ state, activeStep, props, radioCB, TextCB }) {
  console.log(state)
  return (
    <div
      key="10"
      className="div-crimes"
      style={{ margin: '10px', overflow: 'auto' }}
    >
      {CrimesJson[activeStep].map((data, index) => {
        if (data.type === 'radio') {
          return (
            <div key={index}>
              <div className="div-linha" layout="horizontal">
                <Checkbox
                  theme={props.theme}
                  defaultValue={data.label}
                  onChange={(e) => radioCB(e, data)}
                  label={data.label}
                />
                {data.description !== '' && (
                  <div className="description-checkbox">
                    <span color="#FFFFFF" theme="light">
                      {data.description}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        }
        if (data.type === 'int') {
          return (
            <div key={index}>
              <div className="div-linha" layout="horizontal">
                <TextInput
                  theme={props.theme}
                  color={props.color}
                  label={data.label}
                  defaultValue="0"
                  value={state[fixlabel(data.label)]}
                  onChange={(e) => TextCB(e, data)}
                />
                <div className="description">
                  <p color="#FFFFFF" theme="light">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          );
        }
        return 'default';
      })}
    </div>
  );
}
