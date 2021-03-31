/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Text, View, ProgressCircle, Button } from 'react-desktop/windows';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Crime from '../../components/crime';
import { fixlabel } from '../../utils';

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
      if (state.activeStep - 1 >= 0)
        return { activeStep: state.activeStep - 1 };
      return null;
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

  handleCancel = () => {
    this.setState({ showLoader: false, showError: false });
  };

  radio = (e, data) => {
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
    //console.log(fixlabel(data.label));
    this.setState(() => {
      return { [fixlabel(data.label)]: e.target.value }
    });
    // this.setState((state) => {
    //   return { multa: state.multa + data.multa };
    // });
    // console.log(data, e.target.value);
    // this.setState((state) => {
    //   console.log('multa', state.multa, data.multa);
    //   return { multa: state.multa + data.multa };
    // });
  };

  render() {
    return (
      <div style={{ backgroundColor: 'inherit', borderRadius: 3 }}>
        <div>
          <div>
            <Stepper
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
          <Crime
            state={this.state}
            activeStep={this.state.activeStep}
            props={this.props}
            radioCB={this.radio}
            TextCB={this.text}
          />

          <div className="button-container">
            <Text color="red" hidden={!this.state.showError}>
              There was an error submitting this form.
            </Text>

            <View>
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
                  Finalizar
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
                  Próximo
                </Button>
              )}
              {this.state.activeStep === 1 && (
                <Button onClick={this.handleBack}>Voltar</Button>
              )}
              {this.state.activeStep !== 1 && (
                <Button onClick={this.handleCancel}>Cancelar</Button>
              )}
            </View>
          </div>
        </div>
      </div>
    );
  }
}

export default Novo;
