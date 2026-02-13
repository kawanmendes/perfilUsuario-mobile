import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f7f9fb',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f1724',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  value: {
    fontWeight: '600',
    color: '#111827',
  },
  buttonWrap: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
});