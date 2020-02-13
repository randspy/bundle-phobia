import useQuery from './use-query';
import router from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
}));

describe('useQuery', () => {
  test('should parse query parameters', () => {
    jest.spyOn(router, 'useLocation').mockReturnValue({
      search: '?name=react&version=16.12.0'
    });
    expect(useQuery()).toEqual({ name: 'react', version: '16.12.0' });
  });

  test('should return empty values for missing query parameters', () => {
    jest.spyOn(router, 'useLocation').mockReturnValue({
      search: ''
    });
    expect(useQuery()).toEqual({ name: '', version: '' });
  });
});
