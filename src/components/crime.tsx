import React, { Component } from 'react';
import { Checkbox, TextInput } from 'react-desktop/windows';
import CrimesJson from '../Pages/Tabs/stepsCon.json';

export default function crime({ activeStep, props }) {
  return (
    <div className="div-crimes" style={{ margin: '10px', overflow: 'auto' }}>
      {CrimesJson[activeStep].map((data, index) => {
        if (data.type === 'radio') {
          return (
            <div>
              <div key={index} className="div-linha" layout="horizontal">
                <Checkbox
                  theme={props.theme}
                  defaultValue={data.label}
                  onChange={(e) => this.radio(e, data)}
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
            <div>
              <div key={index} className="div-linha" layout="horizontal">
                <TextInput
                  theme={props.theme}
                  color={props.color}
                  label={data.label}
                  defaultValue="0"
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
      })}
    </div>
  );
}
