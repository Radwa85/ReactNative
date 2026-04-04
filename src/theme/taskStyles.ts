import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const taskStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  listContainer: {
    padding: 20,
  },
  taskItem: {
    backgroundColor: colors.cardBg,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  checkCircle: {
    marginRight: 15,
  },
  taskBody: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  taskDueDate: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  loading: {
    marginHorizontal: 20,
    marginTop: 20,
    color: colors.textLight,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: colors.textLight,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  }
});
