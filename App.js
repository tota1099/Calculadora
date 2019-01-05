import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      display: '',
      result: ''
    }
  }

  handleOperator(operator){
    if ( operator === 'C' ){
      this.setState({
        display: '',
        result: ''
      })
    } else if ( operator === '=' ){
      if ( this.state.result !== '' ){
        this.setState({
          display: this.state.result,
          result: ''
        })
      }
    } else {
      const display = this.state.display + operator
      let result = this.state.result
      try {
        let fixedOperation = display.split('x').join('*')
        fixedOperation = fixedOperation.split('÷').join('/')
        fixedOperation = fixedOperation.split(',').join('.')
        result = new String(eval(fixedOperation)).toString()
      } catch(e){}

      this.setState({
        display,
        result
      })
    }
  }

  render() {
    const col1Buttons = [
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      [',', '0', '=']
    ]

    const col2Buttons = [ 'C', '÷', '*', '-', '+']
    return (
      <View style={styles.container}>
        <Text style={styles.display}>{this.state.display}</Text>
        <Text style={styles.result}>{this.state.result}</Text>
        <View style={styles.buttons}>
          <View style={styles.col1}>
            { col1Buttons.map( (line, index) => 
              <View style={styles.line} key={index}>
                { line.map ( operator => 
                  <TouchableOpacity key={operator} style={styles.btn} onPress={() => this.handleOperator(operator)}>
                    <Text style={styles.btnText}>
                      {operator}
                    </Text> 
                  </TouchableOpacity>
                  ) }
              </View> 
            ) }
          </View>
          <View style={styles.col2}>
            { col2Buttons.map ( operator => 
              <TouchableOpacity key={operator} style={styles.btn} onPress={() => this.handleOperator(operator)}>
                <Text style={styles.btnText}>
                  {operator}
                </Text> 
              </TouchableOpacity>
              ) }
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.made}>
            Feito com ♥ por Renan Porto
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  display: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    fontSize: 80,
    textAlign: 'right',
    paddingTop: 30,
    paddingRight: 10
  },
  result: {
    flex: 0.5,
    backgroundColor: '#EFEFEF',
    fontSize: 40,
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 10
  },
  buttons: {
    flex: 5,
    flexDirection: 'row'
  },
  line: {
    flex: 1,
    flexDirection: 'row'
  },
  col1: {
    flex: 3,
    backgroundColor: '#000000'
  },
  btn: {
    flex: 1,
    justifyContent: 'center'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 50,
    color: 'white'
  },
  col2: {
    flex: 1,
    backgroundColor: '#0b0b0b'
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: 'white'
  },
  made: {
    color: 'white',
    textAlign: 'center'
  }
});
