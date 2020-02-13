import { useLocation } from 'react-router-dom';

export default function useQuery() {
  const query = new URLSearchParams(useLocation().search);
  const name = query.get('name');
  const version = query.get('version');
  return {
    name: name ? name : '',
    version: version ? version : ''
  };
}
