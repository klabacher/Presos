/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import {
  Checkbox,
  TextInput,
  Text,
  View,
  ProgressCircle,
  Button,
} from 'react-desktop/windows';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import CrimesJson from './stepsCon.json';

function getSteps() {
  return [
    'Crimes de trânsito',
    'Itens Ilegais',
    'Assaltos',
    'Leves',
    'Medios',
    'Hediondos',
    'Porte ilegal de armas',
    'Tráfico/Dinheiro sujo',
  ];
}

class Novo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showLoader: false,
      showError: false,
      meses: 0,
      multa: 0,
      fiança: 0,
      skipped: new Set(),
      activeStep: 0,
    };
  }

  handleNext = () => {
    this.setState((state) => {
      return { activeStep: state.activeStep + 1 };
    });
  };

  handleBack = () => {
    this.setState((state) => {
      return { activeStep: state.activeStep - 1 };
    });
  };

  isStepSkipped = (step) => {
    return this.state.skipped.has(step);
  };

  submit = () => {
    this.setState({ showLoader: true, showError: false });
    setTimeout(() => {
      this.setState({ showLoader: false, showError: true });
    }, 2000);
  };

  cancel = () => {
    this.setState({ showLoader: false, showError: false });
  };

  radio = (e, data) => {
    console.log(this.state.multa, this.state.meses);
    if (e.target.checked) {
      this.setState((state) => {
        return {
          multa: state.multa + data.multa,
          meses: state.meses + data.meses,
        };
      });
    }
    if (!e.target.checked) {
      this.setState((state) => {
        return {
          multa: state.multa - data.multa,
          meses: state.meses - data.meses,
        };
      });
    }
  };

  text = (e, data) => {
    console.log(this.state.multa);
    console.log(e.target.checked, data);
    if (e.target.checked) {
      this.setState((state) => {
        return { multa: state.multa + data.multa };
      });
    }
  };

  render() {
    return (
      <div style={{"backgroundColor": "inherit", "border-radius": 3 }}>
        <div>
          <div>
            <Stepper
              // className="StepperMaindiv"
              activeStep={this.state.activeStep}
              orientation="horizontal"
            >
              {getSteps().map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (this.isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
          <div style={{ margin: '10px' }}>
            {CrimesJson[this.state.activeStep].map((data, index) => {
              if (data.type === 'radio') {
                return (
                  <View
                    key={index}
                    margin="10px"
                    padding="1px"
                    layout="vertical"
                  >
                    <Checkbox
                      theme={this.props.theme}
                      defaultValue={data.label}
                      onChange={(e) => this.radio(e, data)}
                      label={data.label}
                    />
                    <Text color="#FFFFFF" theme="light">
                      {data.description}
                    </Text>
                  </View>
                );
              }
              if (data.type === 'int') {
                return (
                  <View key={index} margin="10px" layout="horizontal">
                    <TextInput
                      theme={this.props.theme}
                      color={this.props.color}
                      label={data.label}
                      defaultValue="0"
                    />
                    <Text color="#FFFFFF" theme="light">
                      {data.description}
                    </Text>
                  </View>
                );
              }
            })}
          </div>

          <View layout="vertical">
            <Text color="red" hidden={!this.state.showError}>
              There was an error submitting this form.
            </Text>

            <View horizontalAlignment="right">
              <ProgressCircle
                size={32}
                hidden={!this.state.showLoader}
                style={{ marginRight: '20px' }}
              />
              {this.state.activeStep === 7 && (
                <Button
                  onClick={this.submit}
                  type="submit"
                  color
                  push
                  style={{ marginRight: '8px' }}
                >
                  Submit
                </Button>
              )}
              {this.state.activeStep !== 7 && (
                <Button
                  onClick={this.handleNext}
                  type="submit"
                  color
                  push
                  style={{ marginRight: '8px' }}
                >
                  Next
                </Button>
              )}
              <Button onClick={this.handleBack}>Cancel</Button>
            </View>
          </View>
        </div>
      </div>
    );
  }
}

export default Novo;
