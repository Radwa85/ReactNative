

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
 card: {
  flex: 1,
  backgroundColor: 'white',
  paddingVertical: 50,
  paddingHorizontal: 30,
  alignItems: 'center',
  justifyContent: 'space-between'
},
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1aa2bd',
    marginTop: 30
  },
  inputContainer: {
    width: '100%',
    gap: 20,
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    fontSize: 16,
    color: '#333',
    shadowColor: '#454545',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.005,
    shadowRadius: 16,
    elevation: 9,
  },
  buttonWrapper: {
    width: '100%',
    shadowColor: '#7dc6d3',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 9,
    marginBottom: 20,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
  },
  licenseText: {
    color: '#28B6D1',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomContainer: {
  width: '100%',
  alignItems: 'center',
  gap: 10
},
});